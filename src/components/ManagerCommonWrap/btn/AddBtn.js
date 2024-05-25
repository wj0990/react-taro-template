import React from 'react';
import { Button } from '@tarojs/components';
import { IconFont } from '@nutui/icons-react-taro';
import addCustom from '../../../assets/icon/add.svg';
import './index.scss';

const AddBtn = (props) => {
  const { className, onClick, ...resetProps } = props;
  const cls = ['button-add-wrap', className].filter(Boolean).join(' ').trim();

  return (
    <Button 
      className={cls}
      onClick={onClick}
      {...resetProps}
    >
      <IconFont name={addCustom} className="icon" size="35" />
    </Button>
  );
};

export default AddBtn;