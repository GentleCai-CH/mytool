/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-09-08 23:24:14
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-09-14 05:15:16
 * @FilePath: \mytool\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,   // 忽略 eslint语法检查
  
  //vue-cli部署上线 配置
  assetsDir: 'static',
  parallel: false,
  publicPath: './',

  //
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    proxy: {
      ///api是后端数据接口的上下文路径
      '/api': {
          //这里的地址是后端数据接口的地址
          target: 'http://111.229.37.167/',
          //允许跨域
          changeOrigin: true,
      }
    }
  },
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true
   
})
