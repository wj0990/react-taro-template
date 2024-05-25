import type { UserConfigExport } from "@tarojs/cli";
export default {
  env:{
    NODE_ENV:"'development'"
  },
  plugins:[
    ['@tarojs/plugin-mock', {
      port: 9527
    }]
  ],
  // dev代理不生效
  proxy:{
    '/api/get/menu/list':{
       target:'http://127.0.0.1:9527/api',
       changeOrigin:true,
       pathWrite:{'^/api': ''}
    }
  },
  logger: {
    quiet: false,
    stats: true
  },
  mini: {},
  h5: {}
} satisfies UserConfigExport
