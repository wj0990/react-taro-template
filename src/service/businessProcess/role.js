import { request } from "@/components";

/** 分页查询用户角色 */ 
export async function selectRoles(params) {
  let url = "/api/role/role/allOrgRoleByCurrentUser";
  return request({
    method: "POST",
    url: url,
    data: params,
  })
}
/** 获取网点所有角色，含用户选中check角色（APP编辑用户使用） */ 
export async function allOrgRoleByCurrentUser(params) {
  // const { orgCode, ...ohter } = params;
  // let url = `/api/auth/role/allOrgRoleByCurrentUser?orgCode=${orgCode}`;
  const url = `/api/auth/role/allOrgRoleByCurrentUser`;
  return request({
    method: "POST",
    url: url,
    data: params,
  })
}
