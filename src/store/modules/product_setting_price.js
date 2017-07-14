import ajax from '../../libs/ajax';
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
        create: {
            product: [],
            customer: []
        },
        show: []
    },
    getters: {
        product_setting_price_params: state => { return { keywords: state.params.keywords, page: state.page.current_page } },
        product_setting_price_datas: state => state.datas,
        product_setting_price_page: state => state.page,
        product_setting_price_create: state => state.create,
        product_setting_price_show: state => state.show,
    },
    mutations: {
        product_setting_price_init: store.tableInit,
        product_setting_price_index (state, result) {
            state.page = result.page;
            state.datas = result.datas;
            state.show = result.datas.map(() => []);
        },
        product_setting_price_params: (state, params) => state.params.keywords = params.keywords,
        product_setting_price_create:  (state, data) => state.create = data,
        product_setting_price_show:  (state, params) => state.show.splice(params.index, 1, params.data),
    },
    actions: {
        product_setting_price_index (ctx, params) {
            ctx.commit('product_setting_price_init');
            ctx.commit('product_setting_price_params', params);
            ajax.get('/product/setting/price?keywords='+params.keywords+'&page='+params.page).then(function (result) {
                ctx.commit('product_setting_price_index', result);
            });
        },
        product_setting_price_create (ctx) {
            ajax.get('/product/setting/price/create').then(function (result) {
                ctx.commit('product_setting_price_create', result.data);
            });
        },
        product_setting_price_show (ctx, params) {
            ajax.get('/product/setting/price/' + params.id).then(function (result) {
                ctx.commit('product_setting_price_show', {
                    index: params.index,
                    data: result.data
                });
            });
        },
        product_setting_price_store (ctx, data) {
            return ajax.post('/product/setting/price', data).then(function (data) {
                msg.success(data.errMsg, 3);
                ctx.dispatch('product_setting_price_index', ctx.getters.product_setting_price_params);
                return true;
            }).catch(e => e);
        },
        product_setting_price_update (ctx, data) {
            return ajax.put('/product/setting/price/' + data.id, data).then(function (data) {
                msg.success(data.errMsg, 3);
                ctx.dispatch('product_setting_price_index', ctx.getters.product_setting_price_params);
                return true;
            }).catch(e => e);
        },
        product_setting_price_destory (ctx, ids) {
            ajax.delete('/product/setting/price/' + ids).then(function (result) {
                msg.success(result.errMsg);
                ctx.dispatch('product_setting_price_index', ctx.getters.product_setting_price_params);
            });
        }
    }
};