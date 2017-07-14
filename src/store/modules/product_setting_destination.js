import ajax from '../../libs/ajax';
import router from '../../router';
import store from '../../libs/store';
import msg from 'iview/src/components/message';

export default {
    state: {
        params: {
            keywords: ''
        },
        datas: [],
        page: {
            total: 0,
            per_page: 0,
            current_page: 1
        },
    },
    getters: {
        product_setting_destination_params: state => { return { keywords: state.params.keywords, page: state.page.current_page } },
        product_setting_destination_datas: state => state.datas,
        product_setting_destination_page: state => state.page,
    },
    mutations: {
        product_setting_destination_init: store.tableInit,
        product_setting_destination_index: store.tableIndex,
        product_setting_destination_params: (state, params) => state.params.keywords = params.keywords
    },
    actions: {
        product_setting_destination_index (ctx, params) {
            ctx.commit('product_setting_destination_init');
            ctx.commit('product_setting_destination_params', params);
            ajax.get('/product/setting/destination?keywords='+params.keywords+'&page='+params.page).then(function (result) {
                ctx.commit('product_setting_destination_index', result);
            });
        },
        product_setting_destination_store (ctx, data) {
            return ajax.post('/product/setting/destination', data).then(function (data) {
                msg.success(data.errMsg, 3);
                ctx.dispatch('product_setting_destination_index', ctx.getters.product_setting_destination_params);
                return true;
            }).catch(e => e);
        },
        product_setting_destination_update (ctx, data) {
            return ajax.put('/product/setting/destination/' + data.id, data).then(function (data) {
                msg.success(data.errMsg, 3);
                ctx.dispatch('product_setting_destination_index', ctx.getters.product_setting_destination_params);
                return true;
            }).catch(e => e);
        },
        product_setting_destination_destory (ctx, ids) {
            ajax.delete('/product/setting/destination/' + ids).then(function (result) {
                msg.success(result.errMsg);
                ctx.dispatch('product_setting_destination_index', ctx.getters.product_setting_destination_params);
            });
        }
    }
};