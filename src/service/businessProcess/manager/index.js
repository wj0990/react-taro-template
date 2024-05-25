import { request } from "@/components";

/** 查询进程管理列表 */ 
export async function getManageMenuList(params) {
  let url = "/api/manage/menu/list";
  return request({
    method: "POST",
    url: url,
    data: params,
  })
}
