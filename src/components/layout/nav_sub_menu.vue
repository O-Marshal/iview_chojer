<style scoped>

</style>
<template>
    <div>
        <template v-for="item in menus">
            <template v-if="item.sub && item.sub.length > 0">
                <Submenu :name="item.uri">
                    <template slot="title">
                        <Icon :type="item.icon"></Icon>
                        {{item.title}}
                    </template>
                    <nav-sub-menu :menus="item.sub"></nav-sub-menu>
                </Submenu>
            </template>
            <template v-else>
                <Menu-item :name="item.uri">
                    <Icon :type="item.icon"></Icon>
                    {{item.title}}
                </Menu-item>
            </template>
        </template>
    </div>
</template>
<script>
    export default {
        name: 'nav-sub-menu',
        props: ['menus'],
        data () {
            return {

            };
        }
    };
</script>