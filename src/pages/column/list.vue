<style lang="less" module>
    @import '../../assets/less/const.less';
    .entryBox{
        background-color: #fff;
    }
    .boxTitle{
        height: 40px;
        margin: 0;
        padding: 0 20px;
        line-height: 40px;
        font-size: 1.6rem;
        color: @font-color-6;
        border-bottom: 1px solid #f1f1f1;
    }
    .list{
        min-height: 300px;
        padding: 10px;
    }
</style>
<template>
    <div :class="$style.entryBox">
        <div :class="$style.list">
            <ul>
                <item v-for="data in dataList" :key="data.hotIndex" :dataObj="data" @click="click" @card="card"></item>
            </ul>
            <div v-if="loading">数据正在拉取...</div>
            <div v-if="!loading && dataList.length == 0">暂时木有更多数据...</div>
        </div>
    </div>
</template>
<script>
    import item from './item.vue';
    import tqCard from '../../components/card'
    export default {
        props:{
            dataList: Array,
            loading: Boolean
        },
        components:{
            item
        },
        data(){
            return {}
        },
        methods:{
           click(dataObj){
               this.$emit('click',dataObj);
           },
           card(user, position){
               if(user){
                   tqCard.show(user, position);
               }else {
                   tqCard.hide();
               }
           }
        },
        beforeDestroy(){
             tqCard.remove();
        }
    }
</script>