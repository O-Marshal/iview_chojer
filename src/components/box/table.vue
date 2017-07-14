<style scoped>

</style>
<template>
    <div class="box-table">
        <BoxWrap><slot>搜索框</slot></BoxWrap>
        <Table :columns="columns" :data="data" @on-selection-change="selectionChange"></Table>
        <div style="padding: 10px 0">
            <div style="float:right">
                <Page :total="pages.total" :page-size="pages.per_page" :current="pages.current_page" @on-change="onPageEvent"></Page>
            </div>
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script>
    import BoxWrap from '../../components/box/wrap.vue';

    export default {
        props: {
            refName: {
                type: String,
                default: '_tableDom'
            },
            columns: Array,
            data: Array,
            page: Object
        },
        data () {
            return {
                pages: {
                    total: 0,
                    per_page: 0,
                    current_page: 1
                }
            };
        },
        methods: {
            onPageEvent (page) {
                this.$emit('on-page', page);
            },
            selectionChange (selection) {
                this.$emit('on-selection-change', selection);
            }
        },
        components: { BoxWrap },
        watch: {
            page (val) {
                if (val) this.pages = val;
            }
        }

    };
</script>