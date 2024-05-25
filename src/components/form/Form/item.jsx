import React,{ useState, useEffect } from 'react';
import { View, Label, Switch,Text } from '@tarojs/components';
import { Controller } from "react-hook-form";
// import {  Uploader } from '@nutui/nutui-react-taro';
import FormInput  from '../../form/FormInput';
import FormSelect  from '../../form/FormSelect';
import SearchSite  from '../../SearchSite';
import SearchCar  from '../../SearchCar';
import RadioGroups from '../RadioGroups';
import CheckBoxGroups from '../CheckBoxGroups';
import RangeDatePicker from '../../RangeDatePicker';
import FormDatePicker from '../FormDatePicker';
import Textarea from '../FormTextArea';
import Upload from '../../Upload/index'
import './index.scss';
import dayjs from 'dayjs';

const FormItem = (props) => {
  const {className, isErrMsgStation, intialValue,control ,inputProps,leftClassName,rightRender,render, label, labelStyle={}, rules, type, errorMsg, /*onChange,*/ onBlur,/*fieldProps ,*/...otherProps } = props;
  const cls = [
    className,
    'taro-form-item',
    otherProps?.bordered && 'taro-form-item-bordered', // 是否显示边框
    (Array.isArray(rules) ? rules?.findIndex((item)=>!!item.required) >-1 : rules?.required) ? 'taro-form-item-required':'',
    isErrMsgStation && 'bottom-margin',
    errorMsg && !isErrMsgStation && 'taro-form-err-item',
  ].filter(Boolean).join(' ').trim();
  
 const labelCls = [
    'taro-form-item-left',
    leftClassName
  ].filter(Boolean).join(' ').trim();
  const [value, setValue] =useState(intialValue);
  // 初始化时set初始化值
  useEffect(()=>{
    setValue(intialValue)
  },[])

  useEffect(()=>{
    setValue(props.value)
    // props.setValue(props.name, props.value) // 这边会重置初始值暂时不能用
  },[props.value])

  const renderLabel = ()=>{
    return  React.isValidElement(label) ?
      <View style={labelStyle} className={labelCls}>{label}</View> :
      <Text style={labelStyle} className={labelCls}>{label}</Text>
  }

  const renderItem =()=> {
    let el;
    const { fieldProps } = props || {};
    const itemProps = Object.assign({},inputProps,fieldProps, otherProps,{value});
    if(render){
      el = React.cloneElement(render, { value:props?.value, onInput });
    }else{
      if(type === 'switch'){
        el = <Switch {...itemProps}  />
      }else if(type === 'select'){
        el =
        <Controller
          name={props.name}
          control={control}
          render={({ field }) => {
            return( 
              <FormSelect
                {...itemProps}
                value={field.value}
                onChange={(val) => field.onChange(val)}
              />
            )
          }
          }
        />
      }else if(type === 'searchSite'){
        el = 
        <Controller
          name={props.name}
          control={control}
          render={({ field }) => {
            return( 
              <SearchSite
                {...itemProps}
                value={field.value}
                onChange={(val) => {
                  field.onChange(val)
                }}
              />
            )
          }
          }
        />
      }else if(type === 'searchCar'){
        el = 
        <Controller
          name={props.name}
          control={control}
          render={({ field }) => {
            return( 
              <SearchCar
                {...itemProps}
                value={field.value}
                onChange={(val) => {
                  field.onChange(val)
                }}
              />
            )
          }
          }
        />

      }else if(type === 'selectSearch'){
        el = <FormSelect.Search {...itemProps} />
      }else if(type === 'audio' || type === 'radio'){
        el = 
        <Controller
          name={props.name}
          control={control}
          
          render={({ field }) => {
            return( 
              <RadioGroups
                {...itemProps}
                value={field.value}
                onChange={(val) => field.onChange(val)}
              />
            )
          }
          }
        />
      }else if(type === 'checkbox'){
        el = 
        <Controller
          name={props.name}
          control={control}
          render={({ field }) => {
            return( 
              <CheckBoxGroups
                {...itemProps}
                value={field.value}
                onChange={(val) => field.onChange(val)}
              />
            )}}
        />
      }else if(type === 'datePicker'){
        el = 
        <Controller
          name={props?.name?.toString()}
          control={control}
          // value={dayjs().format('YYYY-MM-DD')}
          render={({ field }) => {
            return( 
              <FormDatePicker
                {...itemProps}
                value={field.value}
                // value={dayjs().format('YYYY-MM-DD')}
                onChange={(val) => field.onChange(val)}
              />
            )
          }}
        />
      }else if(type === 'rangeDatePicker'){
        el = 
        <Controller
          name={props?.name?.toString()}
          control={control}
          render={({ field }) => {
            return( 
              <RangeDatePicker
                {...itemProps}
                value={dayjs().format('YYYY-MM-DD')}
                onChange={(val) => field.onChange(val)}
              />
            )
          }}
        />
      }else if(type === 'textarea'){
        el = 
        <Controller
          name={props?.name?.toString()}
          control={control}
          render={({ field }) => {
            return( 
              <Textarea
                {...itemProps}
                value={field.value}
                onChange={(val, e) => {
                  const newVal = val === '' ? undefined : val; // 解决input空值问题
                  field.onChange(newVal)
                  itemProps.onChange &&  itemProps.onChange(e)
                }}
              />
            )
          }}
        />
      }else if(type === 'upload'){
        props?.fieldProps?.title
        const title = errorMsg ? '' :  props?.fieldProps?.title;
        el = 
        <Controller
          name={props.name}
          control={control}
          
          render={({ field }) => {
            const name = itemProps.name;
            itemProps && delete itemProps.name;
            return( 
              <Upload
                {...itemProps}
                title={title}
                value={field.value}
                onChange={(val) =>{
                  const {fileIds,otherData } = val;
                  field.onChange(fileIds)
                  if(otherData){
                    const callbackData = itemProps.uploadAfter ? itemProps.uploadAfter(fileIds, otherData) : otherData;
                    callbackData && Object.keys(callbackData).forEach(keyName=>{
                      // 驾驶证正反面返回字段一样 直接写死判断
                      if(keyName === 'vehicleLicenseImage'){
                        props?.setValue(`${name}`, callbackData[keyName])

                      }else{
                        props?.setValue(`${keyName}`, callbackData[keyName])
                      }
                    })
                  }
                }} 
              />
            )
          }
          }
        />

      }else{
        el = 
        <Controller
          name={props?.name?.toString()}
          control={control}
          render={({ field }) => {
            return( 
              <FormInput
                {...itemProps}
                value={field.value}
                onChange={(val, e) => {
                  const newVal = val === '' ? undefined : val; // 解决input空值问题
                  field.onChange(newVal)
                  itemProps.onChange &&  itemProps.onChange(e)
                }}
              />
            )
          }}
        />
        }   
    }

    return( <View className={`taro-form-item-input taro-form-item-${type}`}>
      {el}
    </View>)
  }
  const rendeRrightItem = () => {
    if(typeof(rightRender) === 'function'){
      return(<View className="taro-form-item-right">{rightRender()}</View>)
    }else{
      reutrn(<View className="taro-form-item-right">{rightRender}</View>)
    }
  };

  return (
    <View className={cls}>
      <Label className="taro-form-item-label" custom-class="taro-form-item-label">
        {label && renderLabel()}
        {/* {label && <View className={labelCls}>{label}</View>} */}
        <View className="taro-form-item-content">
          {renderItem()}
          {errorMsg && <Text className="err-text">{errorMsg}</Text>}

        </View>
      </Label>
      {rightRender && rendeRrightItem()}
      {/* {rightRender && <View className="taro-form-item-right">{rightRender}</View>} */}
    </View>
  );
};
export default FormItem;
