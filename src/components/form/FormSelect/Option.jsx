import React,{ useState,useEffect } from 'react';
import { Check } from '@nutui/icons-react-taro'
import { View, Text } from '@tarojs/components';
import './index.scss';

const Option = (props)=> {
  const {label, leftLabel, value, showValue, className, onSelect, ...restProps } = props;
  const [checked, setChecked] = useState(props.checked);
  const cls = [className, 'option-item', checked && 'option-item-checked' ].filter(Boolean).join(' ').trim();

  function handleOnClick() {
    setChecked(!checked);
    onSelect && onSelect(!checked);
  }
  useEffect(()=>{
    setChecked(props.checked)
  },[props.checked])

    return (
      <View className="option-wrap" { ...restProps}>
        <View onClick={handleOnClick} className={cls}>
          <Text className="text">{leftLabel}</Text>
          <Text className="text">{label}</Text>
          {showValue && <Text className="text">{value}</Text>}
          <View className="option-item-left">
          {checked && <Check name="checked" className="icon" width="16px" height="16px" size="16" />}
          </View>
        </View>
      </View>
    )
}

export default Option;