import { request } from "@/components";

/** 获取打卡记录 取件扫描 */ 
export async function saveAllOpScan(params) {
  return request({
    method: "POST",
    url: "/api/ims-op-server/op/scan/appScan",
    body: params // { empCode, orgCode }
  })
}