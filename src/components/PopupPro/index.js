import { Button, Popup } from '@nutui/nutui-react-taro';
import React, { useState, useEffect } from 'react';
import SlidingContent from '../SlidingContent';
import './index.scss'

function PopupPro(props = {}) {
  const { onChange, title, bodyStyle, style,header=true, footer, footerButText, footerButAttribute, ...other } = props;
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(props.visible);
  }, [props.visible]);

  const onClose = (v) => {
    setShow(false);
    props.onChange?.(false, v);
    props.onClose?.(false, v);
  };

  return (
    <Popup
      round
      style={{ height: '70%', ...style }}
      {...other}
      visible={show}
      // className={[style]}
      position="bottom"
      onClose={onClose}
    >
      <SlidingContent>
        {header && (header &&header!==true ? header : <SlidingContent.Header className="popup-pro-title">{header }</SlidingContent.Header>)}
        <SlidingContent.Body isBoxshow style={bodyStyle}>
          {props.children}
        </SlidingContent.Body>
        {footer &&<SlidingContent.Footer>
          {footer || (
            <Button onClick={footerButAttribute?.onGetphonenumber ? undefined : () => onClose(true)} {...footerButAttribute} type="primary" style={{ width: 150 }}>
              {footerButText || '确认'}
            </Button>
          )}
        </SlidingContent.Footer>}
      </SlidingContent>
    </Popup>
  );
}

export default PopupPro;
