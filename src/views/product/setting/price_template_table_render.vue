<template>
    <div>
        <i-button size="small" type="primary" @click.stop="showPriceTamplateEditor">编辑</i-button>
        <i-button size="small" type="error" @click.stop="deletePriceTemplate" style="margin-left: 5px">删除</i-button>
        <PriceTamplateEditor ref="priceTamplateEditor" :group="group" :data="row" :index="index"></PriceTamplateEditor>
    </div>
</template>
<script>

    import PriceTamplateEditor from './price_template_editor.vue';

    export default {
        props: {
            group: {},
            row: {},
            index: Number
        },
        components: { PriceTamplateEditor },
        methods: {
            showPriceTamplateEditor () {
                this.$refs['priceTamplateEditor'].show();
            },
            deletePriceTemplate () {
                const self = this;
                this.$Modal.confirm({
                    title: '删除提醒',
                    content: '是否确认删除【'+self.row.name+'】',
                    onOk () {
                        self.$store.dispatch('product_setting_price_template_destory', self.row.id).then(function (result) {
                            if (result == true) {
                                self.$store.dispatch('product_setting_price_show', {
                                    index: self.index,
                                    id: self.group.id
                                });
                            }
                        });
                    },
                    onCancel () {
                        this.$Message.info('已经取消了');
                    }
                });
            }
        }
    };
</script>