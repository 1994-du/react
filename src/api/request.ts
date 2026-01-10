import Axios from 'axios'
import { message } from 'antd';
import { navigateToLogin } from '@/utils/navigation';
const instance = Axios.create({
    timeout: 1000,
});
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if(error.status===500){
        message.error('服务器错误');
    }
    if(error.status===400||error.status===403){
        message.error(error.message);
        sessionStorage.removeItem('isLogin');
        navigateToLogin();
    }
    return Promise.reject(error);
});
export default instance;