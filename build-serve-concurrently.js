// 统一输出打包命令
const concurrently = require('concurrently')
let arr = process.argv.filter((itm, idx) => idx > 1)

const ENV = ['--dev', '--release', '--prod']
let env = 'development' // 不传参数默认为dev环境
let version = '' // 不传参数默认为无版本
let cmd = '' // 运行命令
arr.forEach((item) => {
  if (ENV.includes(item)) {
    switch (item) {
      case '--dev':
        env = 'development'
        break
      case '--release':
        env = 'development'
        cmd = '--mode release'
        break
      case '--prod':
        env = 'production'
        break
      default :
        // 不传参数默认为dev环境
        env = 'development'
        break
    }
  }
  if (item.includes('--v')) version = item
})

concurrently([
  `cross-env NODE_ENV=${env} UNI_PLATFORM=mp-weixin vue-cli-service ${cmd} uni-build --watch ${version}`,
  `cross-env NODE_ENV=${env} UNI_PLATFORM=mp-toutiao vue-cli-service ${cmd} uni-build --watch ${version}`,
  `cross-env NODE_ENV=${env} UNI_PLATFORM=mp-baidu vue-cli-service ${cmd} uni-build --watch ${version}`,
  `cross-env NODE_ENV=${env} UNI_PLATFORM=h5 vue-cli-service ${cmd} uni-build --watch ${version}`
])
