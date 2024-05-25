import React from 'react';
import Taro from '@tarojs/taro';
import { View,Text, Button, ScrollView } from '@tarojs/components';
import { Card, Descriptions, request } from '@/components';
import deleteIcon from '../../assets/icon/deleteIcon.svg';
import viewIcon from '../../assets/icon/viewIcon.svg';
import { IconFont } from '@nutui/icons-react-taro'
import './index.scss';

const  List = (props)=>{
  const { loading, style={},column=1, title, titleExtra, pagesData={}, columns=[], dataList=[], footerBtnOptions, onSearch } = props;

  // 点击按钮
  const handleBtn = (btn ={}, item)=>{
    const { requestParams = {},btnType } = btn;
    const { url, ...ohters} = requestParams;
    // 默认删除
    if(btnType ==='del' && url){
      Taro.showModal({
        title: '确认删除',
        content: '你是否确认删除当前数据？',
        success: function (res) {
          if (res.confirm) {
            request({
              method: "POST",
              url: url,
              data: {...item},
              // module:'cms-basic-api',
              ...ohters
            }).then(({data})=>{
              // 删除完成刷新页面数据
              onSearch({page:1})
            })
          } else if (res.cancel) {
          }
        }
      })
    }  
  }

  const handleOnClick = (item, type)=>{
    if(type==='edit'){
      // 后面可以带ID
      Taro.navigateTo({ url: '/pages/businessProcess/manage/site/edit/index?type=update' });
    }
  }
  // 下拉刷新
  const handleRefresh = () => {
    if(loading) return;
    onSearch({pageIndex: 1, checkCount:true });
  };

  // 加载更多
  const handleLoadMore = () => {
    if(loading) return;
    const pageIndex = Math.ceil(dataList.length / 10) + 1; // 计算当前页数
    //当前页等于总页数时
    if(pageIndex > pagesData.pages){
      return;
    }

    onSearch({pageIndex, checkCount: false }); // 加载下一页数据
  };

  const renderTitle = (item) => {
    let titleContent;
  
    if (typeof title === 'string') {
      titleContent = <Text>{title}</Text>;
    } else if (typeof title === 'function') {
      titleContent = title(item);
    } else {
      titleContent = title;
    }
  
    return (
      <View className="title-wrap">
        {titleContent}
      </View>
    );
  }

  const renderExtra = (item, ) =>{
    return(!!titleExtra ? titleExtra(item) :undefined);
  };
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
      {dataList.length > 0 && dataList.map((item,i)=>{
        return(
          <Card 
            key={i}
            className="card-warp"
            titleClassName="card-title"
            title={renderTitle(item)}
            extra={renderExtra(item)}
            // renderTitle(item)
            // <View className="title-wrap">
            //   {`${item.code}/${item.name}`}
            //   <Button 
            //     type="link" 
            //     className="title-btn"
            //     onClick={()=>handleOnClick(item, 'edit')}
            //   >
            //     <IconCustom name="editCustom" className="icon" width="16px" height="16px" size="16" />
            //     编辑
            //   </Button>
            // </View>
            
            // }
            footer={
              <View className="footer-wrap">
                {footerBtnOptions?.length >0 && footerBtnOptions.map((btn, j)=>{
                  const { onClick,className, btnType, shape="circle", ...ohters } = btn;
                  const cls = ['footer-btn',className, shape && `footer-btn-${shape}`].filter(Boolean).join(' ').trim();
                  return( 
                    <Button
                      alt={btn?.title}
                      key={j}
                      className={cls}	  
                      onClick={()=>{
                        if(onClick){
                          onClick(item,onSearch); // 自定义点击事件
                        }else{
                          handleBtn(btn,item); // 默认
                        }}
                      }
                      {...ohters}
                    >
                      {btn?.title}
                      {/* 暂时写死后期如果没有改动可提公共footer */}
                      {(btnType ==='info' || btnType ==='del') && <IconFont name={btnType === 'del' ? deleteIcon : viewIcon} className="icon" size="25" />}
                    </Button>)
                })}
              </View>
            }
          >
            <Descriptions column={column} columns={columns} data={item} />
          </Card>
        )
      })}
    </ScrollView>
  )
}

export default List;