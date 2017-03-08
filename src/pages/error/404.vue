<style lang="less" module>
   .content{
       margin: 100px auto;
       width: 100%;
       max-width: 600px;
       .btn{
            color:#00beff;
            &:hover{
                text-decoration: underline;
            }
        }
   }
   
</style>
<template>  
   <div :class="[$style.content,'text-center']">
       <img src="../../assets/images/404.png" alt="not found" width="100%">
       <div>
            {{seconds}}秒后跳转到  <router-link to='/' :class="$style.btn">首页</router-link>
       </div>
   </div>
</template>
<script>
    export default {
        data(){
            return {
                count: 3
            }
        },
        computed:{
            seconds(){
                return this.count;
            }
        },
        created(){
           var time =  setInterval(() => {
                if(this.count <=1 ){
                    clearInterval(time);
                    this.$router.replace('/');
                }
                this.count --;
            },1000)
        }
    }
</script>