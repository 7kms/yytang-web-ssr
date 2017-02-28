<style lang="less" module>
     @import '../../assets/less/const.less';
     .content{
        display: flex;
        flex-direction: column;
        min-height: 800px;
        margin-right: 10px;
        background-color: #fff;
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
     .main{
         display: flex;
         flex: 1;
         flex-direction: row;
         align-items: stretch;
         padding: 10px 0;
         .list{
             width: 200px;
             border-right: 1px solid @line-color-2;
             overflow: auto;
         }
     }
     .item{
         padding: 5px 10px;
         border-bottom: 1px solid @line-color-2;
         cursor: default;
          &.on,&:hover{
             background-color: @bg-color-2;
         }
         .title{
             padding: 0;
             margin: 0 0 10px;
             font-size: 1.4rem;
             color: @font-color-6;
         }
         .desc{
             display: -webkit-box;
             -webkit-line-clamp: 2;
             -webkit-box-orient: vertical;
             font-size: 1.2rem;
             word-break: break-all;
             text-overflow: ellipsis;
             overflow: hidden;            
             font-size: 1.2rem;
             line-height: 20px;
             time{
                 color: #00beff;
                 margin-right: 10px;
             }
         }
     }
</style>
<template>
    <div :class="$style.content">
        <div :class="$style.header">前端小咸鱼</div>
        <div :class="$style.main">
            <ul :class="$style.list">
                <li :class="[$style.item,{[$style.on]:true}]">
                    <h3 :class="[$style.title,'one-line']">nodejs第一季</h3>
                    <div :class="$style.desc">
                        <time>2017/02/02</time><span>nodejs第一季nodejs第一季nodejs第一季nodejs第一季nodejs第一季nodejs第一季</span>
                    </div>
                </li>
                <li :class="$style.item">
                    <h3 :class="[$style.title,'one-line']">nodejs第一季</h3>
                    <div :class="$style.desc">
                        <time>2017/02/02</time><span>nodejs第一季nodejs第一季nodejs第一季nodejs第一季nodejs第一季nodejs第一季</span>
                    </div>
                </li>
                <li :class="$style.item">
                    <h3 :class="[$style.title,'one-line']">nodejs第一季</h3>
                    <div :class="$style.desc">
                        <time>2017/02/02</time><span>nodejs第一季nodejs第一季nodejs第一季nodejs第一季nodejs第一季nodejs第一季</span>
                    </div>
                </li>
            </ul>
            <editor></editor>
        </div>
    </div>
</template>
<script>
    import editor from './editor.vue';
    export default {
        data(){
            return {
               
            }
        },
        components:{
            editor
        }
    }
</script>