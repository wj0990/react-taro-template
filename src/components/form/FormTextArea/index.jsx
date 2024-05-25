import React, { forwardRef, useState, useEffect } from 'react';
import { Textarea, View, Text } from '@tarojs/components';
import './index.scss';

const Index = forwardRef((props, ref) => {
  const { className,showCount=false, readonly=false,disabled, placeholder, onChange, ...others } = props;
  const{ maxLength=0 } = others;
  const cls = ['textarea-wrap',readonly && 'textarea-readOnly', showCount && 'textarea-showCount', className].filter(Boolean).join(' ').trim();
  const [val, setVal] = useState('');
  const handelOnChange = (e)=>{
    const val = e?.detail?.value || e?.target?.value 
    // 添加参数解决form 无法触发onChange
    if(props.name && e.target){
      e.target.name  = props.name;
    }
    setVal(val) 
    onChange && onChange(val, e)
  }
  useEffect(()=>{
    setVal(props.value) 
  },[props.value])
  return (
    <View className="textarea-box">
       <Textarea
        ref={ref} // 将 ref 参数赋值到 Input 组件上
        className={cls}
        showCount={showCount}
        placeholder={readonly ? '': (placeholder || '请输入')}
        inputAlign="right"
        disabled={!!readonly || disabled}
        // readonly // 当前版本不生效
        onInput={handelOnChange}
        autoHeight
        {...others}
        value={val}
    />
   {showCount && <Text className='input-count-text'>{`${(val?.length|| 0)}/${maxLength}`}</Text>}
    </View>
   
  );
})

export default Index;