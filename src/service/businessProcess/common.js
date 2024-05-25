import { request } from "@/components";

/** 用户登陆 */ 
export async function login(params) {
  const { loginType, ...others} = params;
  let url = loginType ==='web' ?  "/api/auth/auth/login":'/api/auth/auth/wxLogin';
  return request({
    method: "POST",
    url: url,
    data: others,
  })
}
/** 获取用户手机号码 */ 
export const getwxPhone = (params) => {
  return request({
    method: "POST",
    url: '/api/auth/auth/wxPhone',
    data: params,
  })
};

/** 用户登陆注册验证 */ 
export const register = (params) => {
  return request({
    method: "POST",
    url: '/henry-wx-applet/applet/register',
    data: others,
  })
};

// /**获取用户信息**/
export async function getUserInfo(params) {
  const { loginType, ...others} = params;
  let url = '/api/henry-wx-applet/applet/selectUser';
  return request({
    method: "POST",
    url: url,
    data: others,
  })
}
/** 分页查询用户角色 */ 
export async function selectRoles(params) {
  let url = "/api/auth/role/allOrgRoleByCurrentUser";
  return request({
    method: "POST",
    url: url,
    data: params,
  })
}

/** 查字典公共接口 */ 
export async function getDictToType(params) {
  params.dictStatus = 10;
  return getAllDictToType(params);
}

/** 查所有字典公共接口 */ 
export async function getAllDictToType(params) {
  return request({
    method: "POST",
    url: '/api/cms-basic-api/basic/dict/getDetailByDictType',
    data: params,
  })
}
