import React from 'react';
import { ScrollView } from '@tarojs/components';

const Scroll =(props) => {
  const { height, onScroll, scrollToLower, children } = props;

  function handleScrollToLower() {
    if (typeof scrollToLower === 'function') {
      scrollToLower();
    }
  }

  return (
    <ScrollView
      style={{ height }}
      scrollY
      scrollWithAnimation
      lowerThreshold={50}
      onScrollToLower={handleScrollToLower}
      onScroll={onScroll}
    >
      {children}
    </ScrollView>
  );
}

export default Scroll;