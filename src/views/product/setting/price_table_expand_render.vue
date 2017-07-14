<style>
    .price-expand .ivu-table-body .ivu-table-row td {
        padding: 0;
    }
    .price-expand .price-expand-table .ivu-table-body .ivu-table-row td {
        padding: 0 20px;
    }
</style>
<template>
    <div class="price-expand">
        <Row>
            <i-col span="22" offset="1">
                <h4 style="margin-bottom: 10px">价格模板</h4>
                <Table class="price-expand-table" size="small" :columns="columns" :data="tableDatas"></Table>
            </i-col>
            <i-col span="22" offset="1" v-if="row.org_id > 0">
                <h4 style="margin: 10px auto;">其他操作</h4>
                <span style="margin-right: 10px"><i-button type="success" @click.top="showPriceTemplateCreator">新增模板</i-button></span>
                <span style="margin-right: 10px"><i-button type="info" @click.stop="refreshData">刷新数据</i-button></span>
                <span><i-button type="error" @click="deletePrice">删除类目</i-button></span>
            </i-col>
        </Row>
        <PriceTemplateCreator ref="priceTemplateCreator" :group="row" :index="index" @on-ok="refreshData"></PriceTemplateCreator>
    </div>
</template>
<script>
    import PriceTemplateCreator from './price_template_creator';
    import PriceTemplateTableRender from './price_template_table_render.vue';

    export default {
        props: {
            index: Number,
            row: {}
        },
        components: { PriceTemplateCreator },
        data () {
            return {
                columns: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, obj) => h('span', obj.row.description ? "【备注】" + obj.row.description : '没有备注信息！')
                    },
                    {
                        title: '项目名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '单位',
                        key: 'unit',
                        align: 'center'
                    },
                    {
                        title: '计算库存',
                        align: 'center',
                        render: (h, r) => h('span', r.row.is_stock == 1 ? '是' : '否')
                    }
                ]
            }
        },
        computed: {
            tableDatas () {
                return this.$store.getters.product_setting_price_show[this.index];
            }
        },
        methods: {
            refreshData () {
                this.$store.dispatch('product_setting_price_show', {
                    index: this.index,
                    id: this.row.id
                });
            },
            showPriceTemplateCreator () {
                this.$refs['priceTemplateCreator'].show();
            },
            deletePrice () {
                const self = this;
                this.$Modal.confirm({
                    title: '删除提醒',
                    content: '是否删除字典【'+self.row.name+'】',
                    onOk () {
                        self.$store.dispatch('product_setting_price_destory', self.row.id);
                    },
                    onCancel () {
                        this.$Message.info('已经取消了');
                    }
                });
            }
        },
        mounted () {
            this.refreshData();
            if (this.row.org_id > 0) {
                this.columns.push({
                    title: '操作',
                    align: 'center',
                    width: '180',
                    render: (h, obj) => h(PriceTemplateTableRender, {props: {
                        row: obj.row,
                        index: this.index,
                        group: this.row
                    }})
                });
            }
        }
    };
</script>