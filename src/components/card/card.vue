<style lang="less" module>
    .card{
        position: absolute;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
        background-color: #fff;
        box-shadow: 0 0 2px 0 rgba(0,0,0,.5);
        p{
            padding: 5px 0;
            margin: 0;
        }
        & > div{
            width: 100%;
        }
    }
    .img{
        border-radius: 50%;
    }
    .label{
        font-size: 1.2rem;
    }
    .name {
        font-weight: bold;
        font-size: 1.4rem;
    }
    .info{
        display: flex;
        width: 88%;
        margin-top: 12px;
        flex-direction: row;
        justify-content: space-between;
    }
    .infolabel{
        flex: 1;
        p{
            padding: 4px 0;
        }
        .num{
            color: #333;
        }
    }
</style>
<template>
    <transition name="fade">
        <div v-if="show" :class="[$style.card,'text-center']" @mouseleave="hide" :style="positionStyle">
            <div>
                <img :src="user.avatar_hd+'?imageView2/1/w/90/h/90/q/85/format/jpg/interlace/1'" alt="" width="45" height="45" :class="$style.img">
            </div>
            <div>
                <p :class="$style.name">{{ user.username }}</p>
                <p :class="[$style.label,'one-line']">{{ user.jobTitle }}{{ user.company ? ('@' + user.company) : ''}}</p>
            </div>
            <div :class="$style.info">
                <div :class="$style.infolabel">
                    <p :class="$style.num">{{user.postedEntriesCount}}</p>
                    <p>分享</p>
                </div>
                <div :class="$style.infolabel">
                    <p :class="$style.num">{{user.viewedEntriesCount}}</p>
                    <p>阅读</p>
                </div>
                <div :class="$style.infolabel">
                    <p :class="$style.num">{{user.collectedEntriesCount}}</p>
                    <p>喜欢</p>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        data(){
            return {
                width: 180,
                height: 180
            }  
        },
        props: {
            user: {
                type: Object,
                default(){
                    return {}
                }
            },
            position: Object,
            show: Boolean
        },
        computed: {
            positionStyle(){
                let { top, left , clientTop} = this.position;
                const space = 20;
                if(top <= 200){
                    left =left - this.width - space;
                    top = clientTop - .5 * this.height + 12;
                }else {
                    top = clientTop - this.height - space;
                    left = left - .5 * this.width + 12
                }
                return {
                    width: this.width + 'px',
                    height: this.height + 'px',
                    left: left + 'px',
                    top: top + 'px'
                }
            }
        },
        methods:{
            hide () {
                this.$parent.hide();
            }
        }
    }
</script>