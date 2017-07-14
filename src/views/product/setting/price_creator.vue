<style scoped>
</style>
<template>
    <SynModal v-model="value" title="报价类目" width="500" :loading="loading" @on-confirm="confirm">
        <Form ref="destFrom" label-position="top" style="padding: 0 30px">
            <Row :gutter="20">
                <i-col span="24">
                    <Form-item label="类目名称">
                        <i-input v-model="formData.name" type="text"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <Form-item label="关联产品">
                        <Cascader :data="createData.product" change-on-select v-model="formData.union_product"></Cascader>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <Form-item label="关联分类">
                        <Cascader :data="createData.customer" change-on-select v-model="formData.union_customer"></Cascader>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <Form-item label="必选数量">
                        <i-input v-model="formData.min" type="text"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <Form-item label="可选数量">
                        <i-input v-model="formData.max" type="text"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="24">
                    <Form-item label="是否库存类目（该类目下所有选项共享库存）">
                        <Radio-group v-model="formData.is_stock">
                            <Radio :label="0">否<small style="font-size: 60%; color: #aaa">（选项单独计算库存）</small></Radio>
                            <Radio :label="1">是<small style="font-size: 60%; color: #aaa">（根据分类设置库存）</small></Radio>
                        </Radio-group>
                    </Form-item>
                </i-col>
            </Row>
        </Form>
    </SynModal>
</template>
<script>
    import SynModal from '../../../components/modal/syn.vue';

    import { deepCopy } from 'iview/src/utils/assist';
    import { mapGetters } from 'vuex';

    export default {
        data () {
            return {
                value: false,
                loading: false,
                formData: {
                    name: "",
                    union_product: [],
                    union_customer: [],
                    min: 0,
                    max: 999,
                    is_stock: 0
                }
            }
        },
        components: { SynModal },
        computed: {
            ...mapGetters({
                createData: 'product_setting_price_create'
            })
        },
        methods: {
            show () {
                this.formData.name = '';
                this.formData.union_product = [];
                this.formData.union_customer = [];
                this.formData.min = 0;
                this.formData.max = 999;
                this.formData.is_stock = 0;
                this.$nextTick(function () {
                    this.value = true;
                });
            },
            // 创建 & 编辑
            confirm () {
                const data = deepCopy(this.formData);
                data.union_product = data.union_product.pop();
                data.union_customer = data.union_customer.pop();
                this.$store.dispatch('product_setting_price_store', data).then(function (result) {
                    this.loading = false;
                    if (result == true) this.value = false;
                }.bind(this));
            }
        }
    };
</script>