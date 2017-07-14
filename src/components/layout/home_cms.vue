<style scoped lang="less">

</style>
<template>
    <Layout :active-name="activeName" style="">
        <div :style="getStyles()">
            <h1 style="text-align: center; font-size: 24px; margin: 30px">{{ title }}</h1>
            <slot></slot>
        </div>
    </Layout>
</template>
<script>
    import Layout from './home.vue';

    const layout_content_base_height = 170;
    export default {
        props: {
            activeName: String,
            title: String
        },
        data () {
            return {
                layout_content_height: document.body.scrollHeight - layout_content_base_height,
            };
        },
        components: { Layout },
        methods: {
            getStyles () {
                return {
                    "margin": "50px 80px",
                    "background-color": "#fff",
                    "border-radius": "5px",
                    "box-shadow": "0 0 20px rgba(0, 0, 0, 0.05)",
                    "padding": "20px 80px 80px",
                    "min-height": this.layout_content_height + 'px'
                };
            },
            windowResize () {
                this.layout_content_height = document.body.scrollHeight - layout_content_base_height;
            }
        },
        mounted () {
            window.addEventListener('resize', this.windowResize);
        }
    };
</script>