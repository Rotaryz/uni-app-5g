const chalk = require('chalk')
const webpack = require('webpack')
const VERSION_NAME = 'version' // 版本
// console.log(process.argv)
// 处理自定义参数
function infoVersion(arr, type) {
  let value = ''
  arr.forEach((item) => {
    // 获取参数
    switch (type) {
      case VERSION_NAME:
        if (item.includes('--v')) value = item.slice(2)
        break
      default:
        value = ''
        break
    }
  })
  //  正式站打包必须带版本配置
  // if (process.env.VUE_APP_ENV === 'production' && !value) {
  //   console.log(chalk.red('正式环境必须打包版本，请检查后重新打包'))
  //   return false
  // }
  return value
}

let obj = {
  version: JSON.stringify(infoVersion(process.argv, VERSION_NAME)),
  platform: process.env.VUE_APP_PLATFORM,
  env: process.env.VUE_APP_ENV
}
console.log('环境配置', obj)

// 第三方插件
var definePlugin = new webpack.DefinePlugin({
  'VERSION': JSON.stringify(infoVersion(process.argv, VERSION_NAME))
})

module.exports = {
  configureWebpack: { // 第三方插件配置
    plugins: [
      definePlugin
    ]
  }
}
