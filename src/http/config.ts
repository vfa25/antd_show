/**
 * 注释基于axios v0.19.0
 * 配置参考 https://mp.weixin.qq.com/s/sCL0QBHiPidiSOBJUiTx6g
 * 用于异常捕捉，添加配置。
 */

import axios from 'axios'
import { notification } from 'antd'
import { httpCode } from './statusCode'

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
    console.log(response)
    // if(response.status === 401){
    //   // 401验权失败逻辑
    // }
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
    console.dir(error)
    let errorStr = ''
    if (error.response) {
      const { data, status } = error.response
      if (data && String(data) === '[object Object]') {
        Object.keys(data).forEach(v => {
          errorStr += Array.isArray(data[v]) ? data[v].join('\n') : data[v]
        })
      } else if (status && httpCode[status]) {
        errorStr = httpCode[status]
      } else {
        errorStr = '未知错误，请联系管理员'
      }
    } else {
      errorStr = '连接超时，请检查您的网络'
    }
    notification.error({
      message: '系统异常',
      description: errorStr,
      duration: 5
    })
    return Promise.reject(error)
  }
)

export default axios
