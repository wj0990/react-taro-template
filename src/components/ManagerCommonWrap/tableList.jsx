import React from 'react';
import Taro from '@tarojs/taro';
import { View, Button, ScrollView } from '@tarojs/components';
import { Table } from '@nutui/nutui-react-taro';
import { Card, Descriptions, request } from '@/components';

// import { useContextStore } from '@/store'
import './index.scss';

const  TableList = (props)=>{
  const { loading,className, style={},column=1, title, pagesData={}, columns=[], dataList=[], footerBtnOptions, onSearch, ...resetProps } = props;
  // const { dataList = []} = useContextStore();

  // 点击按钮
  // const handleBtn = (btn ={}, item)=>{
  //   const { requestParams = {},btnType } = btn;
  //   const { url, ...ohters} = requestParams;
  //   // 默认删除
  //   if(btnType ==='del' && url){
  //     Taro.showModal({
  //       title: '确认删除',
  //       content: '你是否确认删除当前数据？',
  //       success: function (res) {
  //         if (res.confirm) {
  //           request({
  //             method: "POST",
  //             url: url,
  //             data: {...item},
  //             module:'cms-basic-api',
  //             ...ohters
  //           }).then(({data})=>{
  //             // 删除完成刷新页面数据
  //             onSearch({page:1})
  //           })
  //         } else if (res.cancel) {
  //         }
  //       }
  //     })
  //   }  
  // }


  // const handleOnClick = (item, type)=>{
  //   if(type==='edit'){
  //     // 后面可以带ID
  //     Taro.navigateTo({ url: '/pages/businessProcess/manage/site/edit/index?type=update' });
  //   }
  // }
  // 下拉刷新
  const handleRefresh = () => {
    if(loading) return;
    onSearch && onSearch({pageIndex: 1, checkCount:true });
    // if (isRefreshing || isLoading) return;
    // setIsRefreshing(true);
    // fetchData(1); // 刷新第一页数据
  };
  // 加载更多
  const handleLoadMore = () => {
    if(loading) return;

    // if (isRefreshing || isLoading) return;
    // setIsLoading(true);
    const pageIndex = Math.ceil(dataList?.length / 10) + 1; // 计算当前页数
    //当前页等于总页数时
    if(pageIndex > pagesData.pages){
      return;
    }

    onSearch && onSearch({pageIndex, checkCount: false }); // 加载下一页数据
  };

  // const renderTitle = (item)=>{
  //   return(
  //     <View className="title-wrap">
  //       {typeof(title) === 'function'? title(item): title}
  //     </View>
  //   ) 
  // }

  return (
    <ScrollView
      className="scroll-container"
      style={style}
      scrollY
      scrollWithAnimation
      enableBackToTop
      onScrollToLower={handleLoadMore}
      onScrollToUpper={handleRefresh}
    >
      <Table
        className={className}
        style={{fontSize:12}}
        columns={columns}
        data={dataList}
        // summary="这是总结栏"
        {...resetProps}
      />
    </ScrollView>
  )
}

export default TableList;