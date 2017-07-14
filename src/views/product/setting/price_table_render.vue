<template>
    <div>
        <i-button type="primary" size="small" @click.stop="showUserForm">编辑</i-button>
        <PriceEditor ref="priceTableRender" :data="row"></PriceEditor>
    </div>
</template>
<script>

    import PriceEditor from './price_editor.vue';

    export default {
        props: {
            row: Object,
            index: Number
        },
        components: { PriceEditor },
        methods: {
            showUserForm () {
                this.$refs['priceTableRender'].show();
            }
        }
    };
</script>