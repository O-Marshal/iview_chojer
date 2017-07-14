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
        <Form ref="userFrom" :model="formData" label-position="top">
            <Row :gutter="20">
                <i-col span="12">
                    <Form-item label="线路名称" prop="name">
                        <i-input type="text" v-model="formData.name"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <Form-item label="线路编号" prop="role_id">
                        <i-input type="text" v-model="formData.name"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="8">
                    <Form-item label="线路类型" prop="sex">
                        <Select ref="sexSelect" v-model="formData.sex" clearable>
                            <Option :value="0">跟团游</Option>
                            <Option :value="1">自由行</Option>
                            <Option :value="2">自驾游</Option>
                        </Select>
                    </Form-item>
                </i-col>
                <i-col span="8">
                    <Form-item label="目的地" prop="email">
                        <i-input type="text"  v-model="formData.email"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="8">
                    <Form-item label="操作人员" prop="mobile">
                        <i-input type="text"  v-model="formData.mobile"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="24">
                    <Form-item label="线路说明" prop="birthday">
                        <i-input type="textarea" :rows="5"  v-model="formData.email"></i-input>
                    </Form-item>
                </i-col>
                <i-col span="24" style="text-align: center">
                    <Button type="primary" size="large" icon="android-add">创建</Button>
                </i-col>
                <i-col span="24" style="margin-top: 40px">
                    <Alert type="warning">此处仅录入产品基本信息, 产品详细信息请在创建后设置</Alert>
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
                formData: deepCopy(backFormData),
                data: [{
                    value: 'beijing',
                    label: '北京',
                    children: [
                        {
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                }, {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [
                        {
                            value: 'nanjing',
                            label: '南京',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                            ]
                        },
                        {
                            value: 'suzhou',
                            label: '苏州',
                            children: [
                                {
                                    value: 'zhuozhengyuan',
                                    label: '拙政园',
                                },
                                {
                                    value: 'shizilin',
                                    label: '狮子林',
                                }
                            ]
                        }
                    ],
                }],
                tabActive: 'article',
                tabs: {
                    'article': {
                        buttonLabel: '发布到文章'
                    },
                    'log': {
                        buttonLabel: '发布到日志'
                    },
                    'doc': {
                        buttonLabel: '发布到文档'
                    },
                },
                push: {
                    buttonLabel: '发布到文章'
                },
                article: {
                    tags: ['标签0', '标签1', '标签2']
                }
            };
        },
        methods: {
            onTagEnter (val, a) {
                console.log(val.value);
                console.log(a);
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