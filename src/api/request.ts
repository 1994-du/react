import Axios from 'axios'
import cookie from 'js-cookie'
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
    return Promise.reject(error);
});
export default instance;