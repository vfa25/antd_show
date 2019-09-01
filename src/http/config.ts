/**
 * 注释基于axios v0.19.0
 * 配置参考 https://mp.weixin.qq.com/s/sCL0QBHiPidiSOBJUiTx6g
 * 用于异常捕捉，添加配置。
 */

import axios from 'axios'
import { notification } from 'antd'
import { httpCode, ignoreErrorCode } from './statusCode'

// 配置 Content-Type。'post', 'put', 'patch'默认都是'application/x-www-form-urlencoded'
// https://github.com/axios/axios/blob/master/lib/defaults.js   第94行
axios.defaults.headers.post['Content-Type'] = 'aplication/json'
/**
 * 配置 axios
 */
/**
 * InterceptorManager
 * 维持了一个实例属性handlers数组，并实现了use原型方法，实参1：resolved和实参2:rejected作为对象属性压栈；
 * 实现了forEach方法，故 实参1 和 实参2 都是 function。
 * 参考：https://github.com/axios/axios/blob/master/lib/core/InterceptorManager.js  第17行
 *
 * 实例化时机：前者在Axios实例化时被实例化为属性interceptors对象的request和response
 * 参考：https://github.com/axios/axios/blob/master/lib/core/Axios.js   第16行
 *
 * 调用时机：拦截器工作原理就是借助了Promise进行链式注册，不过request写在后面的先调用，而response写在前面的先调用
 * 参考：https://github.com/axios/axios/blob/master/lib/core/Axios.js   第44行
 */
// http request 拦截器
axios.interceptors.request.use(
    config => {
        return config
    },
    err => {
        return Promise.reject(err)
    }
)
// http response 拦截器
axios.interceptors.response.use(
    response => {
        // if (response.data.code === 0 && response.data.msg !== -1) {
        //   notification.error({
        //     message: '系统错误',
        //     description: response.data.msg,
        //     duration: 5
        //   });
        // }
        return response
    },
    error => {
        let errorTitle = ''
        let errorDesc = ''
        if (error.response) {
            const { data, status } = error.response
            if (data && String(data) === '[object Object]') {
                Object.keys(data).forEach(v => {
                    if (!Array.isArray(data[v])) {
                        errorDesc += data[v] + '\t\n'
                    } else if (!ignoreErrorCode.includes(v)) {
                        errorDesc += data[v].join('；') + '\t\n'
                    }
                })
                errorDesc = errorDesc.trim()
                if (errorDesc.slice(-1) !== '。') {
                    errorDesc = errorDesc + '。'
                }
            }
            if (status && httpCode[status]) {
                errorTitle = httpCode[status]
            } else {
                errorTitle = '系统异常，请联系管理员'
            }
            notification.error({
                message: errorTitle,
                description: errorDesc,
                duration: 5
            })
            return Promise.reject(error.response)
        }
        notification.error({
            message: '连接超时，请检查您的网络',
            duration: 5
        })
    }
)

export default axios
