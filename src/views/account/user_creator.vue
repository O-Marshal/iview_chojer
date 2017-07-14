<template>
    <SynModal v-model="value" title="创建用户" width="600" :loading="loading" @on-confirm="confirm">
        <Form ref="userFrom" :model="formData" :label-width="80">
            <Row>
                <i-col span="18">
                    <i-col span="12">
                        <Form-item label="姓名" prop="name">
                            <i-input type="text" v-model="formData.name"></i-input>
                        </Form-item>
                    </i-col>
                    <i-col span="12">
                        <Form-item label="部门" prop="role_id">
                            <Select ref="roleSelect" v-model="formData.role_id" clearable>
                                <template v-for="item in createData.roles">
                                    <Option :value="item.id" :label="item.name">{{item.name}} <small style="margin-left: 5px; font-size: 80%; color: #ccc">{{item.code}}</small></Option>
                                </template>
                            </Select>
                        </Form-item>
                    </i-col>
                    <i-col span="12">
                        <Form-item label="手机" prop="mobile">
                            <i-input type="text"  v-model="formData.mobile"></i-input>
                        </Form-item>
                    </i-col>
                    <i-col span="12">
                        <Form-item label="邮箱" prop="email">
                            <i-input type="text"  v-model="formData.email"></i-input>
                        </Form-item>
                    </i-col>
                    <i-col span="12">
                        <Form-item label="性别" prop="sex">
                            <Select ref="sexSelect" v-model="formData.sex" clearable>
                                <Option :value="0">男</Option>
                                <Option :value="1">女</Option>
                            </Select>
                        </Form-item>
                    </i-col>
                    <i-col span="12">
                        <Form-item label="生日" prop="birthday">
                            <Date-picker v-model="formData.birthday" type="date" placeholder="选择日期"></Date-picker>
                        </Form-item>
                    </i-col>
                </i-col>
                <i-col span="6">
                    <UploadHeader v-model="formData.avatar"></UploadHeader>
                </i-col>
                <i-col span="24">
                    <LineHeader label="其它信息" :styles="{'text-align': 'center', 'margin-top': '5px', 'margin-left': '30px'}"></LineHeader>
                </i-col>
                <i-col span="12">
                    <Form-item label="qq"  prop="qq">
                        <i-input type="text"  v-model="formData.qq"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <Form-item label="微信" prop="wechat">
                        <i-input type="text"  v-model="formData.wechat"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="24">
                    <Form-item label="家庭住址" prop="address">
                        <i-input type="text"  v-model="formData.address"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="24">
                    <LineHeader label="账号信息" :styles="{'text-align': 'center', 'margin-top': '5px', 'margin-left': '30px'}"></LineHeader>
                </i-col>
                <i-col span="12">
                    <Form-item label="账号" prop="account">
                        <i-input type="text"  v-model="formData.account">
                            <span slot="prepend">{{createData.accountPrefix}}@</span>
                        </i-input>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <Form-item label="密码" prop="password">
                        <i-input type="password"  v-model="formData.password"></i-input>
                    </Form-item>
                </i-col>
            </Row>
        </Form>
    </SynModal>
</template>
<script>
    import SynModal from '../../components/modal/syn.vue'
    import LineHeader from '../../components/unit/line_header.vue'
    import UploadHeader from '../../components/upload/header.vue'

    import { mapGetters } from 'vuex';

    export default {
        data () {
            return {
                value: false,
                loading: false,
                formData: {
                    name: '',// 姓名
                    sex: 0,// 性别
                    avatar: '',
                    role_id: 0,// 部门
                    email: '',// 邮箱
                    mobile: '',// 手机
                    birthday: '',// 生日
                    qq: '',
                    wechat: '',
                    address: '',
                    account: '',
                    password: ''
                }
            }
        },
        components: { SynModal, UploadHeader, LineHeader },
        computed: {
            ...mapGetters({
                createData: 'account_user_create'
            })
        },
        methods: {
            show () {
                this.value = true;
            },
            confirm () {
                this.loading = true;
                this.$store.dispatch('account_user_store', this.formData).then(function (result) {
                    this.loading = false;
                    if (result === true) {
                        this.$refs['userFrom'].resetFields();
                        this.$refs['roleSelect'].clearSingleSelect();
                        this.$refs['sexSelect'].clearSingleSelect();
                        this.formData = {
                            name: '',// 姓名
                            sex: 0,// 性别
                            avatar: '',
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
                        this.value = false;
                    }
                }.bind(this));
            }
        }
    };
</script>