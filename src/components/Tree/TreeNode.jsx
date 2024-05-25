import React, { useMemo, useCallback } from 'react';
import { IconFont } from '@nutui/icons-react-taro'
import { View, Text } from '@tarojs/components';
import LeftIcon from './LeftIcon';
// import '@nutui/nutui-react-taro/dist/esm/Icon/style';
import {  getChildKeys } from './';


export default function TreeNode(props){
  const {prefixCls, renderTitle, icon, iconAnimation, isSelected, openKeys, selectedKeys=[], data, level, parent, onItemClick, onItemSelected, ...other } = props;
  let isOpen = false;
  const node = React.useRef(null);
  if (parent && (parent.key || parent.key === 0)) {
    isOpen = !!(openKeys && openKeys.indexOf(parent.key) > -1);
  }

  const onExit = useCallback(() => {
    node.current.style.height = `${node.current.scrollHeight}px`;
  }, []);
  const onExiting = useCallback(() => {
    node.current.style.height = '1px';
  }, []);
  const onEnter = useCallback(() => {
    node.current.style.height = '1px';
  }, []);
  const onEntering = useCallback(() => {
    node.current.style.height = `${node.current.scrollHeight}px`;
  }, []);
  const onEntered = useCallback(() => {
    node.current.style.height = 'initial';
  }, []);


  const Label = ({label, className }) =>{
    return(<View className={className}>{label}</View>)
  }
  return(
    <View
      className={[
        level !== 1 && isOpen ? [`${prefixCls}-open`] : null,
        level !== 1 && !isOpen ? [`${prefixCls}-close`] : null,
        `${prefixCls}-ul`
      ].filter(Boolean).join(' ').trim()}
    >
      {data && data.length > 0 && data.map((item, idx)=>{
        // item.parent= parent;
        const selected = !!(selectedKeys && selectedKeys.indexOf(item.key) > -1);
        const noChild = !item.children;
        const itemIsOpen = openKeys && openKeys.indexOf(item.key) > -1 && !!item.children;
        const iconItem =
          typeof icon === 'function'
            ? icon(item, {
              isOpen: !!itemIsOpen,
              noChild,
              openKeys,
              selectedKeys,
            })
            : icon;
        const childKeys = noChild ? [] : getChildKeys(item.children);
        const checkedKeys = checkedKeys && checkedKeys.length > 0  ? selectedKeys.filter((key) => childKeys.indexOf(key) > -1) : [];
        const isHalfChecked = checkedKeys.length > 0 && childKeys.length !== checkedKeys.length;
        const disabledObj = {
          onClick: onItemSelected,
          disabled: null,
          disabledMouse: null,
          disabledClass: undefined,
          disabledStyle: undefined,
        };
        if (item.disabled) {
          disabledObj.onClick = undefined;
          disabledObj.disabled = 'disabled';
          disabledObj.disabledMouse = `${prefixCls}-disabled-mouse`;
          disabledObj.disabledClass = `${prefixCls}-disabled-ele`;
          disabledObj.disabledStyle = { color: '#00000040' };
        }
        return(
          <View className={`${prefixCls}-li`} key={idx} style={{ display: item.hideNode ? 'none' : 'block' }}>
            <View className={`${prefixCls}-label`}>
              <View
                style={{ display: noChild ? 'none' : 'auto' }}
                className={`${prefixCls}-switcher`}
                onClick={(evn) => onItemClick(item, evn)}
              >
                <LeftIcon 
                  name="triangle-down"
                  // label={}
                  // name={iconItem ? iconItem : 'triangle-down'}
                  size="12" 
                  isOpen={isOpen}
                  // className={[
                  //   typeof icon === 'function' ? `${prefixCls}-switcher-noop` : null,
                  //   noChild ? 'no-child' : null,
                  //   !iconAnimation ? 'no-animation' : null,
                  //   itemIsOpen ? 'open' : null,
                  // ].filter(Boolean).join(' ').trim()}
                />


                {/* <IconFont
                  name={iconItem || 'triangle-up'}
                  className={[
                    typeof icon === 'function' ? `${prefixCls}-switcher-noop` : null,
                    noChild ? 'no-child' : null,
                    !iconAnimation ? 'no-animation' : null,
                    itemIsOpen ? 'open' : null,
                  ].filter(Boolean).join(' ').trim()}
                /> */}
              </View>
              <View
                className={[ `${prefixCls}-title`,selected && isSelected ? 'selected' : null,disabledObj.disabled,disabledObj.disabledMouse]
                  .filter(Boolean)
                  .join(' ')
                  .trim()}
                onClick={(evn) => disabledObj.onClick?.(item, evn)}
              >
                
                {renderTitle ? renderTitle(item, {
                  selected,
                  noChild,
                  openKeys,
                  isHalfChecked,
                  selectedKeys,
                  disabled: item.disabled,
                  disabledClass: disabledObj.disabledClass,
                  disabledStyle: disabledObj.disabledStyle,
                }
                ) : (
                  <Label label={item.label} className={disabledObj.disabledClass} />
                )}
              </View>
            </View>
            {item.children && (
              <TreeNode
                {...other}
                {...{
                  prefixCls,
                  icon,
                  iconAnimation,
                  isSelected,
                  openKeys,
                  selectedKeys,
                  onItemClick,
                  onItemSelected,
                  renderTitle,
                }}
                prefixCls={prefixCls}
                data={item.children}
                level={level + 1}
                parent={item}
              />
            )}
          </View>
        )
      })}
    </View>
  )

}