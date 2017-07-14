<style scoped lang="less">
    @import "../../styles/base.less";
    @import "../../styles/auth/login.less";
</style>
<template>
    <div class="layout-wrap">
        <div class="layout">
            <i-menu mode="horizontal" theme="light" :active-name="activeName" @on-select="menuSelected">
                <img class="layout-logo" @click.stop="goHome" :src="website_logo_home" alt="Logo">
                <div class="layout-nav">
                    <Menu-item name="_home">官网</Menu-item>
                    <Menu-item name="/home/notice">系统公告</Menu-item>
                    <Menu-item name="/auth/login">后台登录</Menu-item>
                </div>
            </i-menu>
            <slot></slot>
        </div>
        <LayoutCopy>版权信息</LayoutCopy>
    </div>
</template>
<script>

    import Urls from '../../config/urls';
    import LayoutCopy from '../../components/layout/layout_copy.vue';

    import { mapGetters } from 'vuex';

    export default {
        props: {
            activeName: String
        },
        components: { LayoutCopy },
        computed: {
            ...mapGetters([
                'website_logo_home'
            ])
        },
        methods: {
            goHome () {
                this.$router.push('/');
            },
            menuSelected (name) {
                // todo 此处首页跳转
                if (name === '_home') {
                    return window.open(Urls.HOME_URL);
                }
                this.$router.push(name);
            }
        }
    };
</script>