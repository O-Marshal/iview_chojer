<template>
    <div>
        <Dropdown @on-click="onClickItem">
            <i-button type="ghost" size="small">
                操作
                <Icon type="arrow-down-b"></Icon>
            </i-button>
            <Dropdown-menu slot="list">
                <Dropdown-item name="info">详情</Dropdown-item>
                <Dropdown-item name="edit">修改</Dropdown-item>
                <Dropdown-item divided name="order">下单</Dropdown-item>
                <Dropdown-item divided name="delete">删除</Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
        <DateInfo ref="dateInfo" :row="row"></DateInfo>
        <DateEditorPro ref="dateEditorPro" :row="row" :product="product"></DateEditorPro>
    </div>
</template>
<script>

    import DateInfo from './date_info.vue';
    import DateEditorPro from './date_editor_pro.vue';

    export default {
        props: {
            product: Object,
            row: Object,
            index: Number
        },
        components: { DateInfo, DateEditorPro },
        methods: {
            onClickItem (action) {
                switch (action) {
                    case 'info':
                        return this.$refs['dateInfo'].show();
                    case 'edit':
                        return this.$refs['dateEditorPro'].show();
                }
            }
        }
    };
</script>