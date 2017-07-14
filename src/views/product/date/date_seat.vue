<template>
    <Tooltip content="余位 / 占位 / 总库存">
        <span style="color: #0c6">{{ row.inventory_all - row.inventory_sales }}</span>
        /
        <span style="color: #f90">{{ row.inventory_locked }}</span>
        /
        <span style="color: #aaa">{{ row.inventory_all }}</span>
    </Tooltip>
</template>
<script>
    export default {
        props: {
            row: {},
            index: Number
        }
    };
</script>