import axios from "axios";
// 创建实例
const service = axios.create({
    // baseURL: process.env.VUE_APP_API,    // 请求地址
    baseURL: '/api',    // 请求地址
    timeout: 5000,  // 超时
});

// 拦截器
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // config.headers['Token'] = getToken();  // 携带token
    // config.headers['Username'] = getUsername();  // 携带token
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    const data = response.data;
    // 不为0，即接口异常时
    // if (data.resCode !== 0) {
    //     ElMessage.error(data.message);
    //     return Promise.reject(data);
    // } else {
    //     // ElMessage.success(data.message);
    //     return data; // return Promise.resolve(data);
    // }
    return data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
// 暴露service
export default service;