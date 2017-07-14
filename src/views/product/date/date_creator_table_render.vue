<template>
    <div>
        <Dropdown @on-click="editPriceTemplate">
            <i-button type="ghost" size="small">
                操作
                <Icon type="arrow-down-b"></Icon>
            </i-button>
            <Dropdown-menu slot="list">
                <Dropdown-item name="add">新增</Dropdown-item>
                <Dropdown-item v-if="row.is_stock == 1" name="stock">库存</Dropdown-item>
                <Dropdown-item divided name="delete">删除</Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
        <DatePriceCreator ref="datePriceCreator" :index="index"></DatePriceCreator>
        <DatePriceStock ref="datePriceSrockForm"></DatePriceStock>
    </div>
</template>
<script>

    import DatePriceStock from './date_price_stock.vue';
    import DatePriceCreator from './date_price_creator.vue';

    export default {
        props: {
            row: Object,
            index: Number
        },
        components: { DatePriceCreator, DatePriceStock },
        methods: {
            editPriceTemplate (action) {
                switch (action.toUpperCase()) {
                    case 'ADD':
                        return this.$refs['datePriceCreator'].show();
                    case 'DELETE':
                        return this.$store.commit('product_setting_price_template_group_delete', this.index);
                    case 'STOCK':
                        return this.$refs['datePriceSrockForm'].show(this.index, this.row.stock);
                }
            },
        }
    };

</script>