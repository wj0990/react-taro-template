import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs'
import { View } from '@tarojs/components';
import { DatePicker } from '@nutui/nutui-react-taro';
import FormInput from '../FormInput';
import './index.scss';

function FormDatePicker(props) {
  const { value,disabled, readonly, placeholder='',title="请选择", onChange, format='YYYY-MM-DD HH:mm:ss', ...resetProps } = props;
  const [val, setVal]= useState();
  const [modelVal, setModelVal]= useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if(!value || !dayjs(value).isValid()) return;
    const newDate = new Date(value);
    const newval =  dayjs(newDate).format(format);
    setModelVal(newDate);
    setVal(newval);

  }, [JSON.stringify(props.value)]);
  // 验证时间区间
  // const verifyInterval=(start, end)=>{
  //   return new Date(end) < new Date(end)
  // }

  //改变时间
  const handleEndDateChange = (values,options) => {
    let dateStr = '';
    // if(values && Array.isArray(values)){
    //   dateStr = values.map(item=>item.value).join('-');
    // }
    // 暂时只考虑到存在年月
    const regex = /^YYYY-MM/;
    //存在年月
    if(regex.test(format)){
      options[1] = Number(options[1]) -1; // 月份减去1
    }
    const date = new Date(...options)
    if(dayjs(date).isValid()){
      const newDate =  dayjs(date).format(format);
      setVal(newDate);
      onChange && onChange(newDate);
      setVisible(false)
    }
  }
  // 
  // const getRandomValues = (type) =>{
  //   let val = '';
  //   if(type === 'start' && start){
  //     val = new Date(start);
  //   }else{
  //     val =  new Date(end);
  //   }
  //   return val;
  // }
  return (
    <View className="date-picker-container">
      <FormInput
        readonly
        bordered={true}
        onClick={()=>(!disabled&& !readonly) && setVisible(true)}
        placeholder={placeholder || "请选择日期"}
        value={val}
      />
      {/* <Cell title="" desc={val || placeholder} onClick={()=>setVisible(true)} /> */}
      <DatePicker
        title={title}
        value={new Date(val)}
        visible={visible}
        type="datetime"
        onClose={() => setVisible(false)}
        onConfirm={(values,options) => handleEndDateChange(values,options)}
        {...resetProps}
      />
    </View>
  );
}

export default FormDatePicker;