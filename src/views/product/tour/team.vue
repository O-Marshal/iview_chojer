<style>
    /*.team-date-expand-wrap .ivu-poptip-content .ivu-table-body .ivu-table-row td {*/
        /*padding: 10px 20px;*/
    /*}*/
</style>
<template>
    <div class="wrap">
        <Layout>
            <TableWrap ref-name="tourTeamTable" ref="tourTeamWrap" :columns="tableColumns" :data="tableDatas" :page="tablePage" @on-page="refreshData">
                <Form :label-width="80">
                    <Row>
                        <i-col span="10">
                            <Form-item label="搜索:" icon="ios-search" prop="interest">
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
                        <i-col span="24">
                            <Form-item label="目的地:">
                                <Radio-group v-model="table.destination" @on-change="refreshData()">
                                    <Radio label="-1">全部</Radio>
                                    <template v-for="item in createData.destination">
                                        <Radio :label="item.id">{{item.name}}</Radio>
                                    </template>
                                </Radio-group>
                            </Form-item>
                        </i-col>
                    </Row>
                </Form>
            </TableWrap>
        </Layout>
    </div>
</template>
<script>
    import BoxWrap from '../../../components/box/wrap.vue';
    import TableWrap from '../../../components/box/table.vue';
    import Layout from '../../../components/layout/console.vue';

    import TourTableExpandRender from './tour_table_expand_render.vue';

    import { mapGetters } from 'vuex';

    export default {
        data () {
            return {
                self: this,
                table: {
                    keywords: '',
                    selected: [],
                    destination: -1
                },
                tableColumns: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => h(TourTableExpandRender, { props: { row: params.row, index: params.index } })
                    },
                    {
                        title: '名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '线路编号',
                        align: 'center',
                        key: 'code'
                    },
                    {
                        title: '目的地',
                        align: 'center',
                        key: '_destination'
                    },
                    {
                        title: '最近团期',
                        key: 'mobile',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        align: 'center',
                        render: (h, params) => h('span', ['编辑中', '已上架'][params.row.status])
                    }
                ]
            }
        },
        components: { Layout, TableWrap, BoxWrap },
        computed: {
            ...mapGetters({
                tableDatas: 'product_tour_datas',
                tablePage: 'product_tour_page',
                createData: 'product_tour_create'
            })
        },
        methods: {
            refreshData (page) {
                this.selected = [];
                this.$store.dispatch('product_tour_create');
                this.$store.dispatch('product_tour_index', {
                    keywords: '',
                    destination: -1,
                    page: page ? page : this.tablePage.current_page
                });
            },
            refreshTable () {
                this.table.keywords = '';
                this.table.destination = -1;
                this.refreshData();
            }
        },
        mounted () {
            this.refreshData();
        }
    };
</script>