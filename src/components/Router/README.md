页面跳转
===

支持 iOS/Android 应用，拦截 h5 页面跳转，开启新的 `webview` 页面预览模式，这里对 `Taro.navigateTo`、`Taro.redirectTo`、`Taro.navigateBack` 进行二次封装，API 使用保持与 `taro` 一致。

## 使用

```js
import { navigateTo, redirectTo, navigateBack } from 'taro-components';
```

## navigateTo

保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。

```js
import { navigateTo } from 'taro-components';

navigateTo({
  url: '/pages/member/index'
});
```

`API` 参考 [navigateTo](https://taro-docs.jd.com/docs/apis/route/navigateTo)


## redirectTo

关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。

```js
import { redirectTo } from 'taro-components';

redirectTo({
  url: '/pages/member/index'
});
```

`API` 参考 [redirectTo](https://taro-docs.jd.com/docs/apis/route/redirectTo)


## navigateBack

关闭当前页面，返回上一页面或多级页面。`在 app 只能返回上一页`

```js
import { navigateBack } from 'taro-components';

navigateBack();
```

`API` 参考 [navigateBack](https://taro-docs.jd.com/docs/apis/route/navigateBack)
