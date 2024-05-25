import Taro, { createSelectorQuery } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { useRequest } from '@/components';
import { getDictToType } from '../service/businessProcess/common'; 

// 获取节点高度
export const getDOMNodeHeightByClassName = (className) => {
  return new Promise((resolve) => {
    setTimeout(() => {
    createSelectorQuery()
      .select(`.${className}`)
      .boundingClientRect((rect) => {
        if (rect) {
          const height = rect?.height ? Math.round(rect.height):0
          resolve(height);
        } else {
          resolve(0);
        }
      })
      .exec();
    }, 100); // 根据需要调整延迟时间
  });
};

// 获取时间
export  const useGetTimeStr = () =>{
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentTime, setCurrentTime] = useState();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => { 
    const intervalId = setInterval(() => {
      const formattedTime = new Date().toLocaleTimeString([], { hour12: false });
      const timeParts = formattedTime.match(/^(\d{2}):(\d{2}):(\d{2})$/);
      if (timeParts) {
        setCurrentTime(`${timeParts[1]}:${timeParts[2]}:${timeParts[3]}`);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return { currentTime }
}

// 获取用户信息
export const getLoginInfo = () => {
  let userInfo = {}
  const data = Taro.getStorageSync('userData');
  if(data){
    userInfo = JSON.parse(data); 
  }
  return userInfo;
};

/** 获取当前登录用户的网点code和name */
export const useCurrentCode = () => {
  const { orgCode, orgName, ...rest } = JSON.parse( Taro.getStorageSync('userData') || '{}');
  const phone = Taro.getStorageSync('phone') || rest.phone ;
  const isHead = orgCode ==='999999';
  let siteCode = undefined;
  siteCode = { label: orgName, value: orgCode };
  const siteArea = rest?.areaCode ? { label: rest?.areaName, value: rest?.areaCode } : undefined;
  return {
    ...rest,
    phone,
    orgCode,
    orgName,
    siteCode,
    siteArea,
    isHead
  };
};

/**获取屏幕宽度 */ 
export const getSreenWidth = async ()=>{
  const res = await Taro.getSystemInfo();
  const screenWidth = res.rcreenWidth;
  return screenWidth;
} 

/** 获取字典数据 */
export const useGetComDit = (params) =>{
  // 字典
  const { loading, run, data } = useRequest(getDictToType,{
    onSuccess: (res) => {
      const dataList = res?.data || [];
      const list = [];
      dataList?.length > 0 && dataList.forEach((item)=>{
        list.push({
          key:item.code,
          code:item.code,
          name:item.name,
          value:item.code,
          label:item.name 
        });
      })
      return list;
    },
  });

  useEffect(()=>{
    run(params)
  }, [])

  return({loading, run, data})
}