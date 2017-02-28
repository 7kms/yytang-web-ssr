<style lang="less" module>
    @import '../../assets/less/const.less';
    .item{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        padding: 10px;
        cursor: pointer;
        &:hover{
            background-color: @body-color;
            .title{
                color: @hint-color;
            }
        }
    }
    .image{
        border-radius: 4px;
    }
    .itemDesc{
        width: 50%;
        padding: 0 10px;
        flex: 1;
    }
    .title{
        height: 24px;
        line-height: 24px;
        font-weight: 600;
        margin: 0 0 15px;
        padding: 0;
    }
    .info{
        margin-right: 10px;
        display: inline-block;
        vertical-align: middle;
    }
    .label{
        font-size: 1.2rem;
        color: @font-color-9;
    }
    .like{
        margin-left: 5px;
    }
</style>
<template>
     <li :class="[$style.item]" @click.stop="click">
         <div>
             <img :src="generateImgUrl(dataObj.screenshot)" :class="$style.image" alt="" width="60" height="60">
         </div>
        <div :class="[$style.itemDesc]">
            <h4 :class="[$style.title,'one-line']">{{dataObj.title}}</h4>
            <div :class="$style.label">
                <span :class="$style.info"><y-icon name="heart"></y-icon><span :class="[$style.like,'inline-block']">{{dataObj.collectionCount}}</span></span>
                <span :class="$style.info">{{dataObj.user.username}}<y-icon name="dot"></y-icon><span class="inline-block">{{dataObj.createdAt | dateDistance}}</span></span>
            </div>
        </div>
    </li>
</template>
<script>
    import { articlePictureUrl } from '../../config'
    export default {
        props:{
            dataObj: Object
        },
        methods:{
             click(){
                 this.$emit('click',this.dataObj);
             },
             generateImgUrl(screenshot){
                 if(!screenshot) return 'https://gold-cdn.xitu.io/images/welcome/entry-default-img@2x.png';
                const query = '?imageView2/1/w/120/h/120/q/85/format/jpg/interlace/1';
                return `${articlePictureUrl}/${screenshot.key}${query}`;
            }
        }

    }
</script>
