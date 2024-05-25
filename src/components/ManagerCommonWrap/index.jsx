import React,{forwardRef,useState, useEffect, useImperativeHandle, useRef } from 'react';
import Taro, { useRouter, useDidShow } from '@tarojs/taro';
import { View } from '@tarojs/components';
import {request, useRequest,Descriptions,ButtonGroups }from '@/components';
import { Provider } from '@/store'
import List from "./list";
import Info from './info';
import Search from './search';
import AddForm from './edit';
import TableList from './tableList';
import  { getDOMNodeHeightByClassName } from '../../hooks/common';
import './index.scss';

const totalCoumms = [
  {key:'total', title:'总条数'},
  {key:'pagesStr', title:'页数'},
];

// 管理
const ManagerCommonWrap = forwardRef((props, ref)=>{
  const {title, entireTitle, searchParams= {}, searchFooter, listParams= {},infoParams, formParams, tabBtnParams= {}, children} = props;
  const {requestListParams={}, pageSize=10, showPage ,tripHeightTalculateData=[]} = searchParams;
  const { url='', afterRequest } = requestListParams; // 查列表参数
  const [preTotal, setPreTotal ] = useState(0);
  const [searchHeight, setSearchHeight] =  useState(0);
  const searchRef = useRef(null);
  const requestFuncRef = useRef(null);
  const fromRef = useRef(null);

  /** 分页查询 */ 
  const selectPage = (params)=> {
    const {pageIndex=1,checkCount, ...ohters} = params;
    const payload =  {pageIndex, checkCount, pageSize, query:{ ...ohters}};

    const requestFunc = request({
      method: "POST",
      url: url,
      data: payload,
      // module:'api/cms-basic-api'
    })
    requestFuncRef.current = requestFunc;
    return url ? requestFunc :undefined;
  }
  // 列表查询
  const { loading, run, data ={} } = useRequest(selectPage, {
    loadingOption: {},
    onSuccess: (response, queryData ={}) => {
      afterRequest &&  afterRequest(response);
      const {pageIndex = 1, checkCount } = queryData; // 查询条件
      const { dataList: oldList = [] } = data; //列表上次
      let {rows: dataList= [], total=0} = response?.data;
      if(Array.isArray(response?.data)){
        dataList = response.data; 
        total = response.data.length;
      }
      const currentTotal =  checkCount ? total : preTotal;
      // let page = queryData.page || 1;
      // 翻页查询 第一页补充原来数据
      if(!checkCount && pageIndex!==1 ){
        dataList = [...oldList, ...dataList];
        // page += oldPage; 
      }
      setPreTotal(currentTotal)
      const pages = Math.ceil((currentTotal/pageSize)) || 1;
      return { dataList,total:currentTotal, pages, pagesData:{ total:currentTotal,pageIndex, pages, pagesStr:`${pageIndex}/${pages}`}};
    },
  });

  // 表单提交完成
  const onSearch = (params)=>{
    url && run(params)
  }

  // useDidShow 提交完成触发
  const handleOnSearch = (params) =>{
    searchRef?.current?.onSubmit({...params})
  }


  useDidShow(()=>{
    const { type } = router?.params;
    // 列表查询才调用
    !type && title && Taro.setNavigationBarTitle({ title });
    !type && searchRef?.current?.onSubmit({ pageIndex: 1, checkCount:true})
  })

  // 点击tabs
  const handelChangeTabs = (value, opiton) =>{
    tabBtnParams.onChange && tabBtnParams.onChange(value)
  }
  useEffect(()=>{
    // 获取search高度
    // const query = Taro.createSelectorQuery();
    // query.select('#top-search').boundingClientRect();
    // query.exec(rect => {
    // // 在这里你可以执行任何你希望在节点高度变化时触发的操作
    //   setSearchHeight( rect[0].height + 10)
    // });
    if (searchRef.current) {
      const getSearchRefHeight = async() =>{
        const searchRefHeight = await getDOMNodeHeightByClassName('top-search');
        setSearchHeight(searchRefHeight + 10)
      }
      getSearchRefHeight();
    }
  }, [...tripHeightTalculateData])

  // 搜索暴露父组件的属性
  useImperativeHandle(ref, () => {
    return{
      onSearch,
      height: getDOMNodeHeightByClassName('top-search'),
      fromRef: fromRef?.current?.form,
      searchRef:searchRef?.current,
  }});

  const router = useRouter();
  const { type } = router?.params;
  const rendderChildren = () =>{
    if(!!type){
      if(type === 'info') {
        return (<Info title={title} entireTitle={entireTitle}  {...formParams} />)
      }else{
        return(<AddForm ref={fromRef} title={title} entireTitle={entireTitle} {...formParams} />)
      }
    }else{
      return (
        <View style={{paddingTop: searchHeight}} className="wrapper">
          <View id="top-search" className="top-search">
            <Search loading={loading} ref={searchRef} onSearch={onSearch} {...searchParams} />
            {/* 页数 */}
            {!!showPage &&<View className="pages-wrap">{
              typeof(showPage) ==='function' ?
                  showPage()
                :
              <Descriptions column={2} columns={totalCoumms} data={data?.pagesData} /> 
            }
            </View>}
            {/* 渲染tabsBtn */}
            {tabBtnParams?.options?.length > 0 && 
            <ButtonGroups
              className="tabs-btn-group"
              {...tabBtnParams}
              options={tabBtnParams.options}
              onChange={handelChangeTabs}
            />}
            {/* 渲染table表头 */}
            {listParams?.type === 'table' &&<TableList className="top-search-table-top" columns={listParams?.columns} dataList={[]} />}
          </View>
          {/* <List {...Object.assign({}, listParams, data)} /> */}
          <View className="content">
            {listParams?.type === 'table'?
              <TableList 
              // 和表头无法对齐去掉边框
                bordered={false}
                showHeader={false}
                columns={listParams?.columns}
                {...{ ...listParams, ...data}} />
              :
              <List 
                style={{
                // weapp 样式
                  height: `calc(100vh - ${searchHeight + 10}px)`,
                }}
                loading={loading}
                onSearch={handleOnSearch}
                {...{...listParams, ...data }} 
              />
            }
          </View>
        </View>
      )
    }
  }

  return (
    <Provider {...props}>
      <View className="cms-wrap">
        {rendderChildren()}
        {children}
      </View>
    </Provider>
  )
})

export default ManagerCommonWrap;