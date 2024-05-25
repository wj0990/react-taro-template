import Taro from '@tarojs/taro';

export const useOpenApi = () => {
  const authorize = (
    options: Taro.authorize.Option,
    options2: Taro.getSetting.Option,
  ): Promise<string | true> => {
    return new Promise((resolve, reject) => {
      Taro.getSetting({
        ...options2,
        success(res) {
          if (!res.authSetting[options.scope]) {
            Taro.authorize({
              ...options,
              success() {
                resolve(true);
              },
              fail(ress) {
                resolve(ress.errMsg);
              },
            });
          }
        },
        fail(res) {
          reject(res.errMsg);
        },
      });
    });
  };

  /** 调用接口获取登录凭证（code）*/
  const login = async (options: Taro.login.Option): Promise<string> => {
    return new Promise((resolve, reject) => {
      Taro.login({
        ...options,
        success(res) {
          if (res.code) {
            resolve(res.code);
          } else {
            reject(res.errMsg);
          }
        },
        fail(res) {
          reject(res.errMsg);
        },
      });
    });
  };

  /** 获取当前帐号信息 */
  const getAccountInfoSync = () => {
    const accountInfo = Taro.getAccountInfoSync();
    return {
      appId: accountInfo.miniProgram.appId,
      // pluginId: accountInfo.plugin.appId,
      // pluginVersion: accountInfo.plugin.version,
    };
  };

  /** 获取当前用户信息 */
  const getUserInfo = async (
    options: Taro.getUserInfo.Option,
  ): Promise<Taro.getUserInfo.SuccessCallbackResult | TaroGeneral.CallbackResult> => {
    return new Promise((resolve, reject) => {
      Taro.getUserInfo({
        ...options,
        success(res) {
          resolve(res);
        },
        fail(res) {
          reject(res);
        },
      });
    });
  };

  return {
    login,
    getAccountInfoSync,
    authorize,
    getUserInfo,
  };
};

// 获取网点坐标
export const useGetLocation = (): (() => Promise<string>) => {
  const getLocation = (option: Taro.getLocation.Option): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      Taro.getLocation({
        ...option,
        success(res) {
          if (res?.data) {
            resolve(res.data);
          } else {
            reject(undefined);
          }
        },
        fail(res) {
          reject(res);
        },
      });
    });
  };

  return getLocation;
};


/**支付*/
export const usePayment = () => {
  const requestPayment = (option: Taro.requestPayment.Option) => {
    return new Promise((resolve, reject) => {
      Taro.requestPayment({
        ...option,
        success(res) {
          resolve(res.errMsg);
        },
        fail(res) {
          reject(res.errMsg);
        },
      });
    });
  };

  return { requestPayment };
};

/** 获取系统详情 */
export const useGetSystemInfo = () => {
  const getSystemInfo = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      Taro.getSystemInfoAsync({
        success (res) {
          // console.log(res.model)
          // console.log(res.pixelRatio)
          // console.log(res.windowWidth)
          // console.log(res.windowHeight)
          // console.log(res.language)
          // console.log(res.version)
          // console.log(res.platform)
          if(res){
            resolve(res);
          }else{
            reject(undefined);

          }
        }
      });
    })
  };

  return { getSystemInfo } ;
};
