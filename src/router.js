import Vue from 'vue'
import VueRouter from 'vue-router'
import Routers from './config/routes'

Vue.use(VueRouter);

const setComponent = function (Routers) {
    Routers.forEach(function (item) {
        // 不用设置 component - 自动引用
        if (!(item.redirect || item.component)) {
            item.component = require('./views'+item.path+'.vue');
        }
        // 自动引用子路由
        if (item.children) setComponent(item.children)
    });
};

setComponent(Routers);

export default new VueRouter({
    mode: 'history',
    routes: Routers
});