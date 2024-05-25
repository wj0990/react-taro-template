import React,{ useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import Taro,{ useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import Form from '@/components/form/Form';
import { useRequest, request } from '@/components';
import './index.scss';

const Index = forwardRef((props, ref) => {
  const { fields, watchList, requestInfoParams, onSubmitAfter, onSubmitBefore, submitPath, initialValues, title='',entireTitle ='',labelStyle } = props;
  const router = useRouter();
  const form = useRef({});

  useEffect(()=>{
    const { type, ...ohters } = router?.params;
    const typeName ='详情';
    const newTitle = entireTitle || `${title}${typeName}`;
    Taro.setNavigationBarTitle({ title: newTitle });
    if(ohters && ohters['$taroTimestamp']){
      delete ohters['$taroTimestamp'];
    }
    // 编辑
    try{
      if(type === 'info' && requestInfoParams) {
        const {url,afterRequest, params={}, ...other} = requestInfoParams;
        url && request({
          method: "POST",
          url: url,
          data: {...params},
          // module:'cms-basic-api',
          ...other
        }).then(({data})=>{
          if(data){
            const datas = afterRequest ? afterRequest(data) : data;
            form.current.reset(datas)
          }
        })
      }
    }catch(err){
      console.log('err',err) 
    }

  }, [router?.params])

  /** addOrUpdate 表单提交 */ 
  // 取消
  const onCancel = ()=>{
    if(props.onCancel){
      props.onCancel && props.onCancel();
    }else{
      Taro.navigateBack(); // 返回上一层页面
    }
  }

   // 搜索暴露父组件的属性
   useImperativeHandle(ref, () => ({
    form: form.current
  }));

  return (
    <View className="edit-form-wrap" style={{backgroundColor:'#fff'}}>
      <Form 
        ref={form}
        readonly={true}
        bordered={false}
        labelStyle={labelStyle}
        initialValues={initialValues}
        fields={fields}
        watchList={watchList}
        // onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </View>
  );
});

export default Index;


