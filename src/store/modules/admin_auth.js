import ajax from '../../libs/ajax';
import router from '../../router';
import msg from 'iview/src/components/message';

export default {
    state: {
        token: null,
        info: null,
        org: null,
        action: '/index'
    },
    getters: {
        need_auth: state => {
            return state.token === null;
        },
        auth_action: state => {
            return state.action;
        },
        auth_info: state => state.info,
        auth_org: state => state.org
    },
    mutations: {
        auth_login (state, data) {
            state.token = data.auth_token;
            state.info = data.user_info;
            state.org = data.org_info;
            localStorage.auth_token = data.auth_token;
        },
        auth_logout (state) {
            localStorage.removeItem('auth_token');
            state.token = null;
            state.info = null;
            state.org = null;
        },
        auth_action: (state, action) => {
            state.action = action;
        }
    },
    actions: {
        auth_login (ctx, params) {
            return ajax.post('/auth/login',params).then(function (data) {
                msg.success(data.errMsg, 3);
                ctx.commit('auth_login', data.data);
                ctx.commit('menu_initial', data.data.menu);
                router.push(ctx.getters.auth_action);
                return true;
            }).catch(function (err) {
                return err;
            });
        },
        auth_check (ctx) {
            ajax.get('/auth/login').then(function (data) {
                msg.success(data.errMsg, 3);
                ctx.commit('auth_login', data.data);
                ctx.commit('menu_initial', data.data.menu);
                router.push(ctx.getters.auth_action);
                return true;
            }).catch(function (err) {
                return err;
            });
        }
    }
};