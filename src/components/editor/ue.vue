<style lang="less">
    @import "../../styles/components/ue.less";
</style>
<template>
    <div class="ue-editor-wrap" :style="style">
        <script :id="domID" name="content" type="text/plain" style="width: 100%; height: 90%; max-height: 90%; overflow-y: scroll;"></script>
        <UEPicture ref="uePicture" @on-selected="insertImages"></UEPicture>
    </div>
</template>
<script>

    import UEPicture from './picture.vue';
    import Urls from '../../config/urls';

    export default {
        props: {
            value: String,
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
                default: () => [
                    ['source', 'undo', 'redo', '|', 'fontsize','|', 'blockquote', 'horizontal', '|', 'removeformat', 'formatmatch'],
                    ['paragraph', '|', 'bold', 'insertorderedlist', 'insertunorderedlist', '|', 'insertcode', '|', 'v_picture']
                ]
            }
        },
        components: { UEPicture },
        data () {
            return {
                ue: null,
                domID: this.id + '_' + Math.floor(Math.random()*10000000),
                style: {
                    display: 'block'
                }
            };
        },
        methods: {
            initalUE () {
                this.destroyUE();
                // 图片
                const ue = window.UE.getEditor(this.domID, {
                    toolbars: this.toolbars,
                    initialFrameHeight: this.height,
                    initialFrameWidth: '100%',
                    autoHeightEnabled: false
                });
                ue.ready(function () {
                    ue.setContent(this.value);
                    ue.addListener('v_on_picture', this.showPictureForm);
                    ue.addListener('contentChange', this.onUEContentChange);
                    this.ue = ue;
                }.bind(this));
                this.style.display = 'block';
            },
            destroyUE () {
                if (this.ue) {
//                    this.ue.removeEventListener('contentChange', this.onUEContentChange);
                    this.ue.destroy();
                    this.ue = null;
                }
            },
            onUEContentChange () {
                const content = this.ue.getContent();
                this.$emit('input', content);
            },
            showPictureForm (editor) { // 图片选择器
                this.$refs['uePicture'].show();
            },
            insertImages (images) { //插入图片
                this.ue.execCommand('insertimage', images.map(function (item) {
                    return { src: item };
                }));
            },
            refreshContent() {
                this.$nextTick(function () {
                    if (this.ue) this.ue.setContent(this.value);
                });
            }
        },
        mounted () {
            this.initalUE();
        },
        beforeDestroy () {
            this.style.display = 'none';
            this.destroyUE();
        }
    };
</script>