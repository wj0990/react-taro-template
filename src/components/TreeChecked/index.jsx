import React from 'react';
import { Checkbox,Text, Block } from '@tarojs/components';
import Tree from '../Tree';

export default function TreeChecked ({prefixCls ='treechecked', ...props}){
  const className = [prefixCls, props.className].filter(Boolean).join(' ').trim();
  const checkStrictly = true;
  const isSelected = false;
  const multiple = true;

  return(
    <Tree 
      renderTitle={(item, node)=>{
        const checkedProps = {};
        if(node.isHalfChecked){
          checkedProps.indeterminate = true;
        }
        if(node.selected){
          checkedProps.checked = true;
        }else{
          checkedProps.checked =false;
        }
        return(
          <Block>
            <Checkbox className={`${prefixCls}-checked`} disabled={node.disabled} {...checkedProps}>
            </Checkbox>
            {item.label && <Text className={node.disabledClass}>{item.label}</Text>}
          </Block>
        )
      }}
      {...props}
    />
  )

}