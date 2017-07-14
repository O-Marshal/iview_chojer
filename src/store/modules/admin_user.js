import ajax from '../../libs/ajax';
import store from '../../libs/store';
import msg from 'iview/src/components/message';

export default {
    state: {
        params: {
            keywords: '',
            role_id: -1
        },
        datas: [],
        page: {
            total: 0,
            per_page: 0,
            current_page: 1
        },
        create: {
            accountPrefix: '',
            roles: []
        },
        permissions: []
    },
    getters: {
        account_user_datas: state => state.datas,
        account_user_page: state => state.page,
        account_user_create: state => state.create,
        account_user_permissions: state => state.permissions,
        account_user_params (state) {
            return {
                role_id: state.params.role_id, keywords: state.params.keywords, page: state.page.current_page
            };
        }
    },
    mutations: {
        account_user_init: store.tableInit,
        account_user_index: store.tableIndex,
        account_user_create: (state, data) => state.create = data,
        account_user_params (state, params) {
            state.params.keywords = params.keywords;
            state.params.role_id = params.role_id;
            state.page.current_page = params.page;
        },
        account_user_permission_index (state, result) {
            state.permissions = result;
        },
        account_user_permission_change (state, params) {
            state.permissions[params.row].sub[params.index].selected = params.selected;
        }
    },
    actions: {
        account_user_index (ctx , params) {
            ctx.commit('account_user_params', params);
            ajax.get('/account/user?keywords='+params.keywords+'&role_id='+params.role_id+'&page='+params.page).then(function (result) {
                ctx.commit('account_user_index', result);
            });
        },
        account_user_create (ctx) {
            ajax.get('/account/user/create').then(function (result) {
                ctx.commit('account_user_create', result.data);
            });
        },
        account_user_store (ctx , params) {
            return ajax.post('/account/user', params).then(function (data) {
                ctx.dispatch('account_user_index', ctx.getters.account_user_params);
                msg.success(data.errMsg, 3);
                return true;
            }).catch(function (err) {
                return err;
            });
        },
        account_user_update (ctx , params) {
            return ajax.put('/account/user/'+params.id, params.data).then(function (data) {
                msg.success(data.errMsg, 3);
                ctx.dispatch('account_user_index', ctx.getters.account_user_params);
                return true;
            }).catch(function (err) {
                return err;
            });
        },
        account_user_destory (ctx, ids) {
            return ajax.delete('/account/user/'+ids).then(function (result) {
                msg.success(result.errMsg);
                ctx.dispatch('account_user_index', ctx.getters.account_user_params);
                return true;
            });
        },
        // 权限查看
        account_user_permission_index (ctx, user_id) {
            ctx.commit('account_user_permission_index', []);
            ajax.get('/account/user/permission/'+user_id).then(function (result) {
                ctx.commit('account_user_permission_index', result.data);
            });
        },
        account_user_permission_update(ctx, user_id) {
            return ajax.put('/account/user/permission/'+user_id, {
                permissions: ctx.getters.account_user_permissions
            }).then(function (result) {
                msg.success(result.errMsg, 3);
                return true;
            }).catch(function (err) {
                return err;
            });
        }
    }
};