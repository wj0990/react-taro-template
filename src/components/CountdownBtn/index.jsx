import React, { useState, useEffect } from 'react';
import { View, Button } from '@tarojs/components';

const CountdownBtn = (props) => {
  const { children, disabled, onClick, disabledTime = 6, className, ...rest } = props;
  const [countdown, setCountdown] = useState(disabledTime);

  useEffect(() => {
    let timer;
    if (countdown > 0 && !disabled) {
      timer = setTimeout(() => setCountdown((prevCountdown) => prevCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown, disabled]);

  const handleClick = () => {
    if (!disabled) {
      onClick && onClick();
    }
  };

  return (
    <View className={`card ${className}`}>
      <Button
        block
        type="primary"
        disabled={disabled || countdown > 0}
        onClick={handleClick}
        {...rest}
      >
        {(countdown > 0 ? `倒计时 ${countdown} 秒` : children) || '点击按钮'}
      </Button>
    </View>
  );
};

export default CountdownBtn;
