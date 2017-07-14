<style scoped>

</style>
<template>
    <Layout>
        <h3 style="text-align: center;margin-bottom: 40px">快捷功能</h3>
        <Row :gutter="40">
            <i-col span="6">
                <Card style="text-align: center;">
                    <Icon type="home" style="font-size: 3em"></Icon>
                    <p style="margin-top: 10px">首页</p>
                </Card>
            </i-col>
            <i-col span="6">
                <Card style="text-align: center;">
                    <Icon type="ios-keypad" style="font-size: 3em"></Icon>
                    <p style="margin-top: 10px">产品管理</p>
                </Card>
            </i-col>
            <i-col span="6">
                <Card style="text-align: center;">
                    <Icon type="ios-analytics" style="font-size: 3em"></Icon>
                    <p style="margin-top: 10px">订单管理</p>
                </Card>
            </i-col>
        </Row>
        <h3 style="text-align: center;margin: 40px">其它功能</h3>
        <Row :gutter="40">
            <i-col span="6">
                <Card style="text-align: center;" draggable='true'>
                    <Icon type="home" style="font-size: 3em"></Icon>
                    <p style="margin-top: 10px">首页</p>
                </Card>
            </i-col>
            <i-col span="6">
                <Card style="text-align: center;">
                    <Icon type="ios-keypad" style="font-size: 3em"></Icon>
                    <p style="margin-top: 10px">产品管理</p>
                </Card>
            </i-col>
            <i-col span="6">
                <Card style="text-align: center;">
                    <Icon type="ios-analytics" style="font-size: 3em"></Icon>
                    <p style="margin-top: 10px">订单管理</p>
                </Card>
            </i-col>
            <i-col span="6">
                <Card style="text-align: center;">
                    <Icon type="home" style="font-size: 3em"></Icon>
                    <p style="margin-top: 10px">首页</p>
                </Card>
            </i-col>
        </Row>
        <Row :gutter="40" style="margin-top: 40px">
            <i-col span="6">
                <Card style="text-align: center;">
                    <Icon type="ios-keypad" style="font-size: 3em"></Icon>
                    <p style="margin-top: 10px">产品管理</p>
                </Card>
            </i-col>
            <i-col span="6">
                <Card style="text-align: center;">
                    <Icon type="ios-analytics" style="font-size: 3em"></Icon>
                    <p style="margin-top: 10px">订单管理</p>
                </Card>
            </i-col>
        </Row>
    </Layout>
</template>
<script>
    import Layout from '../components/layout/console.vue'

    export default {
        data () {
            return {

            };
        },
        components: { Layout }

    };
</script>