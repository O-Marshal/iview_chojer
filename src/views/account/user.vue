<style scoped>
    @import "../../styles/components/i_modal.less";
</style>
<template>
    <div class="wrap">
        <Layout>
            <TableWrap :columns="tableColumns" :data="tableDatas" :page="tablePage" @on-page="refreshData" @on-selection-change="selectionChange">
                <Form :label-width="80">
                    <Row>
                        <i-col span="10">
                            <Form-item label="搜索:" icon="ios-search" prop="interest">
                                <i-input v-model="table.keywords" placeholder="请输入姓名、账号、手机或邮箱"></i-input>
                            </Form-item>
                        </i-col>
                        <i-col span="14">
                            <div class="ivu-form-item">
                                <div class="ivu-form-item-content" style="padding-left: 20px; clear:both">
                                    <Button type="primary" @click="refreshData()">搜索</Button>
                                    <Button type="ghost" @click="refreshTable" style="margin-left: 5px">刷新</Button>
                                </div>
                            </div>
                        </i-col>
                        <i-col span="24">
                            <Form-item label="部门:" prop="role_id">
                                <Radio-group v-model="table.role_id" @on-change="refreshData()">
                                    <Radio label="-1">全部</Radio>
                                    <template v-for="item in createData.roles">
                                        <Radio :label="item.id">{{item.name}}</Radio>
                                    </template>
                                </Radio-group>
                            </Form-item>
                        </i-col>
                    </Row>
                </Form>
                <template slot="footer">
                    <Button type="warning" :disabled="table.showDeleteButton" @click.stop="deleteUsers">删除</Button>
                    <Button type="success" @click.stop="addUser">新增</Button>
                </template>
            </TableWrap>
        </Layout>
        <UserCreator ref="userCreator"></UserCreator>
    </div>
</template>
<script>
    import BoxWrap from '../../components/box/wrap.vue';
    import TableWrap from '../../components/box/table.vue';
    import Layout from '../../components/layout/console.vue';

    import UserTableRender from './user_table_render.vue';
    import UserCreator from './user_creator.vue';

    import { mapGetters } from 'vuex';

    export default {
        data () {
            return {
                table: {
                    showDeleteButton: true,
                    keywords: '',
                    selected: [],
                    role_id: -1
                },
                tableColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '-',
                        align: 'center',
                        width: 80,
                        render (h, obj) {
                            return h('img', {
                                style: {
                                    width: "100%",
                                    marginTop: "5px",
                                    borderRadius: "40px",
                                    padding: "3px"
                                },
                                attrs: {
                                    src: obj.row.avatar + "/100x100"
                                }
                            });
                        }
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '部门',
                        align: 'center',
                        render: (h, obj) => h('span', obj.row.role ? obj.row.role.name : '-')
                    },
                    {
                        title: '性别',
                        align: 'center',
                        render: (h, obj) => h('span', obj.row.user_info.sex == 1 ? '女' : '男')
                    },
                    {
                        title: '手机',
                        key: 'mobile',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'tel',
                        align: 'center',
                        render: (h, obj) => h(UserTableRender, { props: obj })
                    }
                ]
            }
        },
        components: { Layout, TableWrap, BoxWrap, UserCreator },
        computed: {
            ...mapGetters({
                tableDatas: 'account_user_datas',
                tablePage: 'account_user_page',
                createData: 'account_user_create'
            })
        },
        methods: {
            refreshData (page) {
                this.selected = [];
                this.$store.dispatch('account_user_create');
                this.$store.dispatch('account_user_index', {
                    role_id: this.table.role_id,
                    keywords: this.table.keywords,
                    page: page ? page : this.tablePage.current_page
                });
            },
            refreshTable () {
                this.table.keywords = '';
                this.table.role_id = -1;
                this.refreshData();
            },
            selectionChange (selection) {
                this.table.selected = selection.map(item => item.id);
                this.table.showDeleteButton = selection.length === 0;
            },
            addUser () {
                this.$refs['userCreator'].show();
            },
            deleteUsers () {
                const self = this;
                this.$Modal.confirm({
                    title: '删除提醒',
                    content: '是否确认删除所选用户',
                    onOk () {
                        const uri = self.table.selected.join('|');
                        self.$store.dispatch('account_user_destory', uri);
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