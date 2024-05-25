import React from "react";
import { View } from '@tarojs/components';
import { Tag } from '@nutui/nutui-react-taro';
import './index.scss';

const Tags = (props) => {
  const {labels =[],options, onDelete ,...resetProps} = props;

  const handleClose = (event, i)=>{
    onDelete && onDelete(event, i)
    event?.preventDefault();
    event.stopPropagation(); // 阻止事件冒泡
  }

  return (
    <View className="tags-wrap">
      {options && options.length >0 ? options.map((item,i)=>{
        const {label , ...other} = item;
        return(<Tag key={i} tyle={{ pointerEvents: 'none' }} onClose={(event)=>handleClose(event, i)} className="tag-item" type="primary"  {...{...other, ...resetProps}}>{label}</Tag>)
      }) : labels.map((label,i)=>{
        // 原来保留
        return(<Tag key={i} tyle={{ pointerEvents: 'none' }} onClose={(event)=>handleClose(event, i)} className="tag-item" type="primary"  {...resetProps}>{label}</Tag>)
      })}
    </View>
  )
}
export default Tags;