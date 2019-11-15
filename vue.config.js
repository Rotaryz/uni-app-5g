const chalk = require('chalk')
const webpack = require('webpack')
const VERSION_NAME = 'version' // 版本
let param = infoVersion(process.argv)
// console.log(chalk.red(process.argv))
// 第三方插件全局注入参数
var definePlugin = new webpack.DefinePlugin(param)

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

// 映射平台数据
function infoPlatform() {
//    platform: process.env.VUE_APP_PLATFORM,
  let value = process.env.VUE_APP_PLATFORM
  switch (process.env.VUE_APP_PLATFORM) {
    case 'mp-weixin':
      value = 'wx'
      break
    case 'mp-baidu':
      value = 'swan'
      break
    case 'mp-toutiao':
      value = 'tt'
      break
    default:
      break
  }
  return value
}

let obj = {
  version: param.VERSION || '',
  platform: process.env.VUE_APP_PLATFORM,
  env: process.env.VUE_APP_ENV
}
console.log(chalk.yellow('环境配置'), chalk.yellow(JSON.stringify(obj)))