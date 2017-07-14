export default {
    state: {
        active: {
            default: '/home',
            top: '_1',
            sub: '/index'
        },
        top: {},
        map: {},
        uri_tops: {},
        uris: {}
    },
    getters: {
        menu_top: state => state.top,
        menu_active_top: state => state.active.top,
        menu_sub: state => state.map[state.active.top],
        menu_active_sub: state => state.active.sub,
        menu_default: state => state.active.default,
        menu_crumb (state) {
            const sub = state.top[state.active.top ? state.active.top : '_1'];
            if (sub.uri === state.active.sub) {
                return [
                    {uri: '/', label: '首页'},
                    {uri: sub.uri, label: sub.title},
                ]
            }
            const third = state.uris[state.active.sub];
            return [
                {uri: '/', label: '首页'},
                {uri: sub.uri, label: sub.title},
                {uri: third.uri, label: third.title}
            ];
        }
    },
    mutations: {
        menu_initial (state, data) {
            state.top = data.top;
            state.map = data.map;
            state.uri_tops = data.uri_tops;
            state.uris = data.uris;
        },
        menu_default (state, path) {
            state.active.default = path;
        },
        menu_open_sub (state, path) {
            state.active.sub = path;
            let top_path = state.uri_tops[path];
            if (!top_path) top_path = state.uri_tops['/' + path.split('/')[1] + '/index'];

            if (top_path) return state.active.top = '_' + top_path.id;
            return state.active.top = '_1';
        }
    }
};