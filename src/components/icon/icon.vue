<template>
    <i class="iconfont" :class="classes" :style="styles"></i>
</template>
<script>
    const prefixCls = 'y-icon';
    export default {
        props: {
            name: String,
            size: [String,Number],
            color: String
        },
        computed: {
            classes (){
                let arr = [];
                arr.push(prefixCls);
                arr.push(`icon-${this.name}`);
                return arr;
            },
            styles (){
                let style = {};
                if(!!this.size){
                    style['font-size'] = `${this.size}px`;
                }
                if(!!this.color){
                    style['color'] = this.color;
                }
                return style;
            }
        }
    }
</script>