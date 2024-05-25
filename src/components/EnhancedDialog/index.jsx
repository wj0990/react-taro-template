import React from 'react';
import { Dialog } from '@nutui/nutui-react-taro';


const dialogRef = React.createRef();

const EnhancedDialog = {};

EnhancedDialog.confirm = ({ title, content, handleDel }) => {

  const showConfirmDialog = () => {
    dialogRef.current && dialogRef.current.show({
      title,
      content,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      onConfirm: handleDel,
    });
  };

  return showConfirmDialog;
};

const EnhancedDialogModule = () => {
  return <Dialog ref={dialogRef} />;
};

export { EnhancedDialog, EnhancedDialogModule };
