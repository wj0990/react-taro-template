import { request, requestFormData } from "@/components";

/** 打卡 */ 
export async function onClockIn(params) {
  console.log('------paramsparamsparamsparams----22222--->',params)
  return requestFormData({
    method: "POST",
    url: "/api/cms-basic-api/cs/empAttendance/Clock",
    body: params
  })
}

/** 获取打卡记录 */ 
export async function getpageClockDetail(params) {
  return request({
    method: "POST",
    url: "/api/cms-basic-api/cs/empAttendance/pageClockDetail",
    body: params // { empCode, orgCode }
  })
}

/** 获取打卡信息详情 */ 
export async function getonClockInInfo(params) {
  return request({
    method: "POST",
    url: "/api/cms-basic-api/cs/empAttendanceGroup/getGroupByUserCode",
    body: params // { empCode, orgCode }
  })
}


/** 获取打卡规则详情 */ // 暂时模拟数据
export async function getonClockInRuleInfo(params) {
  return request({
    method: "POST",
    url: "/api/cms-basic-api/cs/empAttendanceGroup/getonClockInRuleInfo",
    body: params // { empCode, orgCode }
  })
}