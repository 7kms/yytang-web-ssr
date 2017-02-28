<style lang="less" module>
    .wrap{
        width: 75%;
    }
</style>
<template>
    <div :class="$style.wrap">
         <List :dataList="dataList" :loading="loading" :category="tabName" @click="click" v-scroll="loadMore" scroll-distance="100" scroll-disabled="isDisabled"></List>
    </div>
</template>
<script>
    import List from './list.vue';
    import $api from 'api';
    export default {
        components:{
            List
        },
        data(){
            return {
                noMore: false,
                loading: true,
                dataList: [],
                limit: 15,
                page: 0
            }
        },
        computed: {
            tabName(){
                let {category} = this.$route.params;
                let tabName = '精选';
                switch(category){
                    case 'frontend':
                        tabName = '前端';
                        break;
                    case 'android':
                        tabName = 'Android';
                        break;
                    case 'ios':
                        tabName = 'IOS';
                        break;
                    case 'backend':
                        tabName = 'Sever';
                        break;
                    default:
                        break;    
                }
                return tabName;
            },
            isDisabled(){
                return this.loading || this.noMore;
            }
        },
        methods:{
            getParams() {
                var paramObj = {
                    include: 'user',
                    limit: this.limit,
                    skip: this.page * this.limit,
                    order:'-hotIndex'
                };
                var whereObj = {"category":this.category,"createdAt":{"$gte":{"__type":"Date","iso":new Date( Date.now() - 86400*7*1000 ).toISOString()}}};
                paramObj.where = JSON.stringify(whereObj);
                return paramObj;
            },
            search(){
                this.loading = true;
                $api.get('/public/discover',this.getParams(), {
                before: (request) => {
                         // abort previous request, if exists
                        if (this.previousRequest) {
                            this.previousRequest.abort();
                        }
                        // set previous request on Vue instance
                        this.previousRequest = request;
                    }
                }).then(dataInfo=>{
                    this.page++;
                    this.dataList = [...this.dataList,...dataInfo.results];
                    if(dataInfo.results.length < this.limit){
                        this.noMore = true;
                    }
                },(err)=>{
                    console.log(err);
                }).then(()=>{
                    this.loading = false;
                });
            },
            loadMore() {
                this.search();
            },
            refresh(category) {
                this.page = 0;
                this.noMore = false;
                this.category = category == 'recommend' ? 'frontend' : category;
                this.dataList = [];
                this.search();
            },
            click(dataObj) {
                // console.log(dataObj.url)
                window.open(dataObj.url,'_blank');
            },
        },
        watch:{
            '$route' (to, from) {
                let {category='recommend'} = to.params;
                this.refresh(category);
            }
        },
        created(){
            let {category='recommend'} = this.$route.params;
            this.refresh(category);
        }
    }
</script>