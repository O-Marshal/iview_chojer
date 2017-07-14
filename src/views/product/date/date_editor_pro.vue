<style lang="less">
    .tour-date-wrap .ivu-picker-panel-body {
        float: none !important;
    }
    .tour-content-wrap .ivu-table-body .ivu-table-row td {
        padding: 0;
    }
    .tour-content-wrap .price-expand-table .ivu-table-body .ivu-table-row td {
        padding: 0 20px;
    }
    .team-date-expand-wrap .ivu-table-body .ivu-table-row td {
        padding: 0;
    }
</style>
<template>
    <div class="modal-syn-wrap">
        <Modal v-model="value" :title="modalTitle" width="680" class-name="vertical-center-modal">
            <div class="tour-content-wrap">
                <Table height="280" ref="proTable" :columns="tableColumns" :data="tableDatas"></Table>
            </div>
            <template slot="footer">
                <Dropdown placement="top-start" @on-click="addPriceGroups">
                    <i-button type="success">
                        新增
                        <Icon type="arrow-up-b"></Icon>
                    </i-button>
                    <Dropdown-menu slot="list">
                        <template v-for="(priceItem, index) in priceGroups">
                            <Dropdown-item :name="index" :disabled="disabledPriceGroups(index)">{{priceItem.name}}</Dropdown-item>
                        </template>
                    </Dropdown-menu>
                </Dropdown>
                <i-button type="ghost" @click="value = false">取消</i-button>
                <i-button type="primary" @click="publish" :loading="loading">确认</i-button>
            </template>
        </Modal>
    </div>
</template>
<script>

    import SynModal from '../../../components/modal/syn.vue';
    import LineHeader from '../../../components/unit/line_header.vue';

    import DateCreatorTableRender from './date_creator_table_render.vue';
    import DateCreatorTableExpandRender from './date_creator_table_expand_render.vue';

    import { deepCopy } from 'iview/src/utils/assist';
    import { mapGetters } from 'vuex';

    export default {
        props: {
            row: Object,
            product: Object
        },
        components: { SynModal, LineHeader },
        data () {
            return {
                value: false,
                loading: false,
                tableColumns: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, obj) => h(DateCreatorTableExpandRender, { props: obj })
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '必选',
                        key: 'min'
                    },
                    {
                        title: '可选',
                        key: 'max'
                    },
                    {
                        title: '类目库存',
                        render: (h, obj) => h('span', obj.row.is_stock == 1 ? obj.row.stock.count : '否')
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h, obj) => h(DateCreatorTableRender, { props: obj })
                    }
                ]
            };
        },
        computed: {
            ...mapGetters({
                disabledDates: 'product_setting_price_template_dates',
                priceGroups: 'product_setting_price_template_groups',
                tableDatas: 'product_setting_price_template_datas'
            }),
            modalTitle () {
                return '修改团期计划【' + this.row.date_str + '】';
            }
        },
        methods: {
            disabledPriceGroups (index) {
                return this.tableDatas.some(function (item) {
                    return this.priceGroups[index].id === item.group_id;
                }.bind(this));
            },
            addPriceGroups (index) {
                let group = deepCopy(this.priceGroups[index]);
                group.stock = { type: 0, count: 0, union_id: 0 };
                this.$store.commit('product_setting_price_template_group_add', group);
            },
            show () {
                this.$store.dispatch('product_date_edit', {
                    product_id: this.product.id,
                    date_id: this.row.id
                });
                this.$nextTick(function () {
                    this.value = true;
                });
            },
            // 发布团期
            publish () {
                this.loading = true;
                const templates = this.$store.getters.product_setting_price_template_templates;
                let datas = deepCopy(this.tableDatas).map(function (item, index) {
                    item.temps = templates[index];
                    return item;
                });

                this.$store.dispatch('product_tour_update', {
                    action: 'update_date_pro',
                    date_id: this.row.id,
                    datas: datas,
                    id: this.product.id
                }).then(function (result) {
                    this.loading = false;
                    this.$store.dispatch('product_tour_index', this.$store.getters.product_tour_params);
                    if (result == true) this.value = false;
                }.bind(this));
            }
        }
    };
</script>