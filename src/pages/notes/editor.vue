<style lang="less" module>
    @import '../../assets/less/const.less';
    .editor{
        flex: 1;
        display: flex;
        flex-direction: column;
        & > div{
            padding: 0 10px;
        }
        .tools{
            height: 40px;
            text-align: right;
            line-height: 40px;
            font-size: 1.4rem;
            background-color: @bg-color-2;
        }
    }
    .article{
         flex: 1;
         display: flex;
         flex-direction: row;
         & > div{
             width: 50%;
             flex: 1;
         }
     }
     .edit{
         flex: 1;
         display: flex;
         flex-direction: column;
         textarea{
             flex: 1;
             width: 100%;
             margin-top: 10px;
             padding: 10px;
             font-size: 1.4rem;
             color: @font-color-7;
             outline: none;
             resize: none;
             border: 1px solid @line-color-2
         }
     }
     .view{
         width: 40%;
         padding: 10px;
     }
     .toolLabel{
         margin-left: 100px;
         font-size: 1.6rem;
     }
</style>
<template>
   <div :class="$style.editor">
        <div :class="$style.tools">
            <span :class="[$style.toolLabel]" @click="preview">
                <y-icon name="preview" class="hover"  v-toolTip.right.center="'预览'"></y-icon>
            </span>
            <span :class="[$style.toolLabel]" @click="save">
                <y-icon name="save" class="hover" v-toolTip.left.center="'保存'"></y-icon>
            </span>
        </div>
        <div :class="$style.article">
            <div :class="$style.edit">
                <textarea v-model="markdownText"></textarea>
            </div>
            <div :class="$style.view" v-html="html"></div>
        </div>
    </div>
</template>
<script>
    import marked from 'marked';
    import hljs from 'highlight.js';
    import hlcss from 'highlight.js/styles/atom-one-dark.css';
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
        highlight(code){
            return hljs.highlightAuto(code).value;
        }
    });
    export default {
        data(){
            return {
                markdownText: ''
            }
        },
        methods: {
            preview(){
                console.log('preview')
            },
            save(){
                console.log('save')
            }
        },
        computed: {
            html(){
                return marked(this.markdownText);
            }
        }
    }
</script>