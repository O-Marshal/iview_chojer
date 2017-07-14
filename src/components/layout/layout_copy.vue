<style scoped lang="less">
    @import "../../styles/components/layout_copy.less";
</style>
<template>
    <div class="layout-copy-wrap">
        <div class="layout-copy">
            <p>{{ website_copy_right }}</p>
            <p>{{ website_icp }}</p>
        </div>
    </div>
</template>
<script>

    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                'website_copy_right',
                'website_icp'
            ])
        }
    };
</script>