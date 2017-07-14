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
            <div slot="desc" style="margin-top: 10px">使用 <code>目的地标签</code> 能更有效的管理产品线路，查询统计、分析线路数据；【标签】关联系统【目的地】数据后能更的方便的将产品<code>上架</code>至平台B2B及B2C网站；【标签】关联资质后将方便旅行社和门店之间的 <code>合同管理</code> </div>
        </Alert>
        <TableWrap :columns="tableColumns" :data="tableDatas" :page="tablePage" @on-selection-change="selectionChange">
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
                <Button type="warning" :disabled="table.showDeleteButton" @click="deleteDestination">删除</Button>
                <Button type="success" @click="addDestination">新增</Button>
            </template>
        </TableWrap>
        <DestinationCreator ref="destinationCreator"></DestinationCreator>
    </Layout>
</template>
<script>
    import TableWrap from '../../../components/box/table.vue';
    import Layout from '../../../components/layout/console.vue';

    import DestinationCreator from './destination_creator.vue';
    import DestinationTableRender from './destination_table_render.vue';

    import { mapGetters } from 'vuex';

    export default {
        data () {
            return {
                table: {
                    showDeleteButton: true,
                    keywords: '',
                    selected: []
                },
                tableColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '封面图',
                        align: 'center',
                        width: 200,
                        render (h, obj) {
                            return h('img', {
                                style: {
                                    width: "120px",
                                    height: "80px",
                                    marginTop: "5px",
                                    padding: "3px"
                                },
                                attrs: {
                                    src: obj.row.cover_image ? (obj.row.cover_image + "/300x200") : ''
                                }
                            });
                        }
                    },
                    {
                        title: '目的地',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '描述',
                        key: 'description',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h, obj) => h(DestinationTableRender, { props: obj })
                    }
                ]
            }
        },
        components: { Layout, TableWrap, DestinationCreator },
        computed: {
            ...mapGetters({
                tableDatas: 'product_setting_destination_datas',
                tablePage: 'product_setting_destination_page'
            })
        },
        methods: {
            refreshData (page) {
                this.selected = [];
                this.$store.dispatch('product_setting_destination_index', {
                    keywords: this.table.keywords,
                    page: page ? page : this.tablePage.current_page
                });
            },
            refreshTable () {
                this.table.keywords = '';
                this.refreshData();
            },
            addDestination () {
                this.$refs['destinationCreator'].show();
            },
            selectionChange (selection) {
                this.table.selected = selection.map(item => item.id);
                this.table.showDeleteButton = selection.length === 0;
            },
            deleteDestination () {
                const self = this;
                this.$Modal.confirm({
                    title: '删除提醒',
                    content: '是否确认删除所选标签',
                    onOk () {
                        const uri = self.table.selected.join('|');
                        self.$store.dispatch('product_setting_destination_destory', uri);
                    },
                    onCancel () {
                        this.$Message.info('已经取消了');
                    }
                });
            }
        },
        mounted () {
            this.refreshData(1);
        }

    };
</script>