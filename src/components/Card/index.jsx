import React from 'react';
import { View } from '@tarojs/components';
import './index.scss';

const  Card = (props)=>{
  const {title,leftContent, extra, titleClassName, className,footer, children, ...resetProps} =props
  const cls = ['card-wrap',className].filter(Boolean).join(' ').trim();
  const titCls = ['card-title',titleClassName].filter(Boolean).join(' ').trim();
  
  return (
    <View {...resetProps} className={cls}>
      {title && 
      <View className={titCls}>
        {leftContent && <View>{leftContent}</View>}
        <View>{title}</View>
        {extra && <View className="card-title-extra">
          {extra}
        </View>}
      </View>}
      {children && <View className="card-body">{children}</View>}
      {footer && <View className="card-footer">{footer}</View>}
    </View>
  )
}

export default Card;