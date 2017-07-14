<style scoped>
    .form-wrap {
        position: absolute;
        padding: 15px 40px;
        width: 350px;
        height: 330px;
        font-size: 24px;
        top: 50%;
        margin-top: -175px;
        right: 80px;
        background-color: rgba(255, 255, 255, 0.9);
        z-index: 1;
    }
    .form-wrap h3 {
        margin-bottom: 20px;
        font-size: 24px;
        color: #464c5b;
    }
    .form-wrap input {
        display: block;
        width: 50%;
        height: 42px;
        border: none;
        border-bottom: 1px solid #ccc;
        padding-left: 45px;
        padding-right: 15px;
        background-color: rgba(255, 255, 255, 0);
        box-shadow: none;
        outline: none;
        font-size: 16px;
        color: #657180;
    }
    .form-wrap .form-group {
        position: relative;
        margin-bottom: 20px;
    }
    .form-wrap .form-group .ivu-icon {
        position: absolute;
        width: 32px;
        height: 32px;
        line-height: 32px;
        font-size: 24px;
        left: 5px;
        bottom: 3px;
        text-align: center;
    }
    .form-wrap .form-group input {
        width: 100%;
    }
    .form-wrap .form-identify {
        position: relative;
        margin-top: 10px;
        margin-bottom: 10px;
        height: 42px;
    }
    .form-wrap .form-identify input {
        width: 45%;
        padding: 0 10px;
        float: left;
    }
    .form-wrap .form-identify img {
        margin-left: 3%;
        height: 42px;
        width: 49%;
        float: left;
    }
    .form-wrap .form-identify:after {
        clear: both;
    }
    .form-wrap .form-tag {
        height: 32px;
        width: 100%;
        margin-bottom: 5px;
    }
    .form-wrap .form-tag a {
        font-size: 14px;
        color: #888;
    }
    .form-wrap .form-tag a:first-child {
        float: left;
    }
    .form-wrap .form-tag a:last-child {
        float: right;
    }
    .form-wrap .form-tag:after {
        clear: both;
    }
    .form-wrap button {
        margin-top: 20px;
        display: block;
        width: 100%;
        height: 48px;
        line-height: 48px;
        border: none;
        background-color: #888;
        box-shadow: none;
        outline: none;
        font-size: 18px;
        color: #fff;
    }
</style>
<template>
    <div class="form-wrap">
        <h3>商户登录</h3>
        <div class="form-group">
            <Icon type="person"></Icon>
            <input type="text" v-model="name" placeholder="登录账号">
        </div>
        <div class="form-group">
            <Icon type="locked"></Icon>
            <input type="password" v-model="psd" placeholder="密码">
        </div>
        <!--<div class="form-identify">-->
            <!--<input type="text" v-model="valicode" placeholder="验证码">-->
            <!--<img src="http://captcha.qq.com/getimage?aid=755049101&rd=0.715220654480232">-->
        <!--</div>-->
        <div class="form-tag">
            <a @click.stop="regist">账号注册</a>
            <a @click.stop="repassword">重置密码</a>
        </div>
        <button @click="login">登录</button>
        <Spin size="large" fix v-if="loading"></Spin>
    </div>
</template>
<script>

    import Contact from '../../config/contact';

    export default {
        data () {
            return {
                loading: true,
                name: '',
                psd: '',
                valicode: ''
            };
        },
        methods: {
            login () {
                this.loading = true;
                this.$store.dispatch('auth_login', {
                    'name': this.name,
                    'password': this.psd
                }).then(function () {
                    this.loading = false;
                }.bind(this));
            },
            regist () {
                this.$Modal.warning({
                    title: '暂不支持开放注册',
                    content: `本系统目前只支持邀约入住，如果您想尽快体验我们的系统功能，请致电：<a href="tel:${Contact.tel}">${Contact.tel}</a>；并将公司资料、资质等信息发送到邮箱：<a href="mailto:${Contact.email}">${Contact.email}</a>（<a href="${Contact.regist_file}">申请材料副本</a>）`
                });
            },
            repassword () {
                this.$Modal.warning({
                    title: '本功能仅支持商户账号',
                    content: `请致电：<a href="tel:${Contact.tel}">${Contact.tel}</a>；联系客服人员验证基本注册资料，为您重设账号密码。（普通子账号请在管理后台自行重置）`
                });
            }
        },
        mounted () {
            const token = localStorage.getItem('auth_token');
            if (token && token.length > 30) {
                setTimeout(function () {
                    this.$store.dispatch('auth_check').then(function () {
                        this.loading = false;
                    }.bind(this));
                }.bind(this), 500);
            } else {
                this.loading = false;
            }
        }
    };
</script>