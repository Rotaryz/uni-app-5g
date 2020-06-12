let concurrently = require('concurrently')
let [a1 = ''] = process.argv.filter((itm, idx) => idx > 1)
let DEFAULT = ['mp-weixin', 'mp-alipay']
let cmd = DEFAULT.map((item) => {
  return `cross-env NODE_ENV=development UNI_PLATFORM=${item} vue-cli-service uni-build --watch ${a1}`
})
concurrently(cmd)