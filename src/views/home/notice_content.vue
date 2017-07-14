<style lang="less">
    .cms-content {
        font-size: 16px;
    }
    .cms-content img {
        width: 100%;
    }
    .cms-info {
        font-size: 16px;
        text-align: right;
        margin-top: 40px;
    }
    .cms-info p {
        margin-top: 10px;
    }
</style>
<template>
    <Layout active-name="/home/notice" :title="title">
        <div class="cms-content" v-html="content"></div>
        <div class="cms-info">
            <p>{{ author.name }}</p>
            <p v-html="getFormatDate(date)"></p>
        </div>
    </Layout>
</template>
<script>

    import { formatDate } from '../../libs/date';
    import Layout from '../../components/layout/home_cms.vue';

    export default {
        data () {
            return {
                title: '系统公告',
                content: '',
                author: '系统',
                date: ''
            };
        },
        components: { Layout },
        methods: {
            getFormatDate (date) {
                return formatDate(date, 'yyyy年MM月dd');
            },
            getContent () {
                try {
                    const params = this.$store.getters.cms_post;
                    this.title = params.title;
                    this.content = params.content;
                    this.author = params.author;
                    this.date = params.created_at;
                } catch (e) {
                    this.title = '系统公告';
                    this.content = '';
                    this.author = '系统';
                    this.date = '';
                }
            }
        },
        mounted () {
            this.getContent();
        }
    };
</script>