import ajax from '../../libs/ajax';

export default {
    state: {
        post: null,
        datas: [],
        page: {
            total: 0,
            per_page: 0,
            current_page: 1
        },
        count: {
            news: 0,
            notice: 0,
            faq: 0
        }
    },
    getters: {
        cms_post: state => state.post,
        cms_index_page: state => state.page,
        cms_index_datas: state => state.datas,
        cms_index_count: state => state.count,
        cms_index_sum: state => state.count.news + state.count.notice + state.count.faq
    },
    mutations: {
        cms_post (state, post) {
            state.post = post;
        },
        cms_index_notice (state, result) {
            state.page = result.page;
            state.datas = result.datas;
        },
        cms_index_count (state, result) {
            state.count.news = parseInt(result.data.news ? result.data.news : 0);
            state.count.notice = parseInt(result.data.notice ? result.data.notice : 0);
            state.count.faq = parseInt(result.data.faq ? result.data.faq : 0);
        }
    },
    actions: {
        cms_index_count (ctx) {
            ajax.get('/cms/index').then(function (result) {
                ctx.commit('cms_index_count', result);
            });
        },
        cms_index_notice (ctx, page = 1) {
            ajax.get('/cms/notice?page='+page).then(function (result) {
                ctx.commit('cms_index_notice', result);
            });
        }
    }
};