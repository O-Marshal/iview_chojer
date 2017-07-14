<style scoped>

</style>
<template>
    <Layout>
        <h1 style="text-align: center;margin-bottom: 50px">文章统计</h1>
        <Row :gutter="40">
            <i-col span="12">
                <div style="margin: 40px auto; text-align: center; font-size: 18px">
                    <h2>{{ sum }}</h2>
                    <p style="margin-top: 10px">全部文章</p>
                </div>
            </i-col>
            <i-col span="12">
                <div style="margin: 40px auto; text-align: center; font-size: 18px">
                    <h2>{{ count.news }}</h2>
                    <p style="margin-top: 10px">新闻内容</p>
                </div>
            </i-col>
            <i-col span="12">
                <div style="margin: 40px auto; text-align: center; font-size: 18px">
                    <h2>{{ count.notice }}</h2>
                    <p style="margin-top: 10px">系统公告</p>
                </div>
            </i-col>
            <i-col span="12">
                <div style="margin: 40px auto; text-align: center; font-size: 18px">
                    <h2>{{ count.faq }}</h2>
                    <p style="margin-top: 10px">FAQ</p>
                </div>
            </i-col>
        </Row>
    </Layout>
</template>
<script>

    import { mapGetters } from 'vuex';
    import Layout from '../../components/layout/console.vue';

    export default {
        components: { Layout },
        computed: {
            ...mapGetters({
                count: 'cms_index_count',
                sum: 'cms_index_sum'
            })
        },
        mounted () {
            this.$store.dispatch('cms_index_count');
        }

    };
</script>