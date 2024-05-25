import React, { forwardRef, useState, useEffect } from 'react';
import { Input, View, Text } from '@tarojs/components';
import './index.scss';

const Index = forwardRef((props, ref) => {
  const { className,showCount=false, bordered=true, readonly=false,disabled, placeholder, onChange,addonBefore,addonAfter, ...others } = props;
  const{ maxLength=0 } = others;
  const cls = [
    'input-wrap',
    readonly && 'input-readOnly',
    bordered  ? 'input-bordered' : 'input-bordered-no', // 解决datepicker input 添加冗余参数
    addonAfter && 'input-addonAfter',
    showCount && 'input-showCount',
    className].filter(Boolean).join(' ').trim();
  const [val, setVal] = useState();
  const handelOnChange = (e)=>{
    const val = e?.detail?.value || e?.target?.value 
    // 添加参数解决form 无法触发onChange
    if(props.name && e.target){
      e.target.name  = props.name;
    }
    setVal(val);
    onChange && onChange(val, e)
  }

  const _renderAddonAfter  = ()=>{
    return(
    <View className="addon-after-wrap">
      {typeof(addonAfter) ==='function' ?  addonAfter(val): addonAfter }
    </View>)
  }

  useEffect(()=>{
    setVal(props.value) 
  },[props.value])

  return (
    <View className="input-box">
      {others?.type ==='password'? <Input
        ref={ref} // 将 ref 参数赋值到 Input 组件上
        className={cls}
        showCount={showCount}
        placeholder={readonly ? '': (placeholder || '请输入')}
        inputAlign="right"
        disabled={!!readonly || disabled}
        // readonly // 当前版本不生效
        onInput={handelOnChange}
        {...others}
        type="password"
        value={val}
      />
      :
      <>
       <Input
        ref={ref} // 将 ref 参数赋值到 Input 组件上
        className={cls}
        showCount={showCount}
        placeholder={readonly && !bordered ? '': (placeholder || '请输入')}
        inputAlign="right"
        disabled={!!readonly || disabled}
        // readonly // 当前版本不生效
        onInput={handelOnChange}
        // type="text"
        {...others}
        value={val}
      />
      </>
      }
      {showCount &&<Text className='input-count-text'>{`${(val?.length|| 0)}/${maxLength}`}</Text>}
      {addonAfter && _renderAddonAfter()}
    </View>
  );
})

export default Index;