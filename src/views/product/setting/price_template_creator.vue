<style scoped>
</style>
<template>
    <SynModal v-model="value" title="价格模板" width="500" :loading="loading" @on-confirm="confirm">
        <Form ref="destFrom" label-position="top" style="padding: 0 30px">
            <Row :gutter="20">
                <i-col span="24">
                    <Form-item label="模板名称">
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
            index: Number,
            group: {}
        },
        data () {
            return {
                value: false,
                loading: false,
                formData: {
                    name: "",
                    unit: "",
                    is_stock: 1,
                    description: ""
                }
            }
        },
        components: { SynModal },
        methods: {
            show () {
                this.formData.name = '';
                this.formData.unit = '';
                this.formData.is_stock = 1;
                this.formData.description = '';
                this.$nextTick(function () {
                    this.value = true;
                });
            },
            // 创建 & 编辑
            confirm () {
                const data = deepCopy(this.formData);
                data.group_id = this.group.id;
                this.$store.dispatch('product_setting_price_template_store', data).then(function (result) {
                   this.loading = false;
                   if (result == true) {
                       this.value = false;
                       this.$store.dispatch('product_setting_price_show', {
                           index: this.index,
                           id: this.group.id
                       });
                   }
                }.bind(this));
            }
        }
    };
</script>