import React,{useState, useEffect } from 'react';
import Taro,{ useRouter } from '@tarojs/taro';
import Form from '@/components/form/Form';
// import { Icon } from '@nutui/icons-react-taro'
import { Marshalling, Eye } from '@nutui/icons-react-taro'

import { View } from '@tarojs/components';
import { useContextStore as useStoreCommon } from '@/store'
import './index.scss';

const Add = (props) => {
  const { dispatch } = useStoreCommon();
  const [isEncryption, setIsEncryption] = useState(true);
  const getFields = () =>[
    { name: 'username', label: '登录账号', rules: [{ required:true, message: '请输入手机号码/登录工号' }] },
    { name: 'password', label: '登录密码', rules: [{ required:true, message: '请输入登录密码' }],
      fieldProps: { 
        type: isEncryption ? 'password': 'text',
        addonAfter:(val)=>{
          return(
            <view 
              style={{
                display:'flex',
                padding:'0 10px',
                alignItems:'center'
              }}
              onClick={()=>{setIsEncryption(!isEncryption)}}
            >
              {isEncryption ? <Marshalling size="12" width='12px' height='12px' /> :<Eye  size="12" />}
            </view>
          )
        }
      }
    },
  ];

  const onSubmit = (data) => {
    const params = {...data};
    // detail.sysCode = "ims-web"
    // detail.clientType = "web" 
    // detail.deriveSn = ""
    params.loginType = 'web'
    props?.onLogin && props.onLogin(params)
  };
  return (
    <View className="edit-wrap" {...props}>
      <Form fields={getFields()} onSubmit={onSubmit} submitBtnText="登陆" />
    </View>
  );
};

export default Add;


