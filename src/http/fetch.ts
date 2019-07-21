/**
 * axios封装
 */
import { AxiosPromise, AxiosRequestConfig } from 'axios'
import axios from './config';
import { tuple } from '../_util/type';
export * from 'axios';

// http方法
const Methods = tuple('get', 'post', 'put', 'patch', 'delete', 'head');
export type Method = (typeof Methods)[number];

// apiModules全量注册
interface fetchMap<T> {
  [key: string]: T;
}
const fetchCfg: fetchMap<any> = {};
// @types/webpack-env
const requireContext = require.context('./apiModules', false, /\.ts$/)
requireContext.keys().forEach(path => {

  let module = path.replace('.ts', '').replace('./', '')
  fetchCfg[module] = requireContext(path).default
})

/**
 * 解析参数
 * 解析传入fetch的 module 和 apiName
 * @param param
 */
const fetchParam = (param: string) => {
  // ([a-z]+)匹配moduleName；((?:\.[a-z]+)+)匹配深度嵌套apiName；(\/\:\w+)?匹配路径id
  var result = param.match(/^([a-z]+)((?:\.[a-z]+)+)(\/\w+)?$/);
  if (!result || !result[1] || !result[2]) {
    throw new Error(
      '[Error in fetch]: fetch 参数格式为 moduleName.apiName 或 moduleName.apiName/:id'
    );
  } else {
    return {
      moduleName: result[1],
      // eslint-disable-next-line no-mixed-operators
      apiName: result[2] && result[2].slice(1),
      id: result[3] || ''
    };
  }
};

interface Map<T> {
  [key: string]: T;
}


/**
 * 对axios封装通用fetch方法
 * 根据传入的下列参数自动寻找 method 和路径
 * @param moduleInfo 对应fetch配置的名字
 * @param payload 负载
 * @param config http配置
 */
export default function fetch(
  moduleInfo: string, payload?: object, config?: AxiosRequestConfig): AxiosPromise {
  let prefix = '';
  const moduleName = fetchParam(moduleInfo)['moduleName'];
  const apiName: string[] = fetchParam(moduleInfo)['apiName'].split('.');
  const id = fetchParam(moduleInfo)['id'];
  // 判断没有找到传入模块
  if (!fetchCfg.hasOwnProperty(moduleName)) {
    throw new Error(
      `[Error in fetch]: 在api配置文件中未找到模块 -> ${moduleName}`
    );
  }
  // 判断没有找到对应接口
  let item;
  let fetchInfo = fetchCfg[moduleName];
  while (apiName.length) {
    item = apiName.shift();
    fetchInfo = fetchInfo[item!];
  }
  if (!fetchInfo) {
    throw new Error(
      `[Error in fetch]: 在模块${moduleName}中未找到接口 -> ${fetchParam(moduleInfo)['apiName']}`
    );
  } else if (!fetchInfo.url || !fetchInfo.method) {
    throw new Error(
      `[Error in fetch]: 模块${moduleName}中的${fetchParam(moduleInfo)['apiName']}接口，存在url或method未声明`
    );
  }
  let method: Method = fetchInfo['method'];
  let url = fetchInfo['url'];
  if (fetchInfo['url'].charAt(0) === '/') {
    url = url.slice(1)
  }
  url = url.replace('/:id', id);
  url = `${prefix}/${url}`;

  if (method === 'get') {
    return axios['get'](url, { ...config, params: payload })
  } else if (method === 'post' || method === 'put' || method === 'patch') {
    return axios[method](url, payload, config)
  } else {
    return axios[method](url, config)
  }
}
