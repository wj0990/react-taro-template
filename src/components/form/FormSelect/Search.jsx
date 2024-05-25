import React,{ useState, useEffect } from 'react';
import { request } from "@/components";
import { View } from '@tarojs/components';
import  FormSelect from './index';

const SelectSearch = (props) =>{
  const [options, setOptions] = useState(props.options || []);
  const {  requestParams={}, className, columns=[], column =1, data={} } = props;
  const cls = ['descriptions-wrap',className].filter(Boolean).join(' ').trim();

  const requestFunc = (params)=> {
    params.orgCode = '999999';  // 暂时测试写死
    return request({
      method: "POST",
      url: path,
      data: params,
      ...requestParams
    })
  };

  const handleSearch = (value)=>{
    value && requestFunc({key:value}).then((res)=>{
      let dataList = [];
      if(res?.data?.length >0){
        res.data.forEach(item=>{
          dataList.push({id:item.id, value: item.code, label:item.name}); 
        });
      }
      setOptions(dataList);
    })
  }
  
  useEffect(()=>{
    setOptions(props?.options)
  },[props.options]);

  return (
    <View className={cls} >
      <FormSelect
        onSearch={handleSearch} 
        options={options}
        expandProps={
          {position:"top"}
        }
        {...props} 
      >
      </FormSelect>
    </View>
  )
}

export default SelectSearch;