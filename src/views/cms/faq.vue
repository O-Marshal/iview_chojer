<style scoped>
    @import "../../styles/components/i_modal.less";
</style>
<template>
    <div class="wrap">
        <Layout>
            <TableWrap :columns="tableColumns" :context="self" :data="tableDatas" :page="tablePage" @on-page="refreshData" @on-selection-change="selectionChange">
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
                    <Button type="warning" :disabled="table.showDeleteButton" @click="deleteContent">删除</Button>
                </template>
            </TableWrap>
        </Layout>
    </div>
</template>
<script>

    import { mapGetters } from 'vuex';
    import BoxWrap from '../../components/box/wrap.vue'
    import TableWrap from '../../components/box/table.vue'
    import Layout from '../../components/layout/console.vue'

    export default {
        data () {
            return {
                self: this,
                cms_type: 'faq',
                createData: {
                    accountPrefix: '',
                    roles: []
                },
                table: {
                    showDeleteButton: true,
                    keywords: '',
                    selected: [],
                    role_id: -1
                },
                tableColumns: [
                    {
                        type: 'selection',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '标题',
                        key: 'title'
                    },
                    {
                        title: '作者',
                        align: 'center',
                        render: (h, obj) => h('span', obj.row.author.name)
                    },
                    {
                        title: '发布时间',
                        key: 'created_at',
                        align: 'center'
                    },
                    {
                        title: '阅读次数',
                        align: 'center',
                        render: (h, obj) => h('span', '-')
                    }
                ]
            }
        },
        components: {Layout, TableWrap, BoxWrap},
        computed: {
            ...mapGetters({
                tableDatas: 'cms_common_datas',
                tablePage: 'cms_common_page'
            })
        },
        methods: {
            refreshData (page) {
                this.selected = [];
                this.$store.dispatch('cms_common_index', {
                    type: this.cms_type,
                    keywords: this.keywords,
                    page: page ? page : this.tablePage.current_page
                });
            },
            refreshTable () {
                this.table.keywords = '';
                this.table.role_id = -1;
                this.$ajax.account.getUserCreate(this);
                this.refreshData();
            },
            selectionChange (selection) {
                this.table.selected = selection.map(item => item.id);
                this.table.showDeleteButton = selection.length === 0;
            },
            deleteContent () {
                const self = this;
                this.$Modal.confirm({
                    title: '删除提醒',
                    content: '是否确认删除所选内容',
                    onOk () {
                        const uri = self.table.selected.join('|');
                        self.$store.dispatch('cms_common_destory', uri);
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