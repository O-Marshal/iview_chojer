<style scoped>
    .layout {
        border-bottom: 1px solid #d7dde4;
        background: #f5f7f9;
    }

    .layout-content {
        margin: 25px 60px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }

    .layout-content-wrap {
        padding: 20px 40px;
    }

    .layout-content-main {
        padding: 20px 0;
    }

    .layout-copy {
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
        height: 40px;
    }
</style>
<template>
    <div>
        <div class="layout">
            <NavTop></NavTop>
            <div class="layout-content" :style="{minHeight: layout_content_height + 'px' }">
                <Row>
                    <i-col span="5"><NavSub></NavSub></i-col>
                    <i-col span="19">
                        <div class="layout-content-wrap">
                            <Breadcrumb>
                                <template v-for="item in getBreadcrumb">
                                    <Breadcrumb-item :href="item.uri">{{item.label}}</Breadcrumb-item>
                                </template>
                            </Breadcrumb>
                            <div class="layout-content-main">
                                <slot></slot>
                            </div>
                        </div>
                    </i-col>
                </Row>
            </div>
        </div>
        <div class="layout-copy">
            <p>{{ website_copy_right }}</p>
            <p>{{ website_icp }}</p>
        </div>
    </div>
</template>
<script>

    import { mapGetters } from 'vuex';

    import NavTop from './nav_top.vue';
    import NavSub from './nav_sub.vue';

    const layout_content_base_height = 170;
    export default {
        data () {
            return {
                layout_content_height: document.body.scrollHeight - layout_content_base_height
            };
        },
        methods: {
            windowResize () {
                this.layout_content_height = document.body.scrollHeight - layout_content_base_height;
            }
        },
        computed: {
            ...mapGetters([
                'website_copy_right',
                'website_icp'
            ]),
            getBreadcrumb () {
                return this.$store.getters.menu_crumb
            }
        },
        mounted () {
            window.addEventListener('resize', this.windowResize);
        },
        components: {
            NavTop,
            NavSub
        }
    };
</script>