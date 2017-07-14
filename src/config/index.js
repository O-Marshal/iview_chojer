import Routes from './routes';

let config = {
    env: 'development',

    routes: Routes,

    withOutAuthRoutes: [
        '/auth/login',
        '/home/notice',
        '/home/notice_content',
        '/home/faq',
    ]
};

export default config;