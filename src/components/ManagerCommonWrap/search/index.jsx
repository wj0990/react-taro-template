import React,{ forwardRef } from 'react';
import {  View } from '@tarojs/components';
import { SearchForm } from '@/components';
import './index.scss';

const  Search = forwardRef((props, ref)=>{
  const {loading, hideSubmitBtn ,labelStyle, fields =[], watchList, onSearch, onSubmitBefore,onSubmit, ...restProps } = props;
   const handleSubmit = async (data,a,b)=>{
    let  params = {...data}
    // 提交之前处理数据
    if(onSubmitBefore){
      params = await onSubmitBefore(params);
    }
    onSearch && await onSearch({ pageIndex: 1,checkCount: true, ...params});
    onSubmit && await onSubmit(params);
  }
  return (
    <View className="searchForm">
      <SearchForm
        ref={ref}
        loading={loading}
        labelStyle={labelStyle}
        watchList={watchList}
        fields={fields}
        onSubmit={ hideSubmitBtn ? undefined: handleSubmit}
        {...restProps}
      />
    </View>
  )
})

export default Search;
