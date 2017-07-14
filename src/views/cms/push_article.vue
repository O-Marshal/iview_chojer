<style scoped>
    .cms-article-wrap {
        margin-top: 30px;
        position: relative;
    }
    .cms-article-title {
        display: block;
        width: 100%;
        height: 56px;
        font-size: 22px;
        padding-left: 20px;
        padding-right: 60px;
        box-shadow: none;
        outline: none;
        border: 1px solid #eee;
        border-bottom: none;
        color: #444;
    }
    .cms-article-title-limit {
        position: absolute;
        right: 20px;
        top: 20px;
    }
    .cms-article-title-limit-danger {
        color: #f03;
    }
    .cms-article-item {
        padding-top: 25px;
    }
    .cms-article-item h3 {
        display: inline-block;
        font-size: 18px;
    }
    .cms-image-item {
        margin: 20px 20px 0px 0px;
        display: inline-block;
        width: 150px;
        height: 90px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
    }
</style>
<template>
    <div class="cms-article-wrap">
        <input v-model="title" class="cms-article-title" type="text" placeholder="文章标题">
        <div :class="titleLimitCls">{{titleLimit}}/30</div>
        <UE v-model="content"></UE>
        <div class="cms-article-item">
            <h3>封面图</h3>
            <Tooltip content="未传封面图的文章，系统将自动抓取" placement="top-start">
                <Icon type="ios-help"></Icon>
            </Tooltip>
            <Button style="margin-left: 20px" type="ghost" icon="ios-cloud-download-outline" @click="showPictureForm">图库选择</Button>
            <div class="cms-image-wrap">
                <div class="cms-image-item" v-for="img in images" :style="getBackgroundImage(img)"></div>
            </div>
        </div>
        <div class="cms-article-item">
            <h3>分类</h3>
            <Select v-model="type" style="width: 120px; margin-left: 20px" size="large">
                <Option value="news">新闻</Option>
                <Option value="notice">公告</Option>
                <Option value="faq">常见问题</Option>
            </Select>
        </div>
        <div style="margin: 50px auto">
            <Button size="large" type="success" @click.stop="publish">发布内容</Button>
        </div>
        <Picture ref="cmsArticlePicture" @on-selected="onPictureSelected"></Picture>
    </div>
</template>
<script>

    import Picture from '../../components/editor/picture.vue'
    import UE from '../../components/editor/ue.vue'

    export default {
        data () {
            return {
                type: 'news',
                title: '',
                content: "文章内容",
                images: []
            };
        },
        components: { Picture, UE },
        computed: {
            titleLimit () {
                return this.title.length;
            },
            titleLimitCls () {
                return {
                    'cms-article-title-limit': true,
                    'cms-article-title-limit-danger': this.title.length > 30
                }
            }
        },
        methods: {
            getBackgroundImage (url) {
                return {
                    'background-image': 'url('+url+')'
                };
            },
            onPictureSelected (images) {
                this.images = images;
            },
            showPictureForm () {
                this.$refs['cmsArticlePicture'].show();
            },
            publish () {
                this.$store.dispatch('cms_common_store', {
                    title: this.title,
                    content: this.content,
                    type: this.type,
                    previews: this.images.join('|_imglinks_|')
                });
            }
        }

    };
</script>