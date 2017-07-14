/**
 * Vuex
 * http://vuex.vuejs.org/zh-cn/intro.html
 */
import Vue from 'vue';
import Vuex from 'vuex';

import AdminAuth from './modules/admin_auth';
import AdminMenu from './modules/admin_menu';
import AdminRole from './modules/admin_role';
import AdminUser from './modules/admin_user';

import CmsIndex from './modules/cms_index';
import CmsCommons from './modules/cms_commons';

import ProductSettingDestination from './modules/product_setting_destination';
import ProductSettingPrice from './modules/product_setting_price';
import ProductSettingPriceTemplate from './modules/product_setting_price_template';
import ProductDate from './modules/product_date';
import ProductTour from './modules/product_tour';

import Website from './modules/website';


Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        AdminAuth,
        AdminMenu,
        AdminRole,
        AdminUser,


        CmsIndex,
        CmsCommons,

        ProductSettingDestination,
        ProductSettingPrice,
        ProductSettingPriceTemplate,
        ProductDate,
        ProductTour,



        Website
    }
});

export default store;