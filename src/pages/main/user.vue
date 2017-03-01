<style lang="less" module>
    @import '../../assets/less/const.less';
    .search{
        position: relative;
        width: 240px;
        margin-right: 30px;
    }
    .input{
        width: 100%;
        height: 30px;
        padding: 0 10px 0 20px;
        border-radius: 2px;
        color: @theme-color;
    }
    .seBtn{
        position: absolute;
        top: 7px;
        left: 2px;
    }
    .user{
        height: 30px;
        min-width: 100px;
        line-height: 30px;
        color:#fff;
    }
    .menu{
        @borderW:5px;
        position: relative;
        margin-top: 10px;
        background-color: @theme-color;
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 4px;
        &::after{
            content: '';
            position: absolute;
            bottom: 100%;
            left: 50%;
            margin-left: -@borderW;
            border: @borderW solid transparent;
            border-bottom-color: #ccc;
        }
    }
    .menuItem{
        height: 28px;
        line-height: 28px;
        transition: margin .3s;
        &:hover{
            margin-left: -10px;
        }
        a{
            margin-left: 5px;
        }
    }
    .avatar{
        margin-right: 5px;
        border-radius: 50%;
    }
    .username{
        max-width: 80px;
        display: inline-block;
        vertical-align: middle;
    }
    .split{
        height: 1px;
        background-color: #eee;
    }
</style>
<template>
    <div v-if="!isLogin">
        <div :class="[$style.search,'inline-block']">
            <input :class="$style.input" type="search" value="" placeholder="输入关键字搜索" @keyup.enter="search">
            <y-icon name="search" color="#1b1b1b" :class="[$style.seBtn,'hover']"></y-icon>
        </div>
        <div :class="[$style.user,'inline-block']">
            <span to="/entrance" @click="login" class="link">登录</span>
            <y-icon name="dot" color="#fff"></y-icon>
            <span to="/entrance/register" @click="register" class="link">注册</span>
        </div>
    </div>
    <div v-else>
        <div :class="[$style.user,'inline-block','text-center']">
            <div :class="['hover',{'highlight':menu}]"  @mouseover="showMenu" @mouseleave="hideMenu">
                <template v-if="userInfo.avatar_hd">
                    <img :class="[$style.avatar,'inline-block']" v-bind:src="userInfo.avatar_hd" alt="" width="25" height="25">
                </template>
                <template v-else>
                    <y-icon name="user"></y-icon>
                </template>
                <span :class="[$style.username,'one-line']">{{ userInfo.username }}</span> 
                <y-icon name="down"></y-icon>
            </div>
            <transition name="fade">
                <div :class="[$style.menu,'text-center']" v-show="menu" @mouseover="showMenu" @mouseleave="hideMenu">
                    <ul>
                        <li :class="[$style.menuItem,'link']" v-for="tab in list">
                            <y-icon :name="tab.iconName"></y-icon>
                            <template v-if="tab.to">
                                 <router-link :to="tab.to">{{tab.name}}</router-link>
                            </template>
                           <template v-else>
                                <a href="javascript:;" @click="clickMenu(tab.signal)">{{tab.name}}</a>
                           </template>
                        </li>
                    </ul>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    export default{
        props:{
            userInfo: Object
        },
        data (){
            return {
                menu: false,
                list:[
                    {
                        name:'我的主页',
                        iconName:'data',
                        to:'/app/user'
                    },
                     {
                        name:'我喜欢的',
                        iconName:'like',
                        to:'/app/notes'
                    },
                     {
                        name:'我的收藏',
                        iconName:'collect',
                        to:'/app/setting'
                    },
                    {
                        name:'我的笔记',
                        iconName:'collect',
                        to:'/notes'
                    },
                    {
                        name:'标签管理',
                        iconName:'tag',
                        to:'/app/setting'
                    },
                    {
                        name:'账号设置',
                        iconName:'setting',
                        to:'/app/setting'
                    },
                     {
                        name:'关于弹枪',
                        iconName:'about',
                        to:'/app/setting'
                    },
                    {
                        name:'退出登录',
                        iconName:'loginout',
                        to:'',
                        signal:'loginout'
                    }
                ]
            }
        },
        methods: {
            login(){
                window.location.href = '/entrance';
            },
            register(){
                window.location.href = '/entrance/register';
            },
            loginout(){
               this.$store.dispatch('account/LOGIN_OUT')
               .then(resData=>{
                //    this.$store.dispatch('user/SET_USERINFO',{});
                   window.location.href = '/entrance';
                //    this.$router.push('/entrance');
               },resError=>{
                   this.$Toast(resError.msg);
               })
            },
            clickMenu(signal){
                if(signal == 'loginout'){
                    this.loginout();
                }
            },
            hideMenu(){
                if(this.menuTimmer){
                    clearTimeout(this.menuTimmer);
                    this.menuTImmer = null;
                }
                this.menuTimmer = setTimeout(() => {
                    this.menu = false;
                    this.menuTimmer = null;
                },300);
            },
            showMenu(){
                if(this.menuTimmer){
                    clearTimeout(this.menuTimmer);
                    this.menuTImmer = null;
                }
                this.menu = true;
            }
        },
        computed:{
            isLogin(){
                return this.userInfo.username;
            }
        }
    }
</script>
