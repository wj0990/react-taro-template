import Taro from '@tarojs/taro';

export const checkAuth = () => {
  const token = Taro.getStorageSync('userToken');
  const saveTokenTime = Taro.getStorageSync('save-token-time') || new Date().getTime();
  const newTime = new Date().getTime() - Number(saveTokenTime);
  if ((token && newTime > 86400000) || !token) {
    Taro.clearStorage();
    Taro.reLaunch({ url: '/pages/login/index' });
    return false;
  }
  return true;
};



/**路由跳转
 * 为了解决有可能存在的权限问题
 */
class Navigate {
  /**判断是否存在跳转权限*/
  checkAuth(url: string, callBack: () => Promise<TaroGeneral.CallbackResult>) {
    const result = checkAuth();
    if (result) {
      callBack();
    }
    return;
  }
  navigateTo(option: Taro.navigateTo.Option & { isAuth?: boolean }) {
    const { isAuth, ...rest } = option;
    const callBack = () => Taro.navigateTo(rest);
    if (isAuth) {
      return this.checkAuth(option.url, callBack);
    }
    return callBack();
  }
  reLaunch(option: Taro.reLaunch.Option & { isAuth?: boolean }) {
    const { isAuth, ...rest } = option;
    const callBack = () => Taro.reLaunch(rest);
    if (isAuth) return this.checkAuth(option.url, callBack);
    return callBack();
  }
  redirectTo(option: Taro.redirectTo.Option & { isAuth?: boolean }) {
    const { isAuth, ...rest } = option;
    const callBack = () => Taro.redirectTo(rest);
    if (isAuth) return this.checkAuth(option.url, callBack);
    return callBack();
  }
  switchTab(option: Taro.switchTab.Option & { isAuth?: boolean }) {
    const { isAuth, ...rest } = option;
    const callBack = () => Taro.switchTab(rest);
    if (isAuth) return this.checkAuth(option.url, callBack);
    return callBack();
  }
  navigateBack(option?: Taro.navigateBack.Option | undefined) {
    return Taro.navigateBack(option);
  }
}
export default new Navigate();
