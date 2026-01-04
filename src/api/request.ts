import Axios from 'axios'
import cookie from 'js-cookie'
import { message } from 'antd';
const instance = Axios.create({
    timeout: 1000,
    headers:{
        Authorization: 'Bearer ' + cookie.get('token')
    }
});
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log('error',error);
    if(error.status===500){
        message.error('服务器错误');
    }
    return Promise.reject(error);
});
export default instance;