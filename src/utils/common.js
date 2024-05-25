// 手动实现编码函数 Base64 编码
export const  encodeBase64 = (str) => {
  const b64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let result = "", padding = "";
  for (let i = 0; i < str.length; i += 3) {
    const a = str.charCodeAt(i), b = str.charCodeAt(i+1), c = str.charCodeAt(i+2);
    const bitmap = (a << 16) | (b << 8) | c;
    result += b64Chars[(bitmap >> 18) & 0x3f] + b64Chars[(bitmap >> 12) & 0x3f] + b64Chars[(bitmap >> 6) & 0x3f] + b64Chars[bitmap & 0x3f];
    padding = str.length - i >= 3 ? "" : (str.length - i == 2 ? "=" : "==");
  }
  return result.substr(0, result.length - padding.length) + padding;
}
// 民族 
export const nationalityArr = [
  '汉族',
  '蒙古族',
  '回族',
  '藏族',
  '维吾尔族',
  '苗族',
  '彝族',
  '壮族',
  '布依族',
  '朝鲜族',
  '满族',
  '侗族',
  '瑶族',
  '白族',
  '土家族',
  '哈尼族',
  '哈萨克族',
  '傣族',
  '黎族',
  '傈僳族',
  '佤族',
  '畲族',
  '高山族',
  '拉祜族',
  '水族',
  '东乡族',
  '纳西族',
  '景颇族',
  '柯尔克孜族',
  '土族',
  '达斡尔族',
  '仫佬族',
  '羌族',
  '布朗族',
  '撒拉族',
  '毛南族',
  '仡佬族',
  '锡伯族',
  '阿昌族',
  '普米族',
  '塔吉克族',
  '怒族',
  '乌兹别克族',
  '俄罗斯族',
  '鄂温克族',
  '德昂族',
  '保安族',
  '裕固族',
  '京族',
  '塔塔尔族',
  '独龙族',
  '鄂伦春族',
  '赫哲族',
  '门巴族',
  '珞巴族',
  '基诺族'
];

export const getNationalityOptions = ()=>{
  return Array.from(nationalityArr,item=>({value:item, label:item}));
};

export const groupTypeList =[{ value:'bigArea', label:'大区'},{ value:'area', label:'分部'},{ value:'cus', label:'客户'},{ value:'seller', label:'商家'},{ value:'emp', label:'业务员'}];
// export const groupTypeList =[{ value:10, label:'承包区'},{ value:20, label:'市场部'}];

// 状态
export const statusOptions = [
  { label: '正常', value: 10 },
  { label: '失效', value: 20 }
];
// 搜索状态
export const searchStatusOptions = [
  { label: '全部', value: undefined },
  { label: '正常', value: 10 },
  { label: '失效', value: 20 }
];
// 快递公司
export const expressCompany = [
  { label: '圆通', value: 10 },
  { label: '中通', value: 20 },
  { label: '申通', value: 30 },
  { label: '安能', value: 40 },
];

// 启用状态含全部
export const oilCardCld = [
	{ label: '中国石化', value: 10 },
	{ label: '中国石油', value: 20 },
	{ label: '中国海油', value: 30 },
	{ label: '个人油站', value: 40 }
]

//保险公司
export const insuranceLCD = [
	{ label: '中国平安', value: 10 },
	{ label: '中国人寿', value: 11 },
	{ label: '中国人保', value: 12 },
	{ label: '太平洋', value: 13 }
];

// 上传数据
export const uploadOptions = [
  { label: '到件', value: 10 },
  { label: '上车', value: 20 },
  { label: '派件', value: 30 },
  { label: '签收', value: 40 },
];
// 周天
export const weekDaysOption = [
  { label: '周一', value: 1 },
  { label: '周二', value: 2 },
  { label: '周三', value: 3 },
  { label: '周四', value: 4 },
  { label: '周五', value: 5 },
  { label: '周六', value: 6 },
  { label: '周末', value: 0 },
];
// 是否
export const yesOrNoBooleanOption = [
  { label: '是', value: true },
  { label: '否', value: false }
];
// 组织类型
export const orgTypeOption =[
  { label: '业务员', value: 'emp' },
  { label: '分部', value: 'org' },
  { label: '客户', value: 'cus' }
];


// 将角度转换为弧度
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// 计算两个经纬度是否在给定的范围内
export function isWithinRange(lat1, lon1, lat2, lon2, range) {
  const R = 6371; // 地球半径（单位：千米）
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c * 1000;
  return{isInRange:distance <= range , space: distance}
}
// 格式化时间
//  23:59:59.999999999
export function formatTime(timeStr) {
  const [h="00", m="00", s='00'] = timeStr.split(":"); // 将时间字符串拆分为小时、分钟和秒的部分
  const date = new Date(); // 创建一个 Date 对象，默认为当前日期和时间
  date.setHours(h); // 设置小时
  date.setMinutes(m); // 设置分钟
  date.setSeconds(s); // 设置秒
  return(date.toTimeString())
} 
/**
 * 验证时间范围
 * @param {*} time 当前时间
 * @param {*} min 最小时间
 * @param {*} max 最大时间
 * @returns 
 */
export function verityTime(time, min, max) {
  const thisTime =new Date(time).valueOf();
  const minTime = new Date(min).valueOf();
  const maxTime = new Date(max).valueOf();
  return(thisTime <minTime || thisTime > maxTime)
}


/**
 * 防抖
 * @param {*} func 回调函数
 * @param {*} wait 延时毫秒
 */
// 防抖
export function debounce(fn, wait){
  let timer =null;
  return function(){
    const context = this;
    const args = arguments;
    if(timer){
      clearTimeout(timer);
      timer =  null;  
    }
    timer = setTimeout(()=>{
      fn.apply(context, args)
    },wait)
  }
 }
/**
 * 截流
 * @param {*} func 
 * @param {*} wait 
 * @returns 
 */
export const throttle = (func, wait = 50) => {
  // 上一次执行该函数的时间
  let lastTime = 0
  return function(...args) {
    // 当前时间
    let now = +new Date()
    // 将当前时间和上一次执行函数时间对比
    // 如果差值大于设置的等待时间就执行函数
    if (now - lastTime > wait) {
      lastTime = now
      func.apply(this, args)
    }
  }
}
