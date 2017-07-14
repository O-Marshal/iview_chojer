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
    import SynModal from '../../../components/modal/syn.vue'
    import { deepCopy } from 'iview/src/utils/assist';

    export default {
        props: {
            rows: Array
        },
        data () {
            return {
                self: this,
                value: false,
                loading: false,
                index: -1,
                createData: {
                    product: [],
                    customer: []
                },
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
        methods: {
            show (index) {
                this.formData.name = '';
                this.formData.union_product = [];
                this.formData.union_customer = [];
                this.formData.min = 0;
                this.formData.max = 999;
                this.formData.is_stock = 0;
                this.index = index;
                this.$nextTick(function () {
                    if (index >= 0) {
                        const cloneData = deepCopy(this.rows[index]);
                        this.formData.name = cloneData.name;
                        if (cloneData.union_product) {
                            const union_product = cloneData.union_product;
                            this.formData.union_product.splice(0, 0, union_product.id);
                            if (union_product.parent) {
                                this.formData.union_product.splice(0, 0, union_product.parent.id);
                            }
                        }
                        if (cloneData.union_customer) {
                            const union_customer = cloneData.union_customer;
                            this.formData.union_customer.splice(0, 0, union_customer.id);
                            if (union_customer.parent) {
                                this.formData.union_customer.splice(0, 0, union_customer.parent.id);
                            }
                        }
                        this.formData.min = cloneData.min;
                        this.formData.max = cloneData.max;
                        this.formData.is_stock = cloneData.is_stock;
                    }
                    this.value = true;
                });
            },
            // 创建 & 编辑
            confirm () {
                const data = deepCopy(this.formData);
                data.union_product = data.union_product.pop();
                data.union_customer = data.union_customer.pop();
                if (this.index >= 0) {
                    const cloneData = this.rows[this.index];
                    return this.$ajax.productSetting.priceUpdate(this, cloneData.id, data);
                }
                this.$ajax.productSetting.priceStore(this, data);
            }
        },
        mounted () {
            this.$ajax.productSetting.priceCreate(this);
        }
    };
</script>