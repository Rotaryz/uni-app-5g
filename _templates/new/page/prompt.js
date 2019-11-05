const appJson = require('../../../src/pages.json')
const MAIN_PACKAGE = 'main'
const choices = []
let pageName = []
// 存在分包时
if (appJson.subPackages && appJson.subPackages.length > 0) {
  appJson.subPackages.forEach((item) => {
    const packageName = item.root.replace(/\//g, '')
    item.pages.unshift('' + packageName)
    choices.push({message: packageName, value: item.pages})
  })
}
appJson.pages.forEach((item) => {
  item.path && pageName.push(item.path)
})

pageName.unshift(MAIN_PACKAGE)
// 首个插入main包
choices.unshift({message: MAIN_PACKAGE, value: pageName})
module.exports = [
  {
    type: 'select',
    name: 'package',
    message: '请选择包名',
    choices,
  },
  {
    type: 'input',
    name: 'name',
    message: '文件名:',
    validate(value) {
      if (!value.length) {
        return '文件名不能为空！'
      }
      return true
    }
  },
  {
    type: 'input',
    name: 'title',
    message: '标题:',
    validate(value) {
      if (!value.length) {
        return '页面标题不能为空！'
      }
      return true
    }
  }
]
