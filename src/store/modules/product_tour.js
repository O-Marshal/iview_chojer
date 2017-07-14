import ajax from '../../libs/ajax';
import router from '../../router';
import store from '../../libs/store';
import msg from 'iview/src/components/message';

export default {
    state: {
        create: {
            type: [],
            destination: []
        },
        params: {
            keywords: '',
            destination: -1
        },
        datas: [],
        page: {
            total: 0,
            per_page: 0,
            current_page: 1
        },
        dates: []
    },
    getters: {
        product_tour_create: state => state.create,
        product_tour_datas: state => state.datas,
        product_tour_dates: state => state.dates,
        product_tour_page: state => state.page,
        product_tour_params (state) {
            return {
                destination: state.params.destination, keywords: state.params.keywords, page: state.page.current_page
            };
        }
    },
    mutations: {
        product_tour_create: (state, data) => state.create = data,
        product_tour_init: store.tableInit,
        product_tour_index: store.tableIndex,
        product_tour_params (state, params) {
            state.params.keywords = params.keywords;
            state.params.destination = params.destination;
        }
    },
    actions: {
        product_tour_index (ctx, params) {
            ajax.get('/product/tour?keywords='+params.keywords+'&destination='+params.destination+'&page='+params.page).then(function (result) {
                ctx.commit('product_tour_index', result);
            });
        },
        product_tour_create (ctx) {
            ajax.get('/product/tour/create').then(function (result) {
                ctx.commit('product_tour_create', result.data);
            });
        },
        product_tour_store (ctx, data) {
            ajax.post('/product/tour', data).then(function (data) {
                msg.success(data.errMsg, 3);
                return router.push(data.data);
            });
        },
        product_tour_show_with_key (ctx, params) {
            return ajax.get('/product/tour/'+params.id+'/edit?action=keyValue&key='+params.key).then(function (result) {
                return {
                    status: true,
                    data: result.data
                };
            }).catch(e => { return {status: false, data: e} });
        },
        product_tour_update (ctx, params) {
            return ajax.put('/product/tour/' + params.id, params).then(function (result) {
                msg.success(result.errMsg, 3);
                return true;
            }).catch(e => e);
        },
        product_tour_trip (ctx, id) {
            return ajax.get('/product/tour/'+id+'/edit?action=trip').then(function (result) {
                return {
                    status: true,
                    data: result.data
                };
            }).catch(e => { return {status: false, data: e} });
        }
    }
};