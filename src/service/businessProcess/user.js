import Taro from '@tarojs/taro';
import { request } from "@/components";

// const baseUrlNetworkDashboard ="http://localhost:3000"; 

// // //根据微信拼接服务器前缀
// function disposeRequestFormData(options,type) {
//   // 根据不同的环境来补全请求地址
//   let url = baseUrlNetworkDashboard + options.url;
//   if (process.env.TARO_ENV === "weapp") {
//     url = `${baseUrlNetworkDashboard}${options.url}`;
//   }
//   options.url = url;
//   if(type==='fine'){
//     return request({
//       ...options,
//       module: 'sitedashboard',
//       header: {
//         'x-auth-id':  Taro.getStorageSync("x-auth-id"),
//       },
//     },baseUrlNetworkDashboard);
//   }else{
//     return requestFormData({
//       ...options,
//       module: 'sitedashboard',
//       header: {
//         'x-auth-id':  Taro.getStorageSync("x-auth-id"),
//       },
//     },baseUrlNetworkDashboard);
//   }
// }

/** 分页查询用户 */ 
export async function selectPage(params) {
  let url = "/cms-basic-api/api/user/selectPage";
  return request({
    method: "POST",
    url: url,
    data: params,
  })
}
/** 新增用户 */ 
export async function add(params) {
  let url = "/api/user/add";
  const options = {
    method: "POST",
    url: url,
    data: params,
    module:'cms-basic-api'
  };
  return disposeRequestFormData(options,'request');
}
/** 更新用户 */ 
export async function update(params) {
  let url = "/api/user/update";
  const options = {
    method: "POST",
    url: url,
    data: params,
  };
  return disposeRequestFormData(options,'request');
}
/** 删除用户 */ 
export async function del(params) {
  let url = "/api/user/update";
  const options = {
    method: "POST",
    url: url,
    data: params,
  };
  return disposeRequestFormData(options,'request');
}
/** 查用户详情 */ 
export async function selectDetailByCode(params) {
  let url = "/api/user/selectDetailByCode";
  return request({
    method: "POST",
    url: url,
    data: params,
  })
}

export async function selectIndicator(params) {
  return request({
    url: '/ods-operation-api/api/indicatorview/selectIndicator',
    method: 'post',
    data: params,
  })
}