import React, { useEffect, useState, forwardRef } from 'react';
import { View, Radio, RadioGroup, Label } from '@tarojs/components';
import './index.scss';

const RadioGroups = forwardRef((props) => {
  const { options = [],className, labelInValue, optionKeys =[],disabled = false, readonly } = props;
  const valueKey = optionKeys[0] || 'value';
  const labelKey = optionKeys[1] || 'label';
  const [val, setVal] = useState()
  const cls = ['radio-list-radio',readonly && 'radio-readonly', className].filter(Boolean).join(' ').trim();

  useEffect(() => {
    if(labelInValue){
      setVal(props?.value[valueKey])
    }else {
      setVal(props?.value)
    }
  }, [props.value]);

  const handleChange = (event) => {
    const value = event?.detail?.value;
    let data  = value;
    if(labelInValue){
      const option = options.find((item=>item?.value?.toString() ===value));
      data = option ? {[valueKey]:option.value, [labelKey]: option.label } : undefined;
    }
    setVal(value);
    props.onChange && props.onChange(data);
  };
  return (
    <View className="radio-wrap">
      <View className="radio-list">
        <RadioGroup 
          className="radio-group"
          onChange={(e)=>{
          handleChange(e)
          }}>
          {options?.map((item, i) => (
            <Label className="radio-list-label" for={i} key={i}>
              <Radio 
                disabled={disabled || readonly}
                className={cls}
                value={item.value}
                checked={(item?.value?.toString() === val?.toString())}
              >
                <View className="radio-text">{item.label}</View>
              </Radio>
            </Label>
          ))}
        </RadioGroup>
      </View>
    </View>
  );
});

export default RadioGroups;