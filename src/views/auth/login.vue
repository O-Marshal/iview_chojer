<style scoped lang="less">
    @import "../../styles/base.less";
    @import "../../styles/auth/login.less";
</style>
<template>
    <layout active-name="/auth/login">
        <div class="layout-login" :style="{height: layout_login_height + 'px' }">
            <Carousel autoplay :autoplay-speed="5000" arrow="never">
                <template v-for="ad in website_home_ads">
                    <Carousel-item>
                        <div class="demo-carousel" :style="getADStyle(ad)"></div>
                    </Carousel-item>
                </template>
            </Carousel>
            <LoginFrom></LoginFrom>
        </div>
        <div class="layout-placard">
            <h3>最新公告</h3>
            <ul :style="{width: layout_placard_width + 'px' }">
                <li v-for="(notify, index) in noticeDatas">
                    <i v-if="index==0" class="placard-tag">new</i>
                    <small>{{ notify.date }}</small>
                    <a @click.stop="showNoticeContent(index)">{{ notify.title }}</a>
                </li>
            </ul>
            <a class="placard-more" @click.stop="goNoticeUrl">更多公告>></a>
        </div>
    </layout>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { formatDate } from '../../libs/date';

    import Layout from '../../components/layout/home.vue';
    import LoginFrom from '../../components/auth/login_form.vue';

    let layout_base_width = 80;
    export default {
        data () {
            return {
                cms_type: 'notice',
                page: {},
                tableDatas: [],
                layout_login_height: window.innerHeight - 200,
                layout_placard_width: document.body.scrollWidth - 160 - layout_base_width * 2,
                layout_copy_width: document.body.scrollWidth - layout_base_width * 2
            };
        },
        mounted () {
            window.addEventListener('resize', this.windowResize);
            this.$store.dispatch('cms_index_notice');
        },
        components: { Layout, LoginFrom },
        computed: {
            ...mapGetters([ 'website_home_ads' ]),
            noticeDatas: function () {
                return this.$store.getters.cms_index_datas.splice(0, 3).map(function (item) {
                    item.date = '[' + formatDate(item.created_at, 'MM.dd') + ']';
                    return item;
                });
            }
        },
        methods: {
            windowResize () {
                this.layout_login_height = window.innerHeight - 200;
                this.layout_copy_width = document.body.scrollWidth - layout_base_width * 2;
                this.layout_placard_width = document.body.scrollWidth - 160 - layout_base_width * 2;
            },
            getADStyle (url) {
                return {
                    height: this.layout_login_height + 'px',
                    backgroundImage: 'url("' + url + '")'
                };
            },
            goNoticeUrl () {
                this.$router.push('/home/notice');
            },
            showNoticeContent (index) {
                const params = this.noticeDatas[index];
                this.$store.commit('cms_post', params);
                this.$router.push({ path: '/home/notice_content'})
            }
        }
    };
</script>