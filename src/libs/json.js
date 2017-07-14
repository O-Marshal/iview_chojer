import Axios from 'axios';
import msg from 'iview/src/components/message';
import URLS from '../config/urls';

const instance = Axios.create({
    baseURL: URLS.JSON_URL,
    timeout: 1000
});

instance.interceptors.response.use(function (response) {
    if (response.status == 200) return response.data;
    msg.error('服务器响应失败', 3);
    return Promise.reject(response);
}, function (error) {
    msg.error('服务器响应失败', 3);
    return Promise.reject(error);
});

export default instance;