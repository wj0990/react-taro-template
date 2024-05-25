import React, { useState, forwardRef } from 'react';
import { Checkbox } from '@tarojs/components';
import './index.scss';

const CheckBoxGroups = forwardRef((props) => {
  const { className, onChange, children , ...resetProps } = props;
  const [checked, setChecked] = useState(false);

  const cls = ['checkbox-wrap',className].filter(Boolean).join(' ').trim();

  const handleCheckboxClick = () => {
    setChecked(!checked);
    onChange && onChange(!checked)
  };
 
  return (
    
    <Checkbox 
      className={cls}
      checked={checked}
      onClick={handleCheckboxClick}
      {...resetProps}
    >
      {children}
    </Checkbox>
  );
});

export default CheckBoxGroups;