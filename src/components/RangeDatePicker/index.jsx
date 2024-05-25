import React, { useEffect, useState, forwardRef } from 'react';
import dayjs from 'dayjs'
import { View, Block } from '@tarojs/components';
import { DatePicker, Cell } from '@nutui/nutui-react-taro';
import Tags from '../Tags';
import './index.scss';

function RangeDatePicker(props) {
  const { 
    showCheckBtns,
    value = {},
    title = [],
    format = 'YYYY-MM-DD HH:mm:ss',
    placeholder=['开始时间','结束时间'],
    onChange,
    ...pickerProps 
  } = props;
  const [start, setSart] = useState('');
  const [end, setEnd] = useState('');
  const [showKey, setShowKey] = useState()
  const tagsOptions = [
    { label: '日 (Day)', value: 'day', color: "##4095E5" },
    { label: '周 (WeeK)', value: 'week', color: "#54BCBD" },
    { label: '月 (Month)', value: 'mouth', color: "#FCCA00" },
    // {label: '更多', value: 'more', color:"#9A9A9A"},
  ];

  useEffect(() => {
    if (props?.name) {
      // 暂时固定值
      const [startKey, endKey] = props.name.split(' '); // 
      if (!startKey || !endKey) return;
      if (value[0]) {
        setSart(value[0])
      }
      if (value[1]) {
        setEnd(value[1])
      }
    }

    // if(value.start){
    //   setSart(value.start)
    // }
    // if(value.end){
    //   setEnd(value.end)
    // }
  }, [JSON.stringify(props.value)]);
  // 验证时间区间
  const verifyInterval = (start, end) => {
    return new Date(end) < new Date(end)
  }

  //改变时间
  const handleEndDateChange = (values, options, type) => {
    // const dateStr = values.join(' ');
    const date = new Date(...options)
    if (dayjs(date).isValid()) {
      const newDate = dayjs(date).format(format);
      if (type === 'start') {
        setSart(newDate);
        if (!end) {
          return;
        } else {
          if (!verifyInterval) {
            return;
          }
        }
      } else {
        setEnd(newDate);
        if (!start) {
          return;
        }
      }
      onChange && onChange({
        start,
        end,
      });
    }
  }
  // 
  const getRandomValues = (type) => {
    let val = '';
    if (type === 'start' && start) {
      val = new Date(start);
    } else {
      val = new Date(end);
    }
    return val;
  }
  const getPlaceholder = (i) =>{
    let str = '';
    if(placeholder){
      str = typeof(placeholder) === 'string' ? str : placeholder[i];
    }
    return str;
  }

  // const Tags = (props) => {
  //   const {labels =[] ,onDelete ,...ohters} = props;


  return (
    <View className="range-date-picker-container">
      {showCheckBtns && <View className="range-date-picker-header" >
        <Tags className="tags" options={tagsOptions} />
      </View>}
      <View className="ange-date-pickerinput-content">
        {['start', 'end'].map((item, i) => {
          return (
            <Block key={i}>
              <Cell className="range-date-picker-cell" title="" description={item === 'start' ? start : end} onClick={() => setShowKey(i)} />
              <DatePicker
                value={getRandomValues(item)}
                className={`range-date-picker-${item}`}
                // title="日期时间选择"
                // minDate={minDate}
                // maxDate={maxDate}
                visible={i === showKey}
                type="datetime"
                onClose={() => setShowKey('')}
                onConfirm={(values, options) => handleEndDateChange(values, options, item)}
                {...pickerProps}
                title={getPlaceholder(i) || '日期时间选择'} // 不生效稍后处理
                placeholder={getPlaceholder(i) || '日期时间选择'}

              />
            </Block>
          )
        })}
      </View>

      {/* <Cell title="" desc={desc3} onClick={() => setShow3(true)} />
      <DatePicker
        className="range-date-picker-left"
        title="日期时间选择"
        // minDate={minDate}
        // maxDate={maxDate}
        visible={show3}
        type="datetime"
        onCloseDatePicker={() => setShow3(false)}
        onConfirmDatePicker={(values,options) => confirm3(values,options)}
      />
      <Cell title="" desc={desc3} onClick={() => setShow3(true)} />
      <DatePicker
        className="range-date-picker-right"
        title="日期时间选择"
        // minDate={minDate}
        // maxDate={maxDate}
        visible={show3}
        type="datetime"
        onCloseDatePicker={() => setShow3(false)}
        onConfirmDatePicker={(values,options) => confirm3(values,options)}
      /> */}
    </View>
  );
}

export default RangeDatePicker;