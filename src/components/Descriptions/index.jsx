import React from 'react';
import { Text, View } from '@tarojs/components';
import './index.scss';

const Descriptions = (props) =>{
  const {title ='',extra, className, columns=[], column =1, data={} } = props;
  const cls = ['descriptions-wrap', `descriptions-column${column}`,className].filter(Boolean).join(' ').trim();
  // const clsItem = ['descriptions-item', column > 1 && `descriptions-column${column}` ].filter(Boolean).join(' ').trim();
  
  const renderItem = (item)=>{
    const { render } = item;
    if(render) {
      return (<View className="descriptions-value">
        {render(data[item.key], data)}
      </View>)
    }else{
      return(<Text className="descriptions-value">{data[item.key]}</Text>)
    }
  }

  return (
    <View className={cls}>
      <Text className="descriptions-title">{title}</Text>
      <View className={!extra ? 'descriptions-content': 'descriptions-content-extra'}>
        <View className="descriptions-item-list">
          {columns.map((item={}, i)=>{
            return(
              <View
                key={`descriptions-item-${i}`}
                className={`descriptions-item ${item?.isSingleLine ? 'single-line' : ''}`}
              >
                {item?.title &&<Text className="descriptions-label">{item.title}:</Text>}
                {item.key && renderItem(item,data)}
              </View>
            )
          })}
        </View>
        {extra &&<View>{extra}</View>}
      </View>
    </View>
  )
}

export default Descriptions;