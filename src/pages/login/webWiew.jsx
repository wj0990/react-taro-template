import React from 'react';
import Taro, { useRouter } from '@tarojs/taro';
import { WebView } from '@tarojs/components';

function Browser() {
  const router = useRouter();
  const url = router.params.url; // 获取传递的链接参数
  const decodedUrl = url ? decodeURIComponent(url):''; // 解码URL

  return (
    <WebView src={decodedUrl} />
  );
}

export default Browser;