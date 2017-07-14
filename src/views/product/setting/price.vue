<style scoped>
    code {
        background-color: #fff5e6;
        padding: 3px 5px;
        margin: auto 5px;
        border-radius: 2px;
        color: #657180;
    }
</style>
<template>
    <Layout>
        <Alert style="margin-top: 20px">
            功能说明
            <div slot="desc" style="margin-top: 10px">使用 <code>报价字典</code> 能灵活设计产品价格；方便机票、酒店、门票、导游、租车等类目自由搭配 </div>
        </Alert>
        <TableWrap :columns="tableColumns" :data="tableDatas" :page="tablePage" @on-page="refreshData">
            <Form :label-width="80">
                <Row>
                    <i-col span="10">
                        <Form-item label="搜索:" icon="ios-search">
                            <i-input v-model="table.keywords"></i-input>
                        </Form-item>
                    </i-col>
                    <i-col span="14">
                        <div class="ivu-form-item">
                            <div class="ivu-form-item-content" style="padding-left: 20px; clear:both">
                                <Button type="primary" @click="refreshData">搜索</Button>
                                <Button type="ghost" @click="refreshTable" style="margin-left: 5px">刷新</Button>
                            </div>
                        </div>
                    </i-col>
                </Row>
            </Form>
            <template slot="footer">
                <!--<Button type="warning" :disabled="table.showDeleteButton" @click="deleteDestination">删除</Button>-->
                <Button type="success" @click.stop="showPriceCreator">新增</Button>
            </template>
        </TableWrap>
        <PriceCreator ref="priceCreator"></PriceCreator>
    </Layout>
</template>
<script>
    import TableWrap from '../../../components/box/table.vue';
    import Layout from '../../../components/layout/console.vue';

    import PriceCreator from './price_creator.vue';
    import PriceTableRender from './price_table_render.vue';
    import PriceTableExpandRender from './price_table_expand_render.vue';

    import { mapGetters } from 'vuex';

    export default {
        data () {
            return {
                createData: {
                    product: [],
                    customer: []
                },
                table: {
                    showDeleteButton: true,
                    keywords: ''
                },
                tableColumns: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, obj) => h(PriceTableExpandRender, { props: obj })
                    },
                    {
                        title: '类目名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '关联产品',
                        align: 'center',
                        render: (h, obj) => h('span', obj.row.union_product ? obj.row.union_product.name : '-')
                    },
                    {
                        title: '关联分类',
                        align: 'center',
                        render: (h, obj) => h('span', obj.row.union_customer ? obj.row.union_customer.name : '-')
                    },
                    {
                        title: '必选数量',
                        key: 'min',
                        align: 'center'
                    },
                    {
                        title: '可选数量',
                        key: 'max',
                        align: 'center'
                    },
                    {
                        title: '类目库存',
                        align: 'center',
                        render: (h, obj) => h('span', obj.row.is_stock == 1 ? '是' : '否')
                    },
                    {
                        type: '操作',
                        align: 'center',
                        render: (h, obj) => h(PriceTableRender, { props: obj })
                    }
                ]
            }
        },
        components: { Layout, TableWrap, PriceCreator },
        computed: {
            ...mapGetters({
                tableDatas: 'product_setting_price_datas',
                tablePage: 'product_setting_price_page'
            })
        },
        methods: {
            refreshData (page) {
                this.selected = [];
                this.$store.dispatch('product_setting_price_create');
                this.$store.dispatch('product_setting_price_index', {
                    keywords: this.table.keywords,
                    page: page ? page : this.tablePage.current_page
                });
            },
            refreshTable () {
                this.table.keywords = '';
                this.refreshData();
            },
            showPriceCreator () {
                this.$refs['priceCreator'].show();
            },
            deleteDestination () {
                const self = this;
                this.$Modal.confirm({
                    title: '删除提醒',
                    content: '是否确认删除选价格',
                    onOk () {
                        const uri = self.table.selected.join('|');
                        self.$store.dispatch('product_setting_price_destory', uri);
                    },
                    onCancel () {
                        this.$Message.info('已经取消了');
                    }
                });
            }
        },
        mounted () {
            this.refreshData();
        }

    };
</script>