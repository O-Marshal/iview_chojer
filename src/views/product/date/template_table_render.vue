<template>
    <div>
        <Dropdown @on-click="editPriceTemplate">
            <i-button type="ghost" size="small">
                操作
                <Icon type="arrow-down-b"></Icon>
            </i-button>
            <Dropdown-menu slot="list">
                <Dropdown-item name="edit">编辑</Dropdown-item>
                <Dropdown-item v-if="isStock" name="stock">库存</Dropdown-item>
                <Dropdown-item divided name="delete">删除</Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
        <TemplatePriceEditor ref="templatePriceEditor" :index="index" :group="groupIndex"></TemplatePriceEditor>
        <TemplatePriceStock ref="templatePriceStock" :index="index" :group="groupIndex"></TemplatePriceStock>
    </div>
</template>
<script>

    import TemplatePriceEditor from './template_price_editor.vue';
    import TemplatePriceStock from './template_price_stock.vue';

    export default {
        props: {
            group: {},
            groupIndex: Number,
            row: {},
            index: Number
        },
        components: { TemplatePriceEditor, TemplatePriceStock },
        computed: {
            isStock () {
                return this.group.is_stock == 0 && this.row.is_stock == 1;
            }
        },
        methods: {
            editPriceTemplate (action) {
                switch (action.toUpperCase()) {
                    case 'EDIT':
                        return this.$refs['templatePriceEditor'].show(this.row);
                    case 'DELETE':
                        return this.$store.commit('product_setting_price_template_template_dilete', {
                            group: this.groupIndex,
                            index: this.index
                        });
                    case 'STOCK':
                        return this.$refs['templatePriceStock'].show(this.row.stock);
                }
            }
        }
    };

</script>