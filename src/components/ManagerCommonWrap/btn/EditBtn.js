import React from 'react';
import { Button, Text } from '@tarojs/components';
import { IconFont } from '@nutui/icons-react-taro'
import editCustom from '../../../assets/icon/edit.svg';

const EditBtn = (props) => {
  const {className, onClick, ...resetProps } = props;
  const cls = ['link-button, button-wrap',className].filter(Boolean).join(' ').trim();

  return (
    <Button 
      type="link" 
      className={cls}
      onClick={onClick}
      {...resetProps}
    >
      <IconFont name={editCustom} className="button-scan-wrap" width="39px" height="39px" size="39" />
      {/* <Text>编辑</Text> */}
    </Button>
  );
};

export default EditBtn;