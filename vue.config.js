const chalk = require('chalk')
const webpack = require('webpack')
const VERSION_NAME = 'version' // 版本
const defaultParam = {PLATFORM: "'mp-weixin'", VERSION: "''"} // 无传参是默认的参数
const path = require('path');//引入path模块

let param = infoVersion(process.argv)
param = isEmptyObject(param) ? defaultParam : param
let definePlugin = new webpack.DefinePlugin(param)
// 第三方插件全局注入参数

module.exports = {
  css: {
    loaderOptions: {
      // 给 stylus-loader 传递选项
      stylus: {
        import: [
          '~@/design/variable.styl',
          '~@/design/mixin.styl'
        ]
      }
    }
  },
  configureWebpack: { // 第三方插件配置
    plugins: [
      definePlugin
    ]
  },
  // 文件别名
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('@components', resolve('./src/components'))
      .set('@api', resolve('src/api'))
      .set('@design', resolve('src/design'))
      .set('@mixins', resolve('src/mixins'))
      .set('@page', resolve('src/page'))
      .set('@store', resolve('src/store'))
      .set('@utils', resolve('src/utils'))
    //set第一个参数：设置的别名，第二个参数：设置的路径

  }
}

// 处理自定义参数
function infoVersion(arr, type) {
  let value = {}
  arr.forEach((item) => {
    item = item.slice(2).split('=')
    if (item.length > 1) {
      let str = item[0] === VERSION_NAME ? '/' + item[1] : item[1]
      value[item[0].toUpperCase()] = JSON.stringify(str)
    }
  })
  return value
}

// 判断对象是否为空
function isEmptyObject(obj = {}) {
  for (let key in obj) {
    return false // 返回false，不为空对象
  }
  return true // 返回true，为空对象
}
// 设置路径
function resolve(dir){
  return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}

let obj = {
  version: param.VERSION || '',
  platform: param.PLATFORM,
  env: process.env.VUE_APP_ENV
}
console.log(chalk.yellow('环境配置'), chalk.yellow(JSON.stringify(obj)))