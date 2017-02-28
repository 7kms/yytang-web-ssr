<style lang="less" module>
    @import '../../assets/less/const.less';
    .wrap{
        padding-top: 100px;
    }
    .title {
        font-size: 24px;
        color: @theme-color;
    }
    .content {
       width: 350px;
       padding: 20px;
       margin: 20px auto;
       background-color: #fff;
   }
   .nav{
      position: relative;
      max-width: 500px;
      height: 30px;
      margin: 0 auto;
      line-height: 30px;
      &::after{
          content:'';
          position: absolute;
          z-index: -1;
          left: 30px;
          right: 30px;
          top: 15px;
          height: 1px;
          background-color: #fff;
      }
   }
   .navTab{
        height: 30px;
        width: 100px;
        margin: 0 auto;
        font-size: @font-16;
        background-color: @body-color;
   }
   .btn{
       color: @font-color-7;
       &.on{
            color: @theme-color;
            border-bottom: 1px solid @theme-color;
        }
   }
 
   
</style>
<template>  
    <div :class="$style.wrap">
        <div class="text-center" :class="$style.logo">
            <img src="../../assets/images/logo-114.png" width="100" height="100" alt="logo">
            <p :class="$style.title">弹枪不是枪?</p>
        </div>
        <div :class="$style.nav">
            <div class="text-center" :class="$style.navTab">
                <a :class="{ [$style.btn]:true, [$style.on]:isLogin() }" href="javascript:;" @click="goLogin">登录</a>
                <y-icon name="dot" color="#999"></y-icon>
                <a :class="{ [$style.btn]:true, [$style.on]:!isLogin() }" href="javascript:;" @click="goRegister">注册</a>
            </div>
           
        </div>
        <div :class="$style.content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        methods:{
            isLogin(){
                return this.$router.currentRoute.path == '/entrance/login';
            },
            goLogin(){
                this.$router.replace('login');
            },
            goRegister(){
                this.$router.replace('register');
            }
        }
    }
</script>