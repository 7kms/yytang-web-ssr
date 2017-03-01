<template>
    <button :class="classes" :type="type" @click.stop="clickBtn" :disabled="disabled">
        <span>
            <slot></slot>
        </span>
    </button>
</template>
<script>
    const prefixCls = 'y-btn';
    export default {
        props:{
            disabled: {
                type: Boolean,
                default: false
                },
            block: {
                type: Boolean,
                default: false
            },
            type: {
                type: String
            }
        },
        data(){
            return {

            }
        },
        computed:{
            classes(){
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-block`]:this.block != null && this.block
                    }
                ]
            }
        },
        methods:{
            clickBtn(){
                 this.$emit('click')
            }
        }
    }
</script>