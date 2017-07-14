<style lang="less">
    @import "../../styles/components/ue.less";
</style>
<template>
    <div class="ue-editor-wrap" :style="style">
        <script :id="domID" name="content" type="text/plain">初始化内容</script>
        <UEPicture ref="uePicture" @on-selected="insertImages"></UEPicture>
    </div>
</template>
<script>

    import config from '../../config/ue/index';
    import UEPicture from './picture.vue';

    import Urls from '../../config/urls';
    import { deepCopy } from 'iview/src/utils/assist';

    const _ue = deepCopy(window.UE);

    export default {
        props: {
            id: {
                type: String,
                default: 'ue_container'
            },
            height: {
                type: Number,
                default: 260
            },
            toolbars: {
                type: Array,
                default: [
                    ['source', 'undo', 'redo', '|', 'fontsize','|', 'blockquote', 'horizontal', '|', 'removeformat', 'formatmatch'],
                    ['paragraph', '|', 'bold', 'insertorderedlist', 'insertunorderedlist', '|', 'insertcode', '|', 'v_picture']
                ]
            }
        },
        components: { UEPicture },
        data () {
            return {
                ue: null,
                value: false,
                domID: this.id + '_' + Math.floor(Math.random()*10000000),
                style: {
                    display: 'block'
                }
            };
        },
        methods: {
            showPictureForm () { // 图片选择器
                this.$refs['uePicture'].show();
            },
            insertImages (images) { //插入图片
                this.ue.execCommand('insertimage', images.map(function (item) {
                    return { src: item };
                }));
            }
        },
        mounted () {
            // 图片
            _ue.registerUI('v_picture', function(editor, uiName) {
                return new _ue.ui.Button({
                    name: uiName,
                    title: '添加图片',
                    cssRules: 'background-position: -726px -77px;',
                    onclick: this.showPictureForm
                });
            }.bind(this));
            const ue = _ue.getEditor(this.domID, {
                toolbars: this.toolbars,
                initialFrameHeight: this.height
            });
            this.ue = ue;
            this.style.display = 'block';
        },
        beforeDestroy () {
            this.style.display = 'none';
            if (this.ue) this.ue.destroy();
        }
    };
</script>