<style>
    .team-date-expand .ivu-table-body .ivu-table-row td {
        padding: 0;
    }
    .team-date-expand .price-expand-table .ivu-table-body .ivu-table-row td {
        padding: 0;
    }
    .tour-content-wrap td.ivu-table-expanded-cell {
        padding: 10px 20px;
    }
</style>
<template>
    <div class="team-date-expand">
        <h4 style="margin-bottom: 10px">价格选项</h4>
        <i-table class="price-expand-table" ref="priceExpandTable" size="small" :columns="tableColumns" :data="tableDatas"></i-table>
    </div>
</template>
<script>

    import TemplateTableRender from './template_table_render.vue';

    import { deepCopy } from 'iview/src/utils/assist';
    import { mapGetters } from 'vuex';

    export default {
        props: {
            row: Object,
            index: Number
        },
        data () {
            return {
                tableColumns: [
                    {
                        title: '项目',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '零售价',
                        align: 'center',
                        key: 'price_retail'
                    },
                    {
                        title: '直客价',
                        align: 'center',
                        key: 'price_trade'
                    },
                    {
                        title: '库存',
                        align: 'center',
                        render (h, obj) {
                            if (obj.row.is_stock == 0) return h('span', '否');
                            if (this.row.is_stock == 1) return h('span', '-');
                            return h('span', obj.row.stock.count);
                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 130,
                        render: (h, obj) => h(TemplateTableRender, { props: { index: obj.index, row: obj.row, group: this.row, groupIndex: this.index } })
                    }
                ]
            }
        },
        computed: {
            ...mapGetters([ 'product_setting_price_template_templates' ]),
            tableDatas () {
                return this.product_setting_price_template_templates[this.index];
            }
        },
        methods: {
            parentContext () {
                return this.$parent.$parent.$parent.context;
            },
            parentTable () {
                return this.$parent.$parent.$parent;
            },
            expandRender (row, index) {
                return row.description ? "【备注】" + row.description : '没有备注信息！';
            },
            teTemp (temp, index) {
                this.parentContext().updateTemp(temp, index, this.index);
                this.$nextTick(function () {
                    this.parentTable().showExpand(this.index);
                });
            },
            updateStock (stock, index) {
                this.parentContext().updateItemStock(stock, index, this.index);
                this.$nextTick(function () {
                    this.parentTable().showExpand(this.index);
                });
            }
        }
    };
</script>