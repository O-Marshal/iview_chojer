<style scoped lang="less">
    @import "../../styles/base.less";
    @import "../../styles/auth/login.less";
</style>
<template>
    <Layout active-name="/home/notice" title="系统公告">
        <ul>
            <li v-for="(notice, index) in tableDatas" style="font-size: 18px; text-align: left; padding: 15px 0; border-bottom: 1px dashed #ccc">
                <span>{{ dateFormat(notice.created_at) }}</span>
                <span style="background-color: #f53; color: #fff; padding: 0 3px; border-radius: 2px; font-size: 8px; margin-right: 3px;">new</span>
                <span @click.stop="showNoticeContent(index)" style="margin-left: 10px; cursor: pointer">{{ notice.title }}</span>
            </li>
        </ul>
        <div v-if="tablePage.total > tablePage.per_page" style="display: flex; justify-content: center; margin: 40px auto 10px">
            <Page :page-size="tablePage.per_page" :current="tablePage.current_page"></Page>
        </div>
    </Layout>
</template>
<script>

    import { mapGetters } from 'vuex';
    import { formatDate } from '../../libs/date';
    import Layout from '../../components/layout/home_cms.vue';
    import TableWrap from '../../components/box/table.vue'

    export default {
        components: { Layout, TableWrap },
        computed: {
            ...mapGetters({
                tableDatas: 'cms_index_datas',
                tablePage: 'cms_index_page'
            })
        },
        methods: {
            refreshData (page) {
                this.$store.dispatch('cms_index_notice', page ? page : this.tablePage.current_page);
            },
            dateFormat (date_str) {
                const date = formatDate(date_str, '【MM.dd】');
                return date;
            },
            showNoticeContent (index) {
                const params = this.tableDatas[index];
                this.$store.commit('cms_post', params);
                this.$router.push({ path: '/home/notice_content'})
            }
        },
        mounted () {
            this.refreshData();
        }

    };
</script>