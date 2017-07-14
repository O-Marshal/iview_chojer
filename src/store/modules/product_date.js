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
        show: [],
    },
    getters: {
        product_date_show: state => state.show
    },
    mutations: {
        product_date_show_init: state => state.show = [],
        product_date_show: (state, datas) => state.show = datas
    },
    actions: {
        // 团期详情
        product_date_show (ctx, date_id) {
            ctx.commit('product_date_show_init');
            return ajax.get('/product/date/' + date_id).then(function (result) {
                ctx.commit('product_date_show', result.data);
                return true;
            });
        },

        product_date_edit (ctx, params) {
            Promise.all([ctx.dispatch('product_setting_price_template_create', params.product_id), ctx.dispatch('product_date_show', params.date_id)])
                .then(function (result) {
                    ctx.commit('product_setting_price_template_edit', ctx.getters.product_date_show);
                });
        }
    }
};