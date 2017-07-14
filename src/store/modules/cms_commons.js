import router from '../../router';
import ajax from '../../libs/ajax';
import msg from 'iview/src/components/message';

export default {
    state: {
        type: '',
        keywords: '',
        datas: [],
        page: {
            total: 0,
            per_page: 0,
            current_page: 1
        }
    },
    getters: {
        cms_common_type: state => state.type,
        cms_common_keywords: state => state.keywords,
        cms_common_current_page: state => state.page.current_page,
        cms_common_datas: state => state.datas,
        cms_common_page: state => state.page,
    },
    mutations: {
        cms_common_type (state, type) {
            state.type = type;
        },
        cms_common_keywords (state, keywords) {
            state.keywords = keywords;
        },
        cms_common_init (state) {
            state.datas = [];
            state.page = {
                total: 0,
                per_page: 0,
                current_page: 1
            };
        },
        cms_common_index (state, result) {
            state.page = result.page;
            state.datas = result.datas;
        }
    },
    actions: {
        cms_common_index (ctx, params) {
            ctx.commit('cms_common_init');
            ctx.commit('cms_common_type', params.type);
            ctx.commit('cms_common_keywords', params.keywords);
            ajax.get('/cms/'+ params.type +'?keywords='+ params.keywords +'page='+params.page).then(function (result) {
                ctx.commit('cms_common_index', result);
            });
        },
        cms_common_store (ctx, data) {
            return ajax.post('/cms/push', data).then(function (data) {
                msg.success(data.errMsg, 3);
                router.push(data.data);
                return true;
            }).catch(function (err) {
                return err;
            });
        },
        cms_common_destory (ctx, ids) {
            const type = ctx.getters.cms_common_type;
            ajax.delete('/cms/' + type + '/' + ids).then(function (result) {
                msg.success(result.errMsg);
                ctx.dispatch('cms_common_index', {
                    type: type,
                    keywords: ctx.getters.cms_common_keywords,
                    page: ctx.getters.cms_common_current_page
                });
            });
        }
    }
};