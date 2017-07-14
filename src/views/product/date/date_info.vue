<style lang="less">

</style>
<template>
    <div class="modal-syn-wrap">
        <Modal v-model="value" :title="modalTitle" width="600" class-name="vertical-center-modal">
            <div class="ivu-table-wrapper" style="margin: 20px;">
                <div class="ivu-table ivu-table-border">
                    <div class="ivu-table-header">
                        <table cellspacing="0" cellpadding="0" border="0">
                            <colgroup><col width="200"><col width="80"><col width="80"><col width="120"><col width="100"><col width="100"></colgroup>
                            <thead><tr>
                                <th class=""><div class="ivu-table-cell"><span>项目名称</span></div></th>
                                <th class="ivu-table-column-center"><div class="ivu-table-cell"><span>已售</span></div></th>
                                <th class="ivu-table-column-center"><div class="ivu-table-cell"><span>占位</span></div></th>
                                <th class="ivu-table-column-center"><div class="ivu-table-cell"><span>库存</span></div></th>
                                <th class="ivu-table-column-center"><div class="ivu-table-cell"><span>直客价</span></div></th>
                                <th class="ivu-table-column-center"><div class="ivu-table-cell"><span>同行价</span></div></th>
                            </tr></thead>
                        </table>
                    </div>
                    <div class="ivu-table-body" style="max-height: 300px">
                        <table cellspacing="0" cellpadding="0" border="0">
                            <colgroup><col width="200"><col width="80"><col width="80"><col width="120"><col width="100"><col width="100"></colgroup>
                            <tbody class="ivu-table-tbody">
                                <template v-for="(group, index) in tableDatas">
                                    <tr class="ivu-table-row">
                                        <td colspan="100"><div class="ivu-table-cell">{{group.name}}<small v-if="group.is_stock == 1" style="float: right">已售：<span style="margin-right: 20px">{{group.inventory_sales}}</span> 库存：<Tooltip content="余位 / 占位 / 总库存"><span style="color: #0c6">{{group.stock.count - group.inventory_sales}}</span> / <span style="color: #f90">{{group.inventory_locked}}</span> / <span style="color: #aaa">{{group.stock.count}}</span></Tooltip></small></div></td>
                                    </tr>
                                    <template v-for="temp in group.templates">
                                        <tr class="ivu-table-row"><td><div class="ivu-table-cell">{{temp.name}}</div></td><td><div class="ivu-table-cell">{{temp.inventory_sales}}</div></td><td><div class="ivu-table-cell">{{temp.inventory_locked}}</div></td><td class="ivu-table-column-center"><div class="ivu-table-cell">
                                            <Tooltip v-if="group.is_stock == 0 && temp.is_stock == 1" content="余位 / 总库存"><span style="color: #0c6">3</span> / <span style="color: #aaa">20</span></Tooltip>
                                            <span v-else>-</span>
                                        </div></td><td class="ivu-table-column-center"><div class="ivu-table-cell">￥ <span>{{temp.price_trade}}</span></div></td><td class="ivu-table-column-center"><div class="ivu-table-cell">￥ <span>{{temp.price_retail}}</span></div></td></tr>
                                    </template>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>

    import { mapGetters } from 'vuex';

    export default {
        props: { row: Object },
        data () {
            return { value: false };
        },
        computed: {
            ...mapGetters({
                tableDatas: 'product_date_show'
            }),
            modalTitle () {
                return '报价详情【' + this.row.date_str + '】';
            }
        },
        methods: {
            show () {
                this.$store.dispatch('product_date_show', this.row.id);
                this.$nextTick(function () {
                    this.value = true;
                });
            }
        }
    };
</script>