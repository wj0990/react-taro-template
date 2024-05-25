import React,{ useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import Taro,{ useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import Form from '@/components/form/Form';
import { useRequest, request } from '@/components';
import './index.scss';

const AddForm = forwardRef((props, ref) => {
  const { fields, watchList, requestInfoParams,contentFooter, onSubmitAfter, onSubmitBefore, submitPath, initialValues, title='',entireTitle ='',labelStyle } = props;
  const router = useRouter();
  const form = useRef({});
  
  useEffect(()=>{
    const { type, ...ohters } = router?.params;
    const typeName = type === 'edit'? '编辑': type === 'add'? '新增':'';
    const newTitle = entireTitle || `${typeName}${title}`;
    Taro.setNavigationBarTitle({ title: newTitle });
    if(ohters && ohters['$taroTimestamp']){
      delete ohters['$taroTimestamp'];
    }
    // 编辑
    try{
      if((type === 'edit') && requestInfoParams) {
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

  /** server提交 */ 
  const addForm = (params)=> {
    // Taro.navigateBack(); // 返回上一层页面
    // return;
    const newParams = {...params};
    return request({
      method: "POST",
      url: submitPath,
      data: newParams,
      // module:'cms-basic-api'
    })
  }

  /** addOrUpdate 表单提交 */ 
  // 表单提交
  const { loading, run } = useRequest(addForm, {
    onSuccess: (response) => {
      if(response.code ===1 || response.code ===200){
        // 提交完成回调
        if(onSubmitAfter){
          onSubmitAfter();
        }else{
          Taro.navigateBack(); // 返回上一层页面
        }
      }
    },
  });
  // 提交
  const onSubmit = async(data) => {
    let params = data;
    // 提交之前处理数据
    if(onSubmitBefore){
      params = await onSubmitBefore(params);
    }
    // 数据提交
    run(params);  
  };
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
        labelStyle={labelStyle}
        initialValues={initialValues}
        fields={fields}
        contentFooter={contentFooter}
        watchList={watchList}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </View>
  );
});

export default AddForm;


