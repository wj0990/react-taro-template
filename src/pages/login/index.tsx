import React,{ useState } from 'react';
import Taro from '@tarojs/taro';
import { Text, View,Image } from '@tarojs/components';
import { login, register,getwxPhone, getUserInfo } from '@/service/businessProcess/common';
import { useRequest } from "@/components";
// import { useContextStore as useStoreCommon } from '@/store'
import Logo from '../../assets/images/Logo.png';
import './index.scss';
import WeAppy from './weappy';
import WebLogin from './web';



const Login = () => {
  const [isPwdLogin, setIsPwdLogin] = useState(false)
  // const LogoSvg =  `<svg t="1681291801803" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15008" width="200" height="200"><path d="M0 0m204.8 0l614.4 0q204.8 0 204.8 204.8l0 614.4q0 204.8-204.8 204.8l-614.4 0q-204.8 0-204.8-204.8l0-614.4q0-204.8 204.8-204.8Z" fill="#873997" p-id="15009"></path><path d="M819.2 0H534.272A756.224 756.224 0 0 0 0 483.584V819.2a204.8 204.8 0 0 0 204.8 204.8h614.4a204.8 204.8 0 0 0 204.8-204.8V204.8a204.8 204.8 0 0 0-204.8-204.8z" fill="#4DAFFF" p-id="15010"></path><path d="M819.2 0h-3.84a754.944 754.944 0 0 0-539.392 1024H819.2a204.8 204.8 0 0 0 204.8-204.8V204.8a204.8 204.8 0 0 0-204.8-204.8z" fill="#50A8FF" p-id="15011"></path><path d="M497.152 721.152A751.104 751.104 0 0 0 560.384 1024H819.2a204.8 204.8 0 0 0 204.8-204.8V204.8a204.8 204.8 0 0 0-89.088-168.96 754.688 754.688 0 0 0-437.76 685.312z" fill="#50A0FF" p-id="15012"></path><path d="M230.4 409.6a25.6 25.6 0 0 0 25.6-25.6v-128a25.6 25.6 0 0 1 25.6-25.6h128a25.6 25.6 0 0 0 0-51.2h-128a76.8 76.8 0 0 0-76.8 76.8v128a25.6 25.6 0 0 0 25.6 25.6zM742.4 179.2h-128a25.6 25.6 0 0 0 0 51.2h128a25.6 25.6 0 0 1 25.6 25.6v128a25.6 25.6 0 0 0 51.2 0v-128a76.8 76.8 0 0 0-76.8-76.8z" fill="#FFFFFF" p-id="15013"></path><path d="M409.6 793.6h-128a25.6 25.6 0 0 1-25.6-25.6v-128a25.6 25.6 0 0 0-51.2 0v128a76.8 76.8 0 0 0 76.8 76.8h128a25.6 25.6 0 0 0 0-51.2zM793.6 614.4a25.6 25.6 0 0 0-25.6 25.6v128a25.6 25.6 0 0 1-25.6 25.6h-128a25.6 25.6 0 0 0 0 51.2h128a76.8 76.8 0 0 0 76.8-76.8v-128a25.6 25.6 0 0 0-25.6-25.6z" fill="#E9F6FF" p-id="15014"></path><path d="M819.2 486.4H204.8a25.6 25.6 0 0 0 0 51.2h614.4a25.6 25.6 0 0 0 0-51.2z" fill="#FFFFFF" p-id="15015"></path></svg>`
  // const sysType = Taro.getEnv();
  // const { dispatch } = useStoreCommon()
  const { loading, run:getRegister, data } = useRequest(register,{
    onSuccess: (res) => {
      const dataList = res?.data || [];
      const list = [];
      dataList?.length > 0 && dataList.forEach((item)=>{
        list.push({
          key:item.code,
          code:item.code,
          name:item.name,
          value:item.code,
          label:item.name 
        });
      })
      return list;
    },
  });

  const { run: runGetwxPhone } = useRequest(getwxPhone,{
    onSuccess: (res) => {
      if (res && res?.code === 200 && res?.data) {
       Taro.setStorageSync('phone', res.data);
       return res;
      }
    },
    onError:(res)=>{
    }
  });

  // 登陆
  const onLogin = async(params)=>{
    Taro.showLoading();
    params.sysCode = "cmsMinApp"
    // params.clientType = "web" 
    // params.deriveSn = ""
    try {
      const { phoneData, ...rest } = params;
      await login(rest).then((response)=>{
        if(response && response.data){
          Taro.hideLoading();
          if (response && response?.code === 200 || response.data) {
              const { appId,cloudID, encryptedData,sysCode ,code } = params;
            Taro.setStorageSync('userToken', response.data.token);
            Taro.setStorageSync('userData',JSON.stringify(response.data));
            Taro.setStorageSync('save-token-time', `${new Date().getTime()}`);
            // 获取当前面栈
            // const pages = Taro.getCurrentPages();
            // //存在上一页
            // console.log('---pages-------->',pages)
            // if (pages?.length > 1) {
            //   Taro.navigateBack({
            //     success() {
            //       Taro.showToast({
            //         title: '登录成功！',
            //         icon: 'success',
            //         duration: 2000,
            //       });
            //     },
            //   });
            // } else {
            Taro.reLaunch({
              url: '/pages/home/index',
              success() {
                Taro.showToast({
                  title: '登录成功！',
                  icon: 'success',
                  duration: 2000,
                });
              },
              fail(err){
              }

            });
            // }
            rest.loginType ==='weapp' &&  runGetwxPhone({ ...phoneData, sysCode });
          }else{
            Taro.hideLoading();
            // 提示登录失败
            Taro.showToast({
              title: '登录失败！',
              icon: 'none',
              duration: 2000,
            });
          }
        }
      });
    } catch (err) {
      console.log(err)
      Taro.hideLoading();
    }
  }

  return (
    <View class="onLand-container">
      <View class="onLand-container-top">
        <Image  class="onLand-container-logo" src={Logo} />
      </View>
      <View style={{marginBottom:30,fontWeight:'bolder'}}>
        <Text className="onLand-app-name">智慧快递管家</Text>
      </View>
      <View className="onLand-container-button">
        { !isPwdLogin &&  <WebLogin onLogin={onLogin}  />} 
        { isPwdLogin && <WeAppy onLogin={onLogin} />}
      </View>
      <View style={{ textAlign: 'center', marginTop: 20 }}>
        <p className="onload-privacy" onClick={()=>{setIsPwdLogin(!isPwdLogin)}}>
          {isPwdLogin ? '授权登陆': '密码登陆'} 
        </p>
      </View>
    </View>
  );
};
export default Login;
