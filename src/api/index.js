// 将所有的接口请求都通过这个统一输出
const requireApiModules = require.context(
  '.',
  false,
  // /\.\/([\w-][^index])+\.js$/
  /^((?!index).)*\.js$/
)
console.log(requireApiModules)
