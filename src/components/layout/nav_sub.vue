<style scoped>

</style>
<template>
    <div>
        <Menu :active-name="activeName" width="auto" @on-select="onMenuSelected">
            <template v-for="item in navMenus">
                <Menu-group :title="item.title" v-if="item.sub && item.sub.length > 0">
                    <SubMenu :menus="item.sub"></SubMenu>
                </Menu-group>
                <Menu-item :name="item.uri" v-else>
                    <Icon :type="item.icon"></Icon>
                    {{item.title}}
                </Menu-item>
            </template>
        </Menu>
    </div>
</template>
<script>

    import { mapGetters } from 'vuex';
    import SubMenu from './nav_sub_menu.vue';

    export default {
        components: { SubMenu },
        computed: {
            ...mapGetters({
                navMenus: 'menu_sub',
                activeName: 'menu_active_sub'
            })
        },
        methods: {
            onMenuSelected (path) {
                this.$router.push(path);
            }
        }
    };
</script>