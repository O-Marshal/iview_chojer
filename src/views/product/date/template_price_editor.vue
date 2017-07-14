<style scoped>
</style>
<template>
    <SynModal v-model="value" title="报价选项" width="500" @on-confirm="confirm">
        <Form ref="destFrom" label-position="top" style="padding: 0 30px">
            <Row :gutter="20">
                <i-col span="24">
                    <Form-item label="项目名称">
                        <i-input v-model="formData.name" type="text"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <Form-item label="库存单位">
                        <i-input v-model="formData.unit" type="text"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <Form-item label="计算库存">
                        <Select v-model="formData.is_stock">
                            <Option :value="0">否</Option>
                            <Option :value="1">是</Option>
                        </Select>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <Form-item label="直客建议销售价">
                        <i-input v-model="formData.price_retail" type="text"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <Form-item label="同行报价">
                        <i-input v-model="formData.price_trade" type="text"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="24">
                    <Form-item label="备注信息">
                        <i-input v-model="formData.description" type="textarea" :rows="4"></i-input>
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
            group: Number,
            index: Number
        },
        data () {
            return {
                value: false,
                formData: {
                    name: "",
                    unit: "",
                    is_stock: 1,
                    price_trade: 0,
                    price_retail: 0,
                    description: "",
                    stock: {
                        type: 0,
                        count: 0,
                        union_id: 0
                    }
                }
            }
        },
        components: { SynModal },
        methods: {
            show (data) {
                this.formData = data;
                this.$nextTick(function () {
                    this.value = true;
                });
            },
            // 创建 & 编辑
            confirm () {
                this.$store.commit('product_setting_price_template_template_edit', {
                    group: this.group,
                    index: this.index,
                    data: this.formData
                });
                this.value = false;
            }
        }
    };
</script>