<style scoped lang="less">
    @import "../../styles/components/nav_top.less";
</style>
<template>
    <div class="nav-top-wrap">
        <i-menu mode="horizontal" theme="dark" :active-name="activeName" @on-select="onMenuSelected">
            <img class="nav-top-logo" :src="logo" alt="Logo">
            <div class="nav-top-user">
                <Dropdown @on-click="userEvent">
                    <img class="user-thumb" :src="userInfo && userInfo.avatar ? userInfo.avatar : ''">
                    <Dropdown-menu slot="list">
                        <!--<Dropdown-item>-->
                            <!--消息-->
                            <!--<Badge count="3"></Badge>-->
                        <!--</Dropdown-item>-->
                        <Dropdown-item name="account">账户信息</Dropdown-item>
                        <Dropdown-item name="logout" divided>退出登录</Dropdown-item>
                    </Dropdown-menu>
                </Dropdown>
            </div>
            <div class="nav-top-item">
                <template v-for="(item, key) in navMenus">
                    <template v-if="item.sub">
                        <Submenu :name="key">
                            <template slot="title">
                                <Icon :type="item.icon"></Icon>
                                {{item.title}}
                            </template>
                            <template v-for="(sub_item, sub_key) in item.sub">
                                <template v-if="sub_item.sub">
                                    <Menu-group :title="sub_item.title">
                                        <template v-for="(group_item, group_key) in sub_item.sub">
                                            <Menu-item :name="key + '|' + sub_key + '|' + group_key">{{group_item.title}}</Menu-item>
                                        </template>
                                    </Menu-group>
                                </template>
                                <template v-else>
                                    <Menu-item :name="sub_key">
                                        <Icon :type="sub_item.icon"></Icon>
                                        {{sub_item.title}}
                                    </Menu-item>
                                </template>
                            </template>
                        </Submenu>
                    </template>
                    <template v-else>
                        <Menu-item :name="key">
                            <Icon :type="item.icon"></Icon>
                            {{item.title}}
                        </Menu-item>
                    </template>
                </template>
            </div>
        </i-menu>
    </div>
</template>
<script>

    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                navMenus: 'menu_top',
                activeName: 'menu_active_top',
                userInfo: 'auth_info',
                logo: 'website_logo_console'
            })
        },
        methods: {
            isFullScreen () {
                return (document.body.scrollHeight == window.screen.height);
            },
            onMenuSelected (itemKey) {
                let menu = this.navMenus;
                itemKey.split('|').forEach(function (key) {
                    if (menu === this.navMenus) {
                        menu = menu[key];
                    } else {
                        menu = menu.sub[key];
                    }
                }.bind(this));
                this.$router.push(menu.uri);
            },
            userEvent (name) {
                switch (name) {
                    case 'logout':
                        this.$store.commit('auth_logout');
                        this.$router.push('/auth/login');
                        break;
                    case 'account':
                        return this.$router.push('/setting/account');
                }
            }
        }
    };
</script>