import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, ButtonProps } from '@nutui/nutui-react-taro';

interface CountDownProps extends ButtonProps {}

const CountDown = (props: CountDownProps) => {
  const { onTap, children } = props;
  const timer = useRef<NodeJS.Timeout>();
  const [count, setCount] = useState<number | undefined>(undefined);

  useMemo(() => {
    clearTimeout(timer.current);
    if (count === undefined) return;
    timer.current = setTimeout(() => {
      const next = (count || 0) - 1;
      if (next < 0) {
        setCount(undefined);
      } else {
        setCount(next);
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const onClick = (event) => {
    if (typeof count === 'number') {
      return;
    }
    setCount(59);
    if (onTap) {
      onTap(event);
    }
  };

  return (
    <Button {...props} disabled={typeof count === 'number'} onTap={onClick}>
      {typeof count === 'number' ? `${count}s` : children}
    </Button>
  );
};

export default CountDown;
