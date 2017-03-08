<style lang="less" module>
     @import '../../assets/less/const.less';
     .wrap{
         width: 75%;
     }
     .content{
        height: 100px;
        background-color: #00beff 
     }
     .header{
         display: flex;
         justify-content: space-between;
         align-items: center;
         height: 46px;
         padding: 0 20px;
         border-bottom: 1px solid @line-color-3;
         color: #fff;
         background-color: @theme-color;
         .on{
             font-weight: bold;
             color: @hint-color;
         }
     }
     .split{
        display: inline-block;
        width: 1px;
        height: 12px;
        margin: 0 5px;
        vertical-align: middle;
        background-color: #eee;
     }
     .tabRight{
         span{
             margin-left: 10px;
         }
     }
</style>
<template>
    <div :class="$style.wrap">
        <div :class="$style.header">
            <div :class="$style.tabLeft">
                <span :class="['hover',{[$style.on]:true}]">热门</span>
                <span :class="$style.split"></span>
                <span class="hover">最新</span>
                <span :class="$style.split"></span>
                <span class="hover">评论</span>
            </div>
            <div :class="$style.tabRight">
                <span class="hover">本周最热</span>
                <span class="hover">本月最热</span>
                <span class="hover">历史最热</span>
            </div>
        </div>
        <div class="content">
            <List :loading="loading" :dataList="dataList" v-scroll="loadMore" @click="click" scroll-distance="100" scroll-disabled="isDisabled"></List>
        </div>
    </div>
</template>
<script>
    import $api from 'api';
    import { mapGetters } from 'vuex';
    import List from './list.vue'
    export default {
        data(){
            return {
                limit: 20,
                skip: 0,
                order: '-rankIndex',
                loading: true,
                noMore: false,
                dataList: []
            }
        },
        components:{
            List
        },
        computed: {
            ...mapGetters({
                subscribeInfo:'user/GET_SUBSCRIBE'
            }),
            isDisabled(){
                return this.loading || this.noMore;
            }
        },
        methods: {
            getSubscribeArr(){
                var subscribeList = [];
               
                for(var {tag: {objectId, __type, className} } of this.subscribeInfo){
                    subscribeList.push({objectId,__type,className}) ;
                }
                return subscribeList;
            },
            composeParams(){
              return new Promise((resolve, reject) => {
                  this.$store.dispatch('user/GET_SUBSCRIBE')
                    .then( () => {
                        var { column , category } = this.$route.params;
                        var paramObj = {
                                include: 'user',
                                limit: this.limit,
                                skip: this.skip,
                                order: this.order
                            };
                        var where = {};
                        if(column == 'timeline'){
                                if(!category){
                                    where['$or'] = [{'hot': true},{'tags':{'$in': this.getSubscribeArr()}}];
                                }else{
                                    where['category'] = category;
                                }
                        }
                        paramObj.where = JSON.stringify(where);
                        resolve(paramObj);
                    }, (error) => {
                        reject(error);
                    });
                });
            },
            search(){
               this.loading = true;
               this.composeParams()
               .then(paramObj => {
                   return  $api.get('/public/column',paramObj, {
                            before: (request) => {
                                    if (this.previousRequest) {
                                        this.previousRequest.abort();
                                    }
                                    this.previousRequest = request;
                                }
                    });
               })
               .then(resData => {
                   this.dataList = [...this.dataList,...resData.results];
                   if(resData.results.length < this.limit){
                        this.noMore = true;
                    }
               },resError => {
                   console.log(resError)
               })
               .then(() => {
                   this.loading = false;
               });
            },
            loadMore() {
                this.skip += this.limit;
                this.search();
            },
            refresh(){
                this.dataList = [];
                this.skip = 0;
                this.search();
            },
            click(dataObj) {
                window.open(dataObj.url,'_blank');
            }
        },
        watch: {
            $route (to, from){
                console.log('route change');
                this.refresh();
            }
        },
        created(){
            console.log('column created');
            this.search();
        }
    }
</script>