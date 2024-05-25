import { useState, useRef } from 'react';
import Taro, { getCurrentPages, showToast, showLoading, hideLoading, getApp, request as TaroRequest } from '@tarojs/taro';
import { navigateTo } from '../Router';
import proxy from './proxy';
declare const window: any;

export interface UseRequestLoadingOptionProps {
  title?: string;
}
interface UseRequestProps<T = any> {
  loadingOption?: UseRequestLoadingOptionProps;
  onSuccess?: (data: T, params:any) => void;
  onError?: (data: Error) => void;
}

/** 请求状态码 */
export const codeMessage: {[key: number]: string} = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功',
  400: '发出的请求错误',
  401: '登录信息已过期',
  403: '用户访问被禁止',
  404: '请求不存在，服务器没有进行操作',
  406: '请求的格式错误',
  410: '资源被永久删除',
  422: '验证错误',
  500: '服务器发生错误，请检查服务器',
  502: 'nginx异常',
  503: '服务不可用，服务器暂时过载或维护',
  504: 'nginx超时',
};

/**忽略判断 token */
const ignoreAPI = [
  // 登录
  'pages/login/index',
];

/** 异常弹窗 */
export function errInfo(messageDetail: string) {
  showToast({
    title: messageDetail,
    icon: 'error',
    mask: true,
  });
}

/** 校验请求是否成功 */
export function checkResult(data: any, requestUrl: string) {
  if (data.code !== null) {
    if (data.code === -9) {
      errInfo(data.message);
      console.log(`${data.message} ${requestUrl}`);
    }
    // -2 登录 认证失败
    if (data.code === -2) {
      if (requestUrl.indexOf('api/access/grant') === -1) {
        navigateTo({url: '/401'});
      }
    }
    if (data.code === -3) {
      // 功能未授权, 显示接口地址， -3 授权失败
      errInfo(`无权访问该资源 ${requestUrl}`);
      console.log(`无权访问该资源 ${requestUrl}`);
    }
    if (data.code === -4) {
      // -4 页面找不到
      errInfo(`请求的地址不存在！`);
      console.log(`请求的地址不存在！ ${requestUrl}`);
    }
    if (data.code === -1) {
      // 弹出错误提示
      errInfo(data.message);
      console.log(`${data.message} ${requestUrl}`);
    }
    if (data.code === 203) {
      // 弹出错误提示
      errInfo(data.message);
      // 退出登陆
      navigateTo({url: '/pages/login/index'});
      console.log(`${data.message} ${requestUrl}`);
    }

    if (data.code === -1 && data.status ===-1) {
      // 弹出错误提示
      errInfo(data.message);
    }
    if (requestUrl.indexOf('api/access/grant') === -1 && data.code === -403) {
      // 被拦截
      errInfo(data.message);
      console.log(`${data.message} ${requestUrl}`);
    }
  }
}
/** 获取路由地址，删除x-auth参数 */
export function funcUrlDel(name: string) {
  let query: string;
  if (process.env.TARO_ENV === 'h5') {
    const loca = window.location;
    query = loca.href;
  } else {
    const pagearr = getCurrentPages();
    const currentPage = pagearr[pagearr.length - 1];//获取当前页面信息
    query = currentPage.$taroPath;
  }
  if (query && query.indexOf(name) > -1) {
    const arrAll: any[] = query.split('?');
    const baseUrl = arrAll[0];
    const arr: any[] = arrAll[1].split('&');
    const obj: {[key: string]: string} = {};
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split('=');
      if (arr[i][1]) {
        obj[arr[i][0]] = arr[i][1];
      }
    }
    delete obj[name];
    const prames = JSON.stringify(obj)
      .replace(/[\"\{\}]/g, '')
      .replace(/\:/g, '=')
      .replace(/\,/g, '&');
    return baseUrl + (prames && prames !== '' ? `?${prames}` : '');// 判断参数是否为空，不为空时，拼接问号 加参数
  } else {
    return query;
  }
}

/** url文件下载 */
export function downloadRequest(url: string) {
  const a = document.createElement('a');
  a.href = url.trim();
  a.download = url.trim();
  a.click();
}

/** 接口调用方法,入参与taro文档一致 */
export function request<T = any>(options: Taro.request.Option & {module?: string; baseURL?: string}):Promise<T> {
  /** 添加公共header */
  const newHeader: TaroGeneral.IAnyObject = {}; // 默认值
  // 保持登录会话
  let authCode: string|undefined|null;

  const token = Taro.getStorageSync('userToken');
  if(token) {
    newHeader['token'] = token;

  }else{
    //退出登陆
    navigateTo({url: '/pages/login/index'});
  }
  let requestInstance: Taro.RequestTask<any> | undefined;
  
  if (process.env.TARO_ENV === 'h5') {
    
  } else {
    authCode = getApp()['x-auth'];
  }

  if (authCode) {
    newHeader['x-auth'] = authCode;
  }
  const refUrlCode = funcUrlDel('x-auth');
  // 转码，处理路由带多个参数时，丢失参数问题
  const refUrlCodeEn = encodeURIComponent(encodeURIComponent(refUrlCode));
  if (authCode || refUrlCodeEn) {
    newHeader['x-refUrl'] = refUrlCodeEn;
  }
  //测试token 后期login对接进去
  // newHeader.token = 'eyJhbGciOiJIUzUxMiJ9.eyJjb2RlIjoiOTk5OTk5OTkiLCJuYW1lIjoi5oC76YOo566h55CG5ZGYIiwic3RhdGlvbkNvZGUiOiI5OTk5OTkiLCJzdGF0aW9uTmFtZSI6IuaAu-WFrOWPuCIsImFyZWFDb2RlIjoiOTk5OTk5IiwiYXJlYU5hbWUiOiLmgLvlhazlj7giLCJkYXRlIjoxNjg4MTAzMzU4MDAwLCJhdXRoIjpbXSwibW9iaWxlIjoiMTMxMTIzNDU2ODAiLCJzaG93TWFpblBhZ2UiOmZhbHNlLCJzaG93UXJDb2RlIjpmYWxzZSwic3ViQWNjb3VudCI6ZmFsc2UsImRldmljZVR5cGUiOiJ3ZWIiLCJkZXZpY2VTbiI6IiIsInN1YiI6Ijk5OTk5OTk5IiwiaXNzIjoiIiwiaWF0IjoxNjg4MTAzMzU4LCJleHAiOjE2ODgxODk3NTh9.mAMk5lACc1H-eRSyydJa2Wqh9ZQxVT9qrlfz89ewfGS-nsRVyJ7w2jsOeBYeEyAATEl82N-DiMpodrIhmc8J-g';
  /**对 url 进行 处理*/
  const newUrl = options.url.replace(/^\//, '');
  /** url 拼接模块 开发模式不进行拼接模块*/
  let url =  (options.module ? (options.module + '/') : '') + newUrl;
  // let url = process.env.NODE_ENV === 'development' ? newUrl : (options.module ? (options.module + '/') : '') + newUrl;
  let baseURL = options.baseURL || '';
  // @ts-ignore
  const newPrefix = '/' + (typeof PREFIX !== 'undefined' && PREFIX && (PREFIX.replace(/^\//, '').replace(/\/$/, '') + '/') || '');
  if (process.env.NODE_ENV === 'production') {
    // 1. 生产环境  PROBASEURL 生产地址
    // @ts-ignore
    baseURL = options.baseURL || (typeof PROBASEURL !== 'undefined' && PROBASEURL) || '';
  } else if (process.env.NODE_ENV === 'development') {
    // 2. 测试环境   TESTBASEURL 测试地址
    // @ts-ignore
    baseURL = options.baseURL || (typeof TESTBASEURL !== 'undefined' && TESTBASEURL) || '';
  }else{
  }
  url = url || options.url || '';
  if (!/^http/.test(url)) {
    url = baseURL + newPrefix + url;
  }
  // 暂时替换 这个包有问题
  if(options?.body){
    options.data =  options?.body;
  }
  // 微信小程序
  if(process.env.TARO_ENV === 'weapp'){
    url = proxy(url)
  }
  const promise = new Promise((resolve, reject) => {
    requestInstance = TaroRequest<T>({
      timeout: 600000,
      ...options,
      url,
      header: {
        ...newHeader,
        ...options.header,
      },
      success: (result: Taro.request.SuccessCallbackResult) => {
        const { data, header, statusCode} = result;
        // 请求参数
        const queryData = options.data;
        const authCode = header['x-auth'] || (header.get && header.get('x-auth'));
        if (authCode) {
          if (process.env.TARO_ENV === 'h5') {
         
          } else {
            getApp()['x-auth'] = authCode;
          }
        }
        const refUrlCode = header['x-refUrl'] || (header.get && header.get('x-refUrl'));
        if (refUrlCode) {
          if (process.env.TARO_ENV === 'h5') {
            sessionStorage.setItem("x-refUrl",refUrlCode)
          } else {
            getApp()['x-refUrl'] = refUrlCode;
          }
        }
        if (data && data.code) {
          checkResult(data, options.url);
        } else if (statusCode < 200 || statusCode >= 300) {
          const errortext = codeMessage[statusCode];
          if (errortext) {
            errInfo(`请求发生错误:${errortext}`);
            console.log(`请求发生错误:${errortext} ${url}`);
          } else {
            console.log(`请求发生错误:${statusCode} ${url}`);
          }
        }
        options.success && options.success(data, queryData);
        resolve(data);
      },
      fail: (res: TaroGeneral.CallbackResult) => {
        console.log('failfail', url, res);
        const { errMsg } = res;
        errInfo(errMsg);
        if (options.fail) {
          options.fail(res);
        } else {
          reject(res);
        }
      }
    });
  })
  promise.abort = () => {
    requestInstance && requestInstance.abort();
  };
  return promise;
};

/** 接口调用方法,入参与taro文档一致, 默认Content-Type: application/x-www-form-urlencoded */
export function requestFormData (options: Taro.request.Option & {module?: string; baseURL?: string}) {
  /** 将默认Content-Type改为application/x-www-form-urlencoded */
  if (!options.header) {
    options.header = {};
  }
  if (!(Object.keys(options.header).some(e => e.toLowerCase() === 'content-type'))) {
    options.header = { 'content-type': 'application/x-www-form-urlencoded', ...options.header};
  }
  return request(options);
}

export const useRequest = <T = any, K = any>(
  fn: (params?: K) => T,
  props: UseRequestProps<T>
) => {
  const ref = useRef(props);
  ref.current = props;
  const { loadingOption, onSuccess, onError } = ref.current;
  const [loading, setLoading] = useState<boolean>(false);
  const [requestData, setRequestData] = useState<any>(undefined);
  
  const run = async (params?: K) => {
    setLoading(true);
    loadingOption && showLoading({
      title: loadingOption.title || '数据加载中' 
    })
    try {
      const data = await fn(params);
      if (onSuccess) {
        const newData = await onSuccess(data,params);
        setRequestData(newData);
      }
      
      setLoading(false);
      if (loadingOption) {
        setTimeout(() => {
          hideLoading();
        }, 500);
      }
    } catch (err) {
      onError?.(err as Error);
      setLoading(false);
      loadingOption && hideLoading();
    }
  }

  return {
    loading,
    run,
    data: requestData
  }
}