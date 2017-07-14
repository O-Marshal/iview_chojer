<style scoped>
</style>
<template>
    <SynModal v-model="value" title="库存设定" width="400" @on-confirm="confirm">
        <Form ref="destFrom" label-position="top" style="padding: 0 30px">
            <Row :gutter="20">
                <i-col span="24">
                    <Form-item label="设定方式">
                        <Select v-model="formData.type">
                            <Option :value="0">单独设置</Option>
                            <Option disabled :value="1">关联库存</Option>
                        </Select>
                    </Form-item>
                </i-col>
                <i-col span="24">
                    <Form-item label="库存数量">
                        <i-input :disabled="formData.type===1" v-model="formData.count" type="text"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="24">
                    <Form-item label="关联产品">
                        <Select :disabled="formData.type===0" v-model="formData.union_id">
                            <Option :value="0">产品1</Option>
                            <Option :value="1">产品2</Option>
                        </Select>
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
                    type: 0,
                    count: 0,
                    union_id: 0
                }
            }
        },
        components: { SynModal },
        methods: {
            show (stock) {
                this.formData = stock;
                this.$nextTick(function () {
                    this.value = true;
                });
            },
            // 创建 & 编辑
            confirm () {
                this.$store.commit('product_setting_price_template_template_edit', {
                    group: this.group,
                    index: this.index,
                    data: {
                        stock: this.formData
                    }
                });
                this.value = false;
            }
        }
    };
</script>