const config = {
  development: {
    '/api/manage/menu/list': 'http://127.0.0.1:9527', // dev
    '/api': 'http://127.0.0.1:9527', // pro
  },
  production: {
    '/api': 'http://127.0.0.1:9527', // pro
  },
};

/**转发地址*/
const proxy = (url: string) => {
  try {
    const ENV = process.env.NODE_ENV || '';
    const newURL = url.replace(/^\//, '');

    const apiConfig = config[ENV] || {};
    let host = '';
    const apiKeys = Object.keys(apiConfig);
    let lg = apiKeys.length;
    let i = 0;
    while (i < lg) {
      const newApi = apiKeys[i];
      const Rex = new RegExp(`^${newApi.replace(/^\//, '')}`);
      if (Rex.test(newURL)) {
        host = apiConfig[newApi];
        break;
      }
      i++;
    }
    return host.replace(/\/$/, '') + '/' + newURL;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default proxy;
