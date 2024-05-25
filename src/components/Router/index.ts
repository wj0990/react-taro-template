import Taro, {
  navigateTo as TaronavigateTo,
  redirectTo as TaroredirectTo,
  navigateBack as TaronavigateBack
} from '@tarojs/taro';

declare const window: any;

export interface NavigateToProps extends Taro.navigateTo.Option {}
export interface RedirectToProps extends Taro.redirectTo.Option {}
export interface NavigateBackProps extends Taro.navigateBack.Option {}

const replaceUrl = (url: string) => {
  const exp = new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/);
  const isHttp = exp.test(url);
  if (isHttp) {
    return url
  }
  let newUrl = '/#/' + url;
  return window.location.origin + newUrl.replace(/\/+/g, '/');
}

export const navigateTo = ({ url, ...other }: NavigateToProps) => {
  return TaronavigateTo({
    url: url,
    ...other
  })
}

export const redirectTo = ({ url, ...other }: RedirectToProps) => {
  return TaroredirectTo({
    url: url,
    ...other
  })
}

export const navigateBack = (props?: NavigateBackProps) => {
  const { delta, ...other } = props || {};
  return TaronavigateBack({
    delta,
    ...other
  })
}