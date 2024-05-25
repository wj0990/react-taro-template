import React, { useState } from 'react';
import { View,Picker,Text } from '@tarojs/components';
import Option from './Option';
import './index.scss';

const SelectOptions = (props)=> {
  const { 
    value,
    optionKeys =['value','label'],
    mode,
    showValue=false,
    title="请选择",
    options=[],
    onCancel,
    onConfirm
  } = props;
  const valueKey = optionKeys[0] || 'value';
  const labelKey = optionKeys[1] || 'label';
  
  const [checkedKeys, setCheckedKeys] = useState(props.checkedKeys || []);
  const onSelect = (bool, item)=>{
    let keys =[];
    if(bool){
      keys = mode ? [...checkedKeys, item[valueKey] ] : [item[valueKey]]
    }else{
      keys = mode ? checkedKeys.filter(v=>(v!==item[valueKey])) :[]
    }
    setCheckedKeys(keys);
    !mode && handleConfirm(keys)
  }
  const handleConfirm = (keys)=>{
    const items = [];
    const labels = [];
    const allCheckeys = keys || checkedKeys || [];
    options && options.length> 0 && options.forEach(item=>{
      if(allCheckeys.includes(item[valueKey])){
        items.push(item);
        labels.push(item[labelKey ||'label']);
      }
    })
    onConfirm && onConfirm({labels, items, checkedKeys: allCheckeys });
  }

  return (
    <View className="select-options">
      <View className="btns">
        {mode ?<View className="btns-cancel" onClick={onCancel}>取消</View>:<View></View>}
        <View className="title" onClick={onCancel}>{title}</View>
        {mode ? <View className="btns-confirm" onClick={()=>handleConfirm()}>确定</View> :<View></View>}
      </View>

      {options.map((item, index) => {
        const isChecked = checkedKeys.includes(item?.value);
        return(     
          <Option 
            checked={!!isChecked}
            key={index}
            value={item[valueKey]}
            label={item[labelKey]}
            showValue={showValue}
            onSelect={(bool)=>onSelect(bool, item, index)}
          />
        )
      }
       
      )}
    </View>
  );
}

export default SelectOptions;