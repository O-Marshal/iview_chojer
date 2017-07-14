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
                            <Form-item label="搜索" icon="ios-search" prop="interest">
                                <i-input v-model="table.keywords" placeholder="请输入名称或编号"></i-input>
                            </Form-item>
                        </i-col>
                        <i-col span="14">
                            <div class="ivu-form-item">
                                <div class="ivu-form-item-content" style="padding-left: 20px; clear:both">
                                    <Button type="primary" @click.stop="refreshData">搜索</Button>
                                    <Button type="ghost" @click.stop="refreshTable" style="margin-left: 5px">刷新</Button>
                                </div>
                            </div>
                        </i-col>
                    </Row>
                </Form>
                <template slot="footer">
                    <Button type="warning" :disabled="table.showDeleteButton" @click="deleteRoles">删除</Button>
                    <Button type="success" @click="showRoleForm(-1)">新增</Button>
                </template>
            </TableWrap>
        </Layout>
        <RoleCreator ref="roleCreator"></RoleCreator>
    </div>
</template>
<script>
    import Layout from '../../components/layout/console.vue';
    import LineHeader from '../../components/unit/line_header.vue';
    import TableWrap from '../../components/box/table.vue';

    import RoleTableRender from './role_table_render.vue';
    import RoleCreator from './role_creator.vue';


    import { mapGetters } from 'vuex';

    export default {
        data () {
            return {
                self: this,
                table: {
                    keywords: '',
                    showDeleteButton: true,
                    selected: []
                },
                tableColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '编号',
                        key: 'code',
                        align: 'center'
                    },
                    {
                        title: '用户',
                        key: 'user_count',
                        align: 'center'
                    },
                    {
                        title: '电话',
                        key: 'tel',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'tel',
                        align: 'center',
                        render: (h, obj) => h(RoleTableRender, { props: obj })
                    }
                ]
            }
        },
        computed: {
            ...mapGetters({
                tableDatas: 'account_role_datas',
                tablePage: 'account_role_page'
            })
        },
        components: { Layout, LineHeader, TableWrap, RoleCreator },
        methods: {
            refreshData (page) {
                this.$store.dispatch('account_role_index', {
                    keywords: this.table.keywords,
                    page: page ? page : this.tablePage.current_page
                });
            },
            refreshTable () {
                this.table.keywords = '';
                this.refreshData();
            },
            selectionChange (selection) {
                this.table.selected = selection.map(item => item.id);
                this.table.showDeleteButton = selection.length === 0;
            },
            showRoleForm () {
                this.$refs['roleCreator'].show();
            },
            deleteRoles () {
                const self = this;
                this.$Modal.confirm({
                    title: '删除提醒',
                    content: '是否确认删除所选部门',
                    onOk () {
                        const uri = self.table.selected.join('|');
                        self.$store.dispatch('account_role_destory', uri);
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