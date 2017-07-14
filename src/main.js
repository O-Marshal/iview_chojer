import Vue from 'vue';
import iView from 'iview';
import Config from './config';
import Urls from './config/urls';
import Router from './router';
import Store from './store';
import App from './app.vue';
import 'iview/dist/styles/iview.css';


Vue.use(iView);

// 初始化网站
Store.dispatch('website_init');

// 开启debug模式
Vue.config.debug = true;

Router.beforeEach((to, from, next) => {
    Store.commit('menu_default', to.path);
    if (!Config.withOutAuthRoutes.includes(to.path) && Store.getters.need_auth) {
        Store.commit('auth_action', to.path);
        return next('/auth/login');
    } else {
        Store.commit('menu_open_sub', to.path);
    }

    next();
});

Router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: Router,
    store: Store,
    render: h => h(App)
});

window.UEDITOR_CONFIG.serverUrl = Urls.API_URL + '/upload/ueditor';
window.UE.registerUI('v_picture', function(editor, uiName) {
    return new window.UE.ui.Button({
        name: uiName,
        title: '添加图片',
        cssRules: 'background-position: -726px -77px;',
        onclick: () => editor.fireEvent('v_on_picture', editor)
    });
}.bind(this));