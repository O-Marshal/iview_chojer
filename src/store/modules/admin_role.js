import ajax from '../../libs/ajax';
import msg from 'iview/src/components/message';

export default {
    state: {
        keywords: '',
        datas: [],
        page: {
            total: 0,
            per_page: 0,
            current_page: 1
        },
        permissions: []
    },
    getters: {
        account_role_datas: state => state.datas,
        account_role_page: state => state.page,
        account_role_keywords: state => state.keywords,
        account_role_permissions: state => state.permissions
    },
    mutations: {
        account_role_init (state) {
            state.datas = [];
            state.page = {
                total: 0,
                per_page: 0,
                current_page: 1
            };
        },
        account_role_keywords (state, keywords) {
            state.keywords = keywords;
        },
        account_role_index (state, result) {
            state.page = result.page;
            state.datas = result.datas;
        },
        account_role_update (state, params) {
            const index = params.index;
            for (let key in params.data) {
                state.datas[index][key] = params.data[key];
            }
        },
        account_role_permission_index (state, result) {
            state.permissions = result;
        },
        account_role_permission_change (state, params) {
            state.permissions[params.row].sub[params.index].selected = params.selected;
        }
    },
    actions: {
        account_role_index (ctx , params) {
            ctx.commit('account_role_keywords', params.keywords);
            ajax.get('/account/role?keywords='+params.keywords+'&page='+params.page).then(function (result) {
                ctx.commit('account_role_index', result);
            });
        },
        account_role_store (ctx , params) {
            return ajax.post('/account/role', params).then(function (data) {
                msg.success(data.errMsg, 3);
                ctx.dispatch('account_role_index', {
                    keywords: ctx.getters.account_role_keywords,
                    page: ctx.getters.account_role_page.current_page
                });
                return true;
            }).catch(function (err) {
                return err;
            });
        },
        account_role_update (ctx , params) {
            return ajax.put('/account/role/'+params.id, params.data).then(function (data) {
                msg.success(data.errMsg, 3);
                ctx.commit('account_role_update', params);
                return true;
            }).catch(function (err) {
                return err;
            });
        },
        account_role_destory (ctx, ids) {
            return ajax.delete('/account/role/'+ids).then(function (result) {
                msg.success(result.errMsg);
                ctx.dispatch('account_role_index', {
                    keywords: ctx.getters.account_role_keywords,
                    page: ctx.getters.account_role_page.current_page
                });
                return true;
            });
        },
        // 权限查看
        account_role_permission_index (ctx, role_id) {
            ctx.commit('account_role_permission_index', []);
            ajax.get('/account/role/permission/'+role_id).then(function (result) {
                ctx.commit('account_role_permission_index', result.data);
            });
        },
        account_role_permission_update(ctx, role_id) {
            return ajax.put('/account/role/permission/'+role_id, {
                permissions: ctx.getters.account_role_permissions
            }).then(function (result) {
                msg.success(result.errMsg, 3);
                return true;
            }).catch(function (err) {
                return err;
            });
        }
    }
};