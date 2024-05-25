import React, { useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { Radio, Row, Col, Button } from '@nutui/nutui-react-taro';
import PopupPro from '@/components/PopupPro';
import CountdownBtn from '@/components/CountdownBtn';
import { kdfwxy } from '@/assets/text/message'; // 运输协议
// import { useContextStore as useStoreCommon } from '@/store'
import { termsText } from './termsText';
// import privacyText from './privacyText'; // 隐私政策
import './index.scss';
// import privacySvg from '@/assets/svg/privacy.svg'
// import taro from '@tarojs/taro-h5';

const TERMSTAUS = {
  CLOSE: 1,
  SHOW: 2,
  CONFIRM: 3,
};

const WeAppy = (props) => {
  // const { dispatch } = useStoreCommon()
  const onGetphonenumber = (event, termShow) => {
    if (termShow !== TERMSTAUS.CONFIRM) {
      termsShow(termShow);
      return;
    }
    try {
      const phoneData = event.detail || {};
      const detail ={
        phoneData
      };
      if (phoneData.errMsg === 'getPhoneNumber:ok') {
        Taro.login({
          success: async (res) => {
            if (res.code) {
              const accountInfo = Taro.getAccountInfoSync();
              detail.encryptedData = phoneData?.encryptedData;
              detail.code= res.code;
              detail.sysCode = "ims-web"
              detail.clientType = "web" 
              detail.deriveSn = ""
              detail.loginType = 'weapp'
              detail.jsCode = 'ims'
              props?.onLogin && props.onLogin(detail)
              // dispatch({
              //   type: 'global/login',
              //   payload: {
              //     phone: { ...detail },
              //     ...res,
              //   },
              // });
            } else {
              // eslint-disable-next-line no-console
              console.log('登录失败！' + res.errMsg);
              Taro.showToast({
                title: '登录失败！',
                icon: 'none',
                duration: 2000,
              });
            }
          },
        });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('err', err);
    }
  };

  const [termShow, setTermShow] = useState(TERMSTAUS.CLOSE);
  const [privacy, setPrivacy] = useState();
  const [radioVal, setRadioVal] = useState(false);

  const termsShow = (v) => {
    setTermShow(v === TERMSTAUS.CLOSE ? TERMSTAUS.SHOW : TERMSTAUS.CLOSE);
  };
  const privacyShow = (val) => {
    setRadioVal(true);
    setPrivacy(val);
  };

  const confirmClick = (e) => {
    if (!radioVal) {
      Taro.showToast({
        title: '请先阅读《隐私政策》和《运输政策》',
        icon: 'none',
        duration: 2000,
      });
      return false;
    }
    setTermShow(TERMSTAUS.CONFIRM);
    onGetphonenumber(e, TERMSTAUS.CONFIRM);
  };
  // 替换《》里的内容支持点击
  const replacedStr = (str) => {
    return str.split(/(《.*?》)/g).map((text, index) => {
      if (text.match(/《.*?》/)) {
        return (
          <Text
            key={index}
            className="clickable"
            onClick={() => {
              privacyShow(index === 1 ? 1 : 2); // 暂时数据不变直接写死
            }}
          >
            {text}
          </Text>
        );
      } else {
        return <Text key={index}>{text}</Text>;
      }
    });
  };

  // // 点击跳转
  // const handleLinkCopy = (url) => {
  //   Taro.setClipboardData({
  //     data: url,
  //     success: () => {
  //       Taro.showToast({
  //         title: '链接已复制',
  //         icon: 'success',
  //       });
  //     },
  //   });
  // };

  const handleLinkClick = (url) => {
    Taro.navigateTo({ url: `/pages/login/webWiew?url=${encodeURIComponent(url)}` });
  };


  // 转化html
  const convertStringToHTML = (str, i) => {
    const regex = /\[([^[\]]+)\]\(([^()]+)\)/;
    const matches = regex.exec(str);
    if(!matches){
      return(
        <p key={i} style={{ fontSize: 12 }}>{str}</p>
      )
    }else{
      const textBeforeLink = str.substring(0, matches.index);
      const linkText = matches[1];
      const url = matches[2];
      const textAfterLink = str.substring(matches.index + matches[0].length);
      return(
        <p  key={i}  style={{ fontSize: 12 }}>
          {textBeforeLink}{linkText}
          <a className="text-btn" style={{ fontSize: 12, wordBreak: 'break-all' }} onClick={() => handleLinkClick(url)}>{url}</a>
          {textAfterLink}
        </p>
      )
    }
  };

  // const goHome = () => {
  //   Taro?.switchTab({ url: '/pages/home/index' });
  // };

  return (
    <View className="btn-container">
      <View className="btn-container-btn">
        {termShow !== TERMSTAUS.CONFIRM ? (
          <Button
            block
            type="primary"
            onClick={() => {
              // if (!radioVal) {
              //   Taro.showToast({
              //     title: '请先阅读《隐私政策》',
              //     icon: 'none',
              //     duration: 2000,
              //   });
              //   return;
              // }
              termsShow(TERMSTAUS.CLOSE);
            }}
          >
            手机号授权
          </Button>
        ) : (
          <Button
            type="primary"
            block
            open-type="getPhoneNumber"
            onGetphonenumber={(e) => onGetphonenumber(e, TERMSTAUS.CONFIRM)}
          >
            手机号授权
          </Button>
        )}
        {/* <View style={{ textAlign: 'center', marginTop: 20 }}>
          <p className="onload-privacy" onClick={goHome}>
            前往体验
          </p>
        </View> */}
      </View>
      <PopupPro
        round
        style={{ height: 450 }}
        visible={termShow > TERMSTAUS.CLOSE}
        onClose={() => {
          // TERMSTAUS.SHOW
          setPrivacy(undefined);
          setRadioVal(false);
          setTermShow(termShow === TERMSTAUS.SHOW ? TERMSTAUS.CLOSE : termShow);
        }}
        //  onChange={(_, v) => confirmClick(v)}
        title="《智慧快递物流管家授权政策》"
        footer={
          <View className="nut-dialog__footer">
            <Button
              // size="small"
              // type="primary"
              className="nut-dialog__footer-ok"
              // onTap={onOk}
              // disabled={okBtnDisabled}
              onClick={(event) => {
                setTermShow(TERMSTAUS.CLOSE);
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              我拒绝
            </Button>
            <Button
              // size="small"
              // plain
              type="primary"
              // className="nut-dialog__footer-cancel"
              color="linear-gradient(to right, #4095E5, #4095E5)"
              open-type={!radioVal ? undefined : 'getPhoneNumber'}
              onGetphonenumber={confirmClick}
              onTap={() => {
                if (!radioVal) {
                  Taro.showToast({
                    title: '请先阅读《隐私政策》',
                    icon: 'none',
                    duration: 2000,
                  });
                  return false;
                }
              }}
            >
              我同意
            </Button>
          </View>
        }
        // footerButText="我同意"
        // footerButAttribute={{ 'open-type': "getPhoneNumber", onGetphonenumber: confirmClick }}
      >
        <Row
          type="flex"
          justify="space-between"
          style={{ flexDirection: 'column', height: '100%' }}
        >
          <Col style={{ paddingInline: 10 }}>
            <View style={{ padding: '0 10px' }}>
              {termsText.split('\n').map((item, index) => {
                if (index === 2) {
                  return (
                    <p style={{ fontSize: 12 }} key={index}>
                      {replacedStr(item)}
                    </p>
                  );
                } else {
                  return (
                    <p style={{ fontSize: 12 }} key={index}>
                      {item}
                    </p>
                  );
                }
              })}
              <View className="footer-radio-wrapper">
                <Radio
                  className="footer-radio"
                  onChange={() => {
                    setRadioVal(true);
                    // if (!radioVal) {
                    //   privacyShow();
                    // }
                  }}
                  checked={!!radioVal}
                  iconSize="20"
                />
                <View
                  className="footer-privacy"
                >
                  <Text>阅读并同意</Text>
                  <Text
                    className="text-btn"
                    onClick={() => {
                      privacyShow(1);
                    }}
                  >
                    《隐私政策》
                  </Text>
                </View>
              </View>
            </View>
          </Col>
          {/* <Col style={{ textAlign: 'center', color: '#EE7E31' }}>
            <p onClick={privacyShow} className="onload-privacy">《隐私政策》</p>
          </Col> */}
        </Row>
      </PopupPro>

      <PopupPro
        round
        style={{ height: '70%' }}
        closeOnClickOverlay={false}
        visible={!!privacy}
        onClose={() => {
          setPrivacy(undefined);
        }}
        onChange={() => setPrivacy(undefined)}
        title="《隐私政策》"
        footer={
          <CountdownBtn
            style={{ fontSize: 12 }}
            onClick={() => {
              setPrivacy(undefined);
            }}
          >
            我已阅读并知晓
          </CountdownBtn>
        }
      >
        {!!privacy && (
          <View style={{ paddingBottom: 50, paddingInline: 10 }}>
            {/* {(privacy === 1 ? privacyText : kdfwxy).split('\n').map((item, index) => { */}
            {(kdfwxy).map((item, index) => { // 暂时没有隐私协议
              return (
                convertStringToHTML(item, index)
              );
            })}
          </View>
        )}
      </PopupPro>
    </View>
  );
};
export default WeAppy;
