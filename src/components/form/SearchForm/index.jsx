import React,{ forwardRef } from 'react';
import {  View } from '@tarojs/components';
import Form from '../Form';
import './index.scss';

const TaroForm = forwardRef((props, ref) => {
  const {
    loading,
    fields = [],
    initalValue = {},
    onSubmit,
    onReset,
    footer,
    header,
    // onValuesChange = () => {},
    // leftClassName = '',
    ...resetProps
  } = props;
  
  return (
    <View>
      {header}
      <Form 
        ref={ref}
        loading={loading}
        className="taro-form"
        submitBtnText="搜索"
        initalValue={initalValue}
        fields={fields}
        onSubmit={onSubmit}
        onReset={onReset}
        {...resetProps}
      />
      {footer}
    </View>
    
  );
});

export default TaroForm;
