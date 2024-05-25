import React,{ useState, useEffect } from 'react';
import { request } from "@/components";
import { View } from '@tarojs/components';
import  FormSelect from '../form/FormSelect';

const SearchSite = (props) =>{
  const [options, setOptions] = useState([]);
  const { path ='/api/cms-basic-api/basic/station/selectLike',
      pathCar ='/api/cms-basic-api/ims/car/base/likeVehicle',
      params:queryParams ={}, requestParams={}, className, columns=[], 
      column =1, data={},isCar = false } = props;
  const cls = ['descriptions-wrap',className].filter(Boolean).join(' ').trim();
  const requestFunc = (params)=> {
    return request({
      method: "POST",
      url: queryParams.isCar ? pathCar : path,
      // module:'cms-basic-api',
      data: {...params, ...queryParams, ...requestParams},
    })
  };
  const handleSearch = (value)=>{
    value && requestFunc({key:value}).then((res)=>{
      setOptions(res?.data || []);
    })
  }

  return (
    <View className={cls} >
      <FormSelect
        showSearch
        onSearch={handleSearch} 
        options={options}
        expandProps={
          {position:"top"}
        }
        {...props} 
      />
    </View>
  )
}

export default SearchSite;