<style scoped>
    .box-wrap {
        border: 1px solid #eee;
        border-radius: 6px;
        position: relative;
        transition: all 1s ease-in-out;
        min-height: 50px;
        padding: 20px 40px;
        max-width: 700px;
        margin: 20px auto;
    }
    .box-wrap h3 {
        text-align: center;
        font-size: 24px;
        margin: 20px;
    }
</style>
<template>
    <div class="box-wrap">
        <h3>发布线路</h3>
        <Form label-position="top">
            <Row :gutter="20">
                <i-col span="12">
                    <Form-item label="线路名称" >
                        <i-input type="text" v-model="formData.name"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <Form-item label="线路编号">
                        <i-input type="text" v-model="formData.code"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="8">
                    <Form-item label="线路类型">
                        <Select v-model="formData.type">
                            <template v-for="item in createData.type">
                                <Option :value="item.id">{{item.name}}</Option>
                            </template>
                        </Select>
                    </Form-item>
                </i-col>
                <i-col span="8">
                    <Form-item label="目的地">
                        <Select v-model="formData.destination">
                            <template v-for="item in createData.destination">
                                <Option :value="item.id">{{item.name}}</Option>
                            </template>
                        </Select>
                    </Form-item>
                </i-col>
                <i-col span="8">
                    <Form-item label="清位时间">
                        <i-input v-model="formData.clear" type="text" placeholder="单位（小时）支持小数"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="24">
                    <Form-item label="线路说明">
                        <i-input v-model="formData.description" type="textarea" placeholder="仅后台管理人员可见" :rows="5"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="24" style="text-align: center">
                    <Button type="primary" size="large" icon="android-add" @click="create" :loading="loading">创建</Button>
                </i-col>
                <i-col span="24" style="margin-top: 40px">
                    <Alert type="warning">此处仅录入产品基本信息, 产品详细信息请在创建后设置</Alert>
                </i-col>
            </Row>
        </Form>
    </div>
</template>

<script>

    import { mapGetters } from 'vuex';

    export default {
        data () {
            return {
                loading: false,
                formData: {
                    name: '',
                    code: '',
                    type: '',
                    destination: '',
                    clear: '',
                    description: ''
                }
            };
        },
        computed: {
            ...mapGetters({
                createData: 'product_tour_create'
            })
        },
        methods: {
            create () {
                this.loading = true;
                this.$store.dispatch('product_tour_store', this.formData);
            }
        },
        mounted () {
            this.$store.dispatch('product_tour_create');
        }
    };
</script>