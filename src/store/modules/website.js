import json from '../../libs/json';

export default {
    state: {
        logo_home: '',
        logo_console: '',

        home_ads: [], // 首页轮播广告

        copy_right: '',
        icp: ''
    },
    getters: {
        website_logo_home: state => state.logo_home,
        website_logo_console: state => state.logo_console,
        website_home_ads: state => state.home_ads,
        website_copy_right: state => state.copy_right,
        website_icp: state => state.icp
    },
    mutations: {
        website_init (state, data) {
            state.logo_home = data.logo_home;
            state.logo_console = data.logo_console;
            state.home_ads = data.home_ads;
            state.copy_right = data.site_copy_right;
            state.icp = data.site_icp;
        }
    },
    actions: {
        website_init (ctx) {
            json.get('/website.json').then(function (data) {
                ctx.commit('website_init', data);
                return true;
            }).catch (e => e);
        }
    }
};