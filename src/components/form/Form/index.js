import React,{useEffect, createContext, useContext, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { Row, Col } from '@nutui/nutui-react-taro'
import { View, Button, Form as TaroForm } from '@tarojs/components';
import { yupResolver } from '@hookform/resolvers/yup';
import FormItem from '../Form/item';
import {generateValidationSchema } from '../util';
import './index.scss';

export const FormContext = createContext({});

// layout horizontal | vertical | inline
const Form = React.forwardRef((props, ref) => {
  // 获取初始化数据

  const {
    loading, 
    // 初始化自动提交
    autoSubmitFirst = true,
    // 仅查看表单
    readonly=false,
    // 显示边框
    bordered=true,
    isErrMsgStation= false, className, labelStyle, layout='line', submitBtnText = '提交', cancelBtnText='取消', fields,watchList ,onCancel ,initialValues={}, contentFooter } = props;
  const cls = ['taro-form',isErrMsgStation && 'taro-form-station', className, layout && `taro-form-${layout}`].filter(Boolean).join(' ').trim();
  const footerCls = ['footer-btn-wrap', onCancel && 'footer-btn-group'].filter(Boolean).join(' ').trim();
  const getInitialValues = ()=>{
    const initData = {};
    fields.forEach(item=>{
      const name = item.name;
      //initialValues里面有值取initialValue值否则取item.initialValue里的值
      if(initialValues[name]){
        initData[name] = initialValues[name];  
      } else {
        if(item.initialValue){
          initData[name] = item.initialValue;  
        }
      }
    })
    return initData;
  }
  
  const form = useForm({
    resolver: yupResolver(generateValidationSchema(fields)),
    defaultValues: getInitialValues(),
  });
  const {register, watch, handleSubmit, getValues, setValue,control, formState: { errors } } = form;
  const onSubmit = (prams)=> {
    //⚠️ 列表查询 滚动翻页会带数据过来暂时根据 pageIndex判断 后期再想办法优化
    // 直接赋予正常表单也有问题
    const initValue = prams.pageIndex ? prams :  prams?.detail?.value;
    autoSubmitFirst ? 
    handleSubmit((data)=>submit(data ,initValue))() : // 初次加载会执行
      handleSubmit((data)=>submit(data ,initValue))   
  };

  // 需要监听字段
  const watchFields = watchList && Object.keys(watchList).length >0  ? watch(Object.keys(watchList)) : undefined; 

  useEffect(() => {
    if(watchFields){
      Object.keys(watchList).forEach((field, i) => {
        const callback = watchList[field];
        const fieldValue = watchFields[i];
  
        // 调用回调函数，并传递当前字段的值、字段名和字段类型
        callback(fieldValue, field, form, { updateValue: (name, value) => setValue(name, value) });
      });
    }
  }, [watchFields]);

  useImperativeHandle(ref, () => {
    return {
      onSubmit,
      ...form
    };
  })
  // data表单返回数据 params传入参数
  const submit = (data={},params={})=>{
    const values = {...data, ...(params?.detail?.value || params)};
    props?.onSubmit && props?.onSubmit(values)
  }

  // const changeData = (data)=>{
  //   fields.forEach(item=>{
  //     if(data[item?.name]){
  //       setValue(`${item.name}`,data[item.name]) 
  //     }
  //   })
  // }
 
  return (
    <FormContext.Provider value={form}>
      <TaroForm className={cls} onSubmit={handleSubmit(submit)}>
        <Row>
          {fields.map((field) => {
            const { name, label, colProps } = field;
            let registerOption = {}
            // eslint-disable-next-line no-shadow
            let inputProps = {
              // name,
              // label,
              // type: field.type,
              readonly,
              bordered:bordered && !['radio','upload', 'audio'].includes(field?.type),
              getValues,
              control,
              setValue,
              labelStyle,
              ...field.fieldProps,
              ...field,
              placeholder: field?.fieldProps?.placeholder || field.placeholder || `请输入 ${label}` ,
              intialValue:field.initialValue || initialValues[name],
              // value: field.initialValue || initialValues[name], //不能加会重置值
              errorMsg:errors[name]?.message,
              // rules: field.rules

              // onChange: (e) => {
              // },
              // onBlur: () => {
              //   // 验证表单元素的值
              // },
              register,
              isErrMsgStation
            };
            if(field.type === 'upload'){
              registerOption.shouldUnregister = false // 禁止在点击上传按钮时取消注册验证规则
            }
            if (field.type === 'checkbox') {
              
              inputProps.value = field.value;
              // inputProps.onChange = (e) => {
              //   // 更新 Checkbox 的选中状态
              //   const { target: { checked } } = e;
              //   setValue(field.name, checked);
              // };
            }
            return (
              <Col key={name} {...colProps}>
                <View className="form-item-wrap">
                  <FormItem 
                    name={name}
                    {...inputProps}
                    inputProps={register(name)}
                    // changeData={changeData}
                  />
                </View>
              </Col>
            )}
          )}
        </Row>
        {!!contentFooter && (<View className="form-content-footer">{
          contentFooter
        }</View>)}

        <View className={footerCls}>
          {props?.onSubmit && <Button loading={loading} className="submit-btn" formType="submit" type="primary">{submitBtnText}</Button>}
          {onCancel && <Button loading={loading} className="submit-btn"   type="default" onClick={onCancel} >{cancelBtnText}</Button>}
        </View>
      </TaroForm>
    </FormContext.Provider>
  );
});

Form.useForm = () => {
  return useContext(FormContext);
};;

export default Form;