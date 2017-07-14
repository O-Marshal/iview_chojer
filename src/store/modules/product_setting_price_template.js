import ajax from '../../libs/ajax';
import msg from 'iview/src/components/message';
import { deepCopy } from 'iview/src/utils/assist';

export default {
    state: {
        _dates: [],
        _groups: [],
        datas: [],
        templates: []
    },
    getters: {
        product_setting_price_template_dates: state => state._dates,
        product_setting_price_template_groups: state => state._groups,
        product_setting_price_template_datas: state => state.datas,
        product_setting_price_template_templates: state => state.templates
    },
    mutations: {
        product_setting_price_template_init (state) {
            state._dates = [];
            state._groups = [];
            state.datas = [];
            state.templates = [];
        },
        product_setting_price_template_create (state, data) {
            state._dates = data.disable_dates;
            state._groups = data.groups;
        },
        product_setting_price_template_edit (state, datas) { // 根据已有数据更新
            datas.forEach(function (data) {
                state.datas.push(data);
                state.templates.push(deepCopy(data.templates));
            });
        },
        product_setting_price_template_group_add (state, data) {
            state.datas.push(data);
            state.templates.push(deepCopy(data.temps));
        },
        product_setting_price_template_group_delete (state, index) {
            state.datas.splice(index, 1);
            state.templates.splice(index, 1);
        },
        product_setting_price_template_group_stock (state, params) {
            state.datas[params.index].stock = params.data;
        },
        product_setting_price_template_template_add (state, params) {
            state.templates[params.group].push(params.data);
        },
        product_setting_price_template_template_edit (state, params) {
            for (let key in params.data) {
                state.templates[params.group][params.index][key] = params.data[key];
            }
        },
        product_setting_price_template_template_dilete (state, params) {
            state.templates[params.group].splice(params.index, 1);
        }
    },
    actions: {
        product_setting_price_template_create (ctx, product_id) {
            ctx.commit('product_setting_price_template_init');
            return ajax.get('/product/setting/temp/price/team/' + product_id).then(function (result) {
                ctx.commit('product_setting_price_template_create', result.data);
                return true;
            });
        },
        product_setting_price_template_store (ctx, data) {
            return ajax.post('/product/setting/price_temp', data).then(function (data) {
                msg.success(data.errMsg, 3);
                return true;
            }).catch(e => e);
        },
        product_setting_price_template_update (ctx, data) {
            return ajax.put('/product/setting/price_temp/' + data.id, data).then(function (data) {
                msg.success(data.errMsg, 3);
                return true;
            }).catch(e => e);
        },
        product_setting_price_template_destory (ctx, id) {
            return ajax.delete('/product/setting/price_temp/' + id,).then(function (data) {
                msg.success(data.errMsg, 3);
                return true;
            }).catch(e => e);
        }
    }
};