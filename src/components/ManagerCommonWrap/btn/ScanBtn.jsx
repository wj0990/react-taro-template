import React from 'react';
import { Button, Image } from '@tarojs/components';
import { IconFont } from '@nutui/icons-react-taro';
import { scan } from '../../../assets//svg/signin';
import { encodeBase64 }from '@/utils/common';
import './index.scss';

const Index = (props) => {
  const { className, onClick, ...resetProps } = props;
  const cls = ['button-scan-wrap', className].filter(Boolean).join(' ').trim();
  const imageData = `data:image/svg+xml;base64,${encodeBase64(scan)}`;

  const onClickBtn = async()=>{
    onClick();
    // return;
    // console.log('-----onClickBtnonClickBtnonClickBtnonClickBtn------->')
    // try{
    //   const res = await Trao.scanCode();
    //   console.log('扫描结果', res.result)
    //   onClick && onClick(res.result);
    // }catch(error){
    //   console.log('扫描失败')
    // }
  }

  return (
    <Button 
      className={cls}
      onClick={onClickBtn}
      {...resetProps}
    >
      <Image className="image" width={36} height={36} src={imageData} />
    </Button>
  );
};

export default Index;