// eg::  npm run serve -- --v2 --dev --mp-weixin
// eg::  npm run serve -- --v2 --dev

// 统一输出打包命令
let concurrently = require('concurrently')
let arr = process.argv.filter((itm, idx) => idx > 1)

let env = 'development' // 不传参数默认为dev环境
let cmd = '' // 运行命令
let platform = ['mp-weixin'] // 默认打包平台参数
let concurrentlyArr = []
let str = arr.join(' ')

let platformCustom = []
arr.forEach((item) => {
  item = item.slice(2)
  let platArr = item.split('=')
  switch (platArr[0]) {
    // 处理环境命令
    case 'env':
      env = platArr[1].includes('prod') ? 'production' : 'development'
      cmd = !platArr[1].includes('dev') && !platArr[1].includes('prod') ? cmd = `--mode ${platArr[1]}` : ''
      break
    // 平台配置命令
    case 'platform':
      platformCustom = platArr[1].split(',')
    default:
      break
  }
})
// 自定义
if (platformCustom.length) {
  concurrentlyArr = platformCustom.map((child) => {
    return `cross-env NODE_ENV=${env} UNI_PLATFORM=${child} vue-cli-service ${cmd} uni-build --watch ${str}`
  })
}

concurrentlyArr = !concurrentlyArr.length ? platform.map((child) => { // 打包命令，默认打包四个平台
  return `cross-env NODE_ENV=${env} UNI_PLATFORM=${child} vue-cli-service ${cmd} uni-build --watch ${str}`
}) : concurrentlyArr

concurrently(concurrentlyArr)
