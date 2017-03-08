<style lang="less" module>
    @import '../../assets/less/const.less';
    .item{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 90px;
        padding: 0 10px;
        cursor: pointer;
        transition: background-color .3s;
         &:hover{
            background-color: rgba(248,249,250,.5);
            .title{
                color: @hint-color;
            }
        }
    }
    .info{
        flex: 1;
        width: 50%;
        margin-left: 15px;
    }
    .title{
        height: 24px;
        line-height: 24px;
        font-weight: 600;
        margin: 0 0 15px;
        padding: 0;
    }
    .indicate{
        display: block;
        float: left;
        height: 24px;
        line-height: 22px;
        margin-left: -1px;
        padding: 0 8px;
        color: @font-color-9;
        font-size: 1.2rem;
        border: 1px solid #f1f1f1;
        transition: background-color .3s;
        &:hover{
            background-color: hsla(0,0%,95%,.5)
        }
    }
    .img{
        border-radius: 4px;
    }
    .addition{
        font-size: 1.2rem;
        color: @font-color-9;
    }
    .author{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        margin-top: 15px;
    }
    .tagContent{
        margin-right: 10px;
    }
    .tag{
        display: inline-block;
        height: 25px;
        line-height: 25px;
        padding: 0 8px;
        background-color: hsla(0,0%,95%,.3);
        &:not(:first-child){
            margin-left: 5px;
        }
    }
</style>
<template>
    <li :class="$style.item" @click="click">
        <div>
            <img :src="generateImgUrl(dataObj.screenshot)" :class="$style.img" alt="" width="82" height="82">
        </div>
        <div :class="$style.info">
            <h4 :class="[$style.title,'one-line']">{{dataObj.title}}</h4>
            <div>
                <span :class="$style.indicate">
                    <y-icon name="heart"></y-icon>
                    <span class="inline-block">{{dataObj.collectionCount}}</span>
                </span>
                <span :class="$style.indicate">
                    <y-icon name="comment"></y-icon>
                    <span class="inline-block">{{dataObj.commentsCount}}</span>
                </span>
            </div>
        </div>
        <div :class="[$style.addition,'text-right']">
            <div>
                {{ dataObj.createdAt | dateDistance }}
            </div>
            <div :class="$style.author">
                <div :class="$style.tagContent">
                    <span :class="$style.tag" v-for="(tag,index) in dataObj.tagsTitleArray.slice(0,3)" :key="index">{{ tag }}</span>
                </div>
                <div @mouseenter="card($event)" @mouseleave="card()">
                    <img :class="$style.img" :src="dataObj.user.avatar_hd+'?imageView2/1/w/50/h/50/q/85/format/jpg/interlace/1'" alt="" width="25" height="25">
                </div>
            </div>
        </div>
    </li>
</template>
<script>
    import { articlePictureUrl } from '../../config';
    export default {
        props: {
            dataObj: Object
        },
        methods: {
            card(event){
                if(event){
                    let {top, left} = event.target.getBoundingClientRect();
                    let clientTop = window.pageYOffset + top;
                    this.$emit('card', this.dataObj.user , {top, left , clientTop});
                }else {
                    this.$emit('card');
                }
            },
            click(){
                 this.$emit('click',this.dataObj);
            },
            generateImgUrl(screenshot){
                 if(!screenshot) return 'https://gold-cdn.xitu.io/images/welcome/entry-default-img@2x.png';
                const query = '?imageView2/1/w/164/h/164/q/85/format/jpg/interlace/1';
                return `${articlePictureUrl}/${screenshot.key}${query}`;
            }
        }
    }
</script>