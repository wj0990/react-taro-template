import React, { useEffect, useState, forwardRef, uesMemo } from 'react';
import { View , Label } from '@tarojs/components';
import CheckBox from './CheckBox';
import './index.scss';

const CheckBoxGroups = forwardRef((props) => {
  const {value=[],labelInValue, options=[],onChange,className } = props;
  const [vals, setVal] = useState([])
  const cls = ['checkbox-group-wrap',className].filter(Boolean).join(' ').trim();

  useEffect(() => {
    if(value){
      if(labelInValue){
        value && options.find(item=>{ item.value === labelInValue.value });
        setVal(labelInValue.value)
      }else {
        setVal(props.value || [])
      }
    }
  }, [props.value]);

  const handleChange = (bool, i) => {
    let datas = [...vals];
    const newValue = options[i].value;
    if(bool){
      if(!datas.includes(newValue)){
        datas.push(newValue)
      }
    }else {
      datas= datas.filter((item)=>item !== newValue)
    } 
    setVal(datas);
    const changeDatas = options.filter((item)=>datas.includes(item.value))
    onChange &&  onChange(labelInValue ? changeDatas : changeDatas.map(item=>item.value) )
  };
  
  return (
    <View className={cls}>
      {options?.map((item, i) => (
        <Label className="checkbox-label" for={i} key={i}>
          <CheckBox 
            className="checkbox-item"
            checked={vals.includes(item.value)}
            onChange={(bool)=>handleChange(bool, i)}
          >
            {item.label}
          </CheckBox>
        </Label>
      ))}
    </View>
  );
});

export default CheckBoxGroups;