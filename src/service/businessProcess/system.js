import { request } from "@/components";

/** 所有系统查询 */ 
export async function selectAllSystem(params) {
  let url = "/api/auth/system/allInnerSys";
  return request({
    method: "POST",
    url: url,
    data: params,
  })
}
