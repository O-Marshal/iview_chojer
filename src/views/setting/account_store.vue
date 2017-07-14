<style scoped>
    .account-wrap {
        padding: 40px;
        font-size: 14px;
    }
    .account-wrap p {
        color: #888;
    }
    .account-wrap .account-header {
        display: block;
        margin-right: 40px;
        width: 80px;
        height: 80px;
        background-color: rgba(0,0,0,0.2);
        transition: .3s all;
    }
    .account-wrap .account-info {
        margin-top: 20px;
    }

    .account-wrap .account-info li {
        color: #888;
        margin-bottom: 5px;
    }
    .account-wrap .account-info li span {
        cursor: pointer;
        color: #444;
    }



</style>
<template>
    <div class="account-wrap">
        <div class="account-header"></div>
        <ul class="account-info">
            <li>账号名称：<span>开心假期</span></li>
            <li>绑定手机：<span>1321898912</span></li>
            <li>绑定邮箱：<span>asdm@dmkc.com</span></li>
            <li>所在地址：<span>四川省·成都市·锦江区·人民南路68号</span></li>
        </ul>
    </div>
</template>
<script>

    export default {
        data () {
            return {
                columns: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    }
                ],
                data: [
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居'
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道'
                    }
                ]
            };
        }

    };

</script>