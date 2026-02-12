import axios from 'axios'
import router from '../router/index.js'
import {
  ElMessage
} from 'element-plus';

//创建axios实例对象
const request = axios.create({
  baseURL: '/api',
  timeout: 600000
})

//axios的响应 response 拦截器
request.interceptors.response.use(
  (response) => { //成功回调
    return response.data;
  },
  (error) => { //失败回调
    
    if (error.response.status == 401) {
      ElMessage.error("登陆超时,请重新登录");
      router.replace('/login');
    }
    return Promise.reject(error);
  }
)

request.interceptors.request.use(
  (config) => { //成功回调
    const form = JSON.parse(localStorage.getItem('useFormItem'));
    console.log(form + "3213121");
    if (form && form.token) {
      config.headers.token = form.token;
    }
    return config;
  },
  (error) => { //失败回调
    return Promise.reject(error);
  }
)

export default request;