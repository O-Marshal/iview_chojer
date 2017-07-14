const routers = [
    {path: '/', redirect: '/index'},
    {path: '/index'},
    {path: '/auth/login'},

    {path: '/home/notice'},
    {path: '/home/notice_content'},
    {path: '/home/faq'},

    {path: '/account/index'},
    {path: '/account/store'},

    {path: '/account/role'},
    {path: '/account/user'},

    {path: '/cms/index'},
    {path: '/cms/push'},
    {path: '/cms/news'},
    {path: '/cms/notice'},
    {path: '/cms/faq'},

    {path: '/product/index'},
    {path: '/product/push'},
    {path: '/product/setting/destination'},
    {path: '/product/setting/price'},

    {path: '/product/tour/team'},
    {path: '/product/tour/self'},


    {path: '/setting/index'},
    {path: '/setting/account'},
    {path: '/setting/domain/cms'},
    {path: '/setting/domain/guest'},
    {path: '/setting/domain/admin'},


    // {path: '/customer/index'}

];

export default routers;