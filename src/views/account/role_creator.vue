<style scoped>

</style>
<template>
    <SynModal v-model="value" title="创建部门" width="450" @on-confirm="confirm" :loading="loading">
        <Form ref="roleFrom" :model="data" :label-width="80">
            <Row>
                <i-col span="24">
                    <Form-item label="部门名称" prop="name">
                        <i-input type="text" v-model="data.name"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="24">
                    <Form-item label="部门编号" prop="code">
                        <i-input type="text" v-model="data.code"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="24">
                    <Form-item label="部门电话" prop="tel">
                        <i-input type="text" v-model="data.tel"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="24">
                    <Form-item label="备注信息" prop="description">
                        <i-input type="textarea" v-model="data.description" :rows="4"></i-input>
                    </Form-item>
                </i-col>
            </Row>
        </Form>
    </SynModal>
</template>
<script>
    import SynModal from '../../components/modal/syn.vue'
    import { deepCopy } from 'iview/src/utils/assist';

    export default {
        data () {
            return {
                value: false,
                loading: false,
                data: {
                    name: '',
                    code: '',
                    tel: '',
                    description: ''
                }
            };
        },
        components: { SynModal },
        methods: {
            show () {
                this.$refs['roleFrom'].resetFields();
                this.loading = false;
                this.value = true;
            },
            confirm () {
                this.loading = true;
                this.$store.dispatch('account_role_store', this.data).then(function (result) {
                    this.loading = false;
                    if (result === true) this.value = false;
                }.bind(this));
            }
        }
    };
</script>