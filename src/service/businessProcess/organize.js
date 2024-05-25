import { request } from "@/components";

/** 获取网点所有角色，含用户选中check角色（APP编辑用户使用） */ 
export async function selectStationLike(params) {
  let url = "/api/cms-basic-api/basic/org/selectLike";
  return request({
    method: "POST",
    // module:'cms-basic-api',
    url: url,
    data: params,
  })
}

/** 获取部门 */ 
export async function selectAllEnable(params) {
  let url = "/api/cms-basic-api/basic/dept/selectAllEnable";
  return request({
    method: "POST",
    url: url,
    data: params,
  })
}

/** 保存组织 */ 
export async function saveOrg(params) {
  let url = "/api/cms-basic-api/basic/station/save";
  return request({
    method: "POST",
    // module:'cms-basic-api',
    url: url,
    data: params,
  })
}
