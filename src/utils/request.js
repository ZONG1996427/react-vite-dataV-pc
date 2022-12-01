/*
 * @Descripttion: msg
 * @version: 1.0
 * @Author: 宗
 * @Date: 2022-09-16 15:02
 * @LastEditors: 宗
 * @LastEditTime: 2022-09-16 15:02
 */
import axios from 'axios'
import {message as Message} from 'antd';

/**
 * @name: request
 * @msg: 创建axios请求，baseURL三元判断是因为fast mock接口并非真实部署在服务端接口，在前端项目部署到gitee时，接口并没有真实存在的服务器，
 * gitee会拦截掉，所以在线上环境使用proxy代理还是会出现跨域，直接写死，本地启动时仍然是代理
 * @param {*}
 * @return {*}
 */
const request = axios.create({
    baseURL: 'https://www.fastmock.site/mock/9667b80f5ce6621e141d32e033b73553/api',
    timeout: 5000
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})
// 处理响应拦截器
request.interceptors.response.use(result => {
    // 响应成功
    // 1-响应成功，业务成功
    const {data, message, success, code} = result.data
    if (success && code === 200) {
        return data
    } else {
        // 2-响应成功，业务失败
        Message.error(message || '请求成功，响应失败');
        return Promise.reject(data)
    }
    // 响应失败
}, err => {
    // 服务端token过期，判断状态码
    if (err.response && err.response.data && err.response.data.code === 401) {
        Message.error(new Error(err.message) || '请求失败');
    }
    Message.error(new Error(err.message) || '请求失败');
    return Promise.reject(err)
})

export default request
