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
        <h3>新增航班</h3>
        <Form ref="userFrom" label-position="top">
            <Row :gutter="20">
                <i-col span="12">
                    <Form-item label="航班名称">
                        <i-input type="text" v-model="formData.code"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <Form-item label="航班号">
                        <i-input type="text" v-model="formData.code"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="8">
                    <Form-item label="航线类型">
                        <Select ref="sexSelect" v-model="formData.sex" clearable>
                            <Option :value="1">国际</Option>
                            <Option :value="2">国内</Option>
                            <Option :value="3">地区</Option>
                        </Select>
                    </Form-item>
                </i-col>
                <i-col span="8">
                    <Form-item label="出发地" prop="sex">
                        <i-input type="text" disabled v-model="formData.email"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="8">
                    <Form-item label="目的地" prop="email">
                        <i-input type="text" disabled v-model="formData.email"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="24">
                    <Form-item label="航班说明" prop="birthday">
                        <i-input type="textarea" :rows="5"  v-model="formData.email"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="24" style="text-align: center">
                    <Button type="primary" size="large" icon="android-add">创建</Button>
                </i-col>
                <i-col span="24" style="margin-top: 40px">
                    <Alert type="warning">此处仅录入产品基本信息, 产品详细信息请在创建后设置(暂未开通目的地关联)</Alert>
                </i-col>
            </Row>
        </Form>
    </div>
</template>

<script>

    import { deepCopy } from 'iview/src/utils/assist';
    let backFormData = {
        name: '',// 姓名
        sex: 0,// 性别
        avatar: null,
        role_id: 0,// 部门
        email: '',// 邮箱
        mobile: '',// 手机
        birthday: '',// 生日
        qq: '',
        wechat: '',
        address: '',
        account: '',
        password: ''
    };

    export default {
        data () {
            return {
                self: this,
                value: false,
                loading: false,
                index: -1,
                createData: {
                    accountPrefix: '',
                    roles: []
                },
                formData: deepCopy(backFormData)
            };
        },
        methods: {
            onTagEnter (val, a) {
                this.article.tags.push(val)
            },
            onTagClose (e, index) {
                this.article.tags.splice(index, 1);
            }
        },
        watch: {
            tabActive (val) {
                this.push = this.tabs[val];
            }
        }
    };
</script>