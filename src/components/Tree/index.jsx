import React, { useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import TreeNode from './TreeNode';
import './index.scss';

/**
 * a contains b
 * @param {Array} a
 * @param {Array} b
 */
const isContained = (a, b) => {
  if (!(a instanceof Array) || !(b instanceof Array)) return false;
  if (a.length < b.length) return false;
  const aStr = a.toString();
  for (let i = 0, len = b.length; i < len; i += 1) {
    if (aStr.indexOf(b[i]) === -1) return false;
  }
  return true;
};

export const getChildKeys = (
  childs = [],
  result = [],
  depth,
) => {
  childs.forEach((item) => {
    if (!item.hideNode) {
      result.push(item.key);
    }
    if (typeof depth === 'number' && !(depth - 1)) return;

    if (item.children && item.children.length > 0) {
      result = result.concat(getChildKeys(item.children, undefined, depth ? depth - 1 : undefined));
    }
  });
  return result;
};

const getParentKeys = (childs, result) => {
  if (childs.key) {
    result.push(childs.key);
  }
  if (childs.parent) {
    result = getParentKeys(childs.parent, result);
  }
  return result;
};

const getParentSelectKeys = (
  childs = {},
  selectedKeys = [],
  result = [],
) => {
  if (childs.key && childs.children && isContained(selectedKeys, getChildKeys(childs.children, undefined, 1))) {
    result.push(childs.key);
    if (childs.parent && !childs.parent.parent) {
      if (isContained(selectedKeys, getChildKeys(childs.children))) {
        selectedKeys = selectedKeys.concat(result);
      }
      if (isContained(selectedKeys, getChildKeys(childs.parent.children))) {
        result.push(childs.parent.key);
      }
    }
  }
  if (childs.parent) {
    result = getParentSelectKeys(childs.parent, selectedKeys, result);
  }
  return result;
};

export default function Tree(props) {
  const {
    prefixCls = 'w-tree',
    icon = 'caret-right',
    data = [],
    openKeys = [],
    selectedKeys = [],
    defaultExpandAll = false,
    showLine = false,
    iconAnimation = true,
    isSelected = true,
    checkStrictly = false,
    multiple = false,
    onExpand = ()=>{},
    onSelected = ()=>{},

    className,
    autoExpandParent = true,
    renderTitle,
    onChange,
    value,
    ...elementProps
  } = props;

  const [curOpenKeys, setCurOpenKeys] = useState(openKeys);
  const [curSelectedKeys, setCurSelectedKeys] = useState(value || selectedKeys);

  useEffect(() => {
    setCurSelectedKeys(props.value || props.selectedKeys || []);
  }, [JSON.stringify(props.selectedKeys), JSON.stringify(props.value)]);

  useEffect(() => {
    let arrOpenKeys = [...curOpenKeys];
    // 展开所有
    if (defaultExpandAll) {
      arrOpenKeys = getChildKeys(data);
    // 展开所有子集  
    } else if (autoExpandParent) {
      arrOpenKeys.push(...getChildKeys(data || [], undefined, 1));
    }
    setCurOpenKeys(arrOpenKeys);
  }, []);

  const cls = [className, prefixCls, showLine ? `${prefixCls}-line` : null].filter(Boolean).join(' ').trim();


  function onItemClick(item, evn) {
    if (!item.children) {
      return;
    }
    // const { onExpand } = this.props;
    // const { openKeys } = this.state;
    let currentKeys = [...(curOpenKeys)];
    
    const key = currentKeys.find((v) => v === item.key);
    // const cls = evn.currentTarget.className.replace(/(\s)open/g, '');
    let expanded = false;
    if (!key && item.key) {
      currentKeys.push(item.key);
      evn.currentTarget.className = [cls, 'open'].filter(Boolean).join(' ').trim();
      expanded = true;
    } else {
      currentKeys = currentKeys.filter((v) => v !== item.key);
      evn.currentTarget.className = cls;
    }
    setCurOpenKeys(currentKeys);
    onExpand && onExpand(item.key, expanded, item, evn);
  }

  function onItemSelected(item, evn) {
    // const { onSelected, multiple, checkStrictly } = this.props;
    let selKeys = [...(curSelectedKeys)];
    const findKey = selKeys.find((v) => v === item.key);
    let selected = false;
    if (!findKey && findKey !== 0) {
      selected = true;
      selKeys.push(item.key);
    } else {
      selKeys = selKeys.filter((v) => v !== item.key);
    }
    if (checkStrictly) {
      if (!findKey) {
        selKeys = selKeys.concat(getChildKeys(item.children).filter((val) => selKeys.indexOf(val) === -1));
        selKeys = selKeys.concat(getParentSelectKeys(item, selKeys));
        selKeys = Array.from(new Set(selKeys)); // Remove duplicates.
      } else {
        selKeys = selKeys.filter((val) => getChildKeys(item.children).indexOf(val) === -1);
        selKeys = selKeys.filter((val) => getParentKeys(item.parent).indexOf(val) === -1);
      }
    }
    if (!multiple) {
      selKeys = !findKey ? [item.key] : [];
    }
    setCurSelectedKeys(selKeys);
    onSelected && onSelected(selKeys, item.key, selected, item, evn);
    onChange?.(item.key, selKeys);
  }
  return (
    <View className={cls} {...elementProps}>
      <TreeNode
        {...{
          icon,
          iconAnimation,
          isSelected,
          openKeys: curOpenKeys,
          selectedKeys: curSelectedKeys,
          prefixCls,
          renderTitle,
        }}
        onItemClick={onItemClick}
        onItemSelected={onItemSelected}
        data={data}
        level={1}
      />
    </View>
  );


}