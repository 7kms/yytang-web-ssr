<style lang="less" module>
    @import '../../assets/less/const.less';
    .aside{
        position: fixed;
        top: 64px;
        bottom: 0;
        width: 140px;
        color:#fff;
        background-color: @theme-color;
    }
    .item{
        height: 40px;
        padding: 0 10px;
        line-height: 40px;
         &.on{
            font-weight: 700;
            color: @hint-color;
            background-color: #fff;
        }
    }
    .itemLabel{
        margin-left:10px; 
    }

    .title,
    .category{
        height: 30px;
        line-height: 30px;
    }
    .title{
        padding-left: 20px;
        font-weight: 700;
        font-size: @font-16;
    }
    .category{
        padding-left: 40px;
    }
    .categoryList{
        overflow: hidden;
        .category{
            &.on{
                font-weight: bold;
                color: @hint-color;
            }
        }
    }
</style>
<template>
    <div :class="$style.aside">
        <template v-if="!isInitialize">
            <template v-if="!isLogin">
                <ul>
                    <router-link tag="li" to="/welcom" :class="[$style.item,'link',{[$style.on]:navHighlight('recommend')}]">
                        <y-icon name="bulb"></y-icon><span :class="[$style.itemLabel,'inline-block']">推荐</span>
                    </router-link>
                    <router-link tag="li" to="/welcom/android" :class="[$style.item,'link',{[$style.on]:navHighlight('android')}]">
                        <y-icon name="android"></y-icon><span :class="[$style.itemLabel,'inline-block']">Android</span>
                    </router-link>
                    <router-link tag="li" to="/welcom/frontend" :class="[$style.item,'link',{[$style.on]:navHighlight('frontend')}]">
                        <y-icon name="front"></y-icon><span :class="[$style.itemLabel,'inline-block']">前端</span>
                    </router-link>
                    <router-link tag="li" to="/welcom/ios" :class="[$style.item,'link',{[$style.on]:navHighlight('ios')}]">
                        <y-icon name="ios"></y-icon><span :class="[$style.itemLabel,'inline-block']">IOS</span>
                    </router-link>
                    <router-link tag="li" to="/welcom/backend" :class="[$style.item,'link',{[$style.on]:navHighlight('backend')}]">
                        <y-icon name="database"></y-icon><span :class="[$style.itemLabel,'inline-block']">后端</span>
                    </router-link>
                </ul>
            </template>
            <template v-else>
                <li :class="[$style.timeline]" v-for="(nav,index) of navList" :key="index">
                    <div :class="[$style.title,'hover']" @click="switchNav(nav)">{{nav.title}}</div>
                    <transition name="slide">
                        <ul :class="$style.categoryList" v-show="userNavActive(nav)" :style="{height: (nav.list.length * 30 + 'px')}">
                            <li :class="[$style.category,'hover',{[$style.on]:userNavHighlight(item)}]" v-for="(item,index) in nav.list" @click="switchItem(nav,item)" :key="index">{{item.label}}</li>                            
                        </ul>
                </transition>
                </li>
            </template>
        </template>
        <span v-else>正在初始化...</span>
    </div>
</template>
<script>
    export default {
        props:{
            isInitialize:{
                type: Boolean,
                default: true
            },
            isLogin:{
                type: Boolean,
                default: false
            },
            navList:{
                type: Array,
                default: []
            }
        },
        methods:{
            navHighlight(navName){
                const { category = 'recommend' } = this.$route.params;
                return category == navName;
            },
            userNavActive({path}){
                const { column } = this.$route.params;
                const { fullPath } = this.$route;
                return path.indexOf(column) > -1 || fullPath.indexOf(path) > -1;
            },
            userNavHighlight(item){
                const { path } = this.$route;
                return path == item.path || path.indexOf(item.highlightPath) > -1;
            },
            switchNav(nav) {
                this.changeRoute(nav.list[0]);
            },
            switchItem(nav,item) {
                this.changeRoute(item);
            },
            changeRoute(item){
                this.$router.push(item.path);
            }
        }
    }
</script>