<style scoped>

</style>
<template>
    <Layout>
        <Form :label-width="60">
            <!--<Tabs v-model="tabActive">-->
                <!--<Tab-pane label="文章" name="article">-->
                    <!--<PushArticle></PushArticle>-->
                <!--</Tab-pane>-->
                <!--<Tab-pane label="更新日志(后台)" name="log">-->
                    <!---->
                <!--</Tab-pane>-->
            <!--</Tabs>-->
            <PushArticle></PushArticle>
        </Form>
    </Layout>
</template>
<script>
    import Layout from '../../components/layout/console.vue';
    import PushArticle from './push_article.vue';

    export default {
        data () {
            return {
                tabActive: 'article',
                tabs: {
                    'article': {
                        buttonLabel: '发布到文章'
                    },
                    'log': {
                        buttonLabel: '发布到日志'
                    },
                    'doc': {
                        buttonLabel: '发布到文档'
                    },
                },
                push: {
                    buttonLabel: '发布到文章'
                }
            };
        },
        components: { Layout, PushArticle },
        watch: {
            tabActive (val) {
                this.push = this.tabs[val];
            }
        }

    };
</script>