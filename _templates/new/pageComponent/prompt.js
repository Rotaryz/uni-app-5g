const appJson = require('../../../src/pages.json')
const MAIN_PACKAGE = 'main'
const choices = []
let sedPage = [] // 分包路径
let mainPAge = [] // 首页路径

appJson.pages.forEach((item) => {
  // item.path && sedPage.push({message: item.path, value: item.path})
  item.path && mainPAge.push('pages/'+ item.path)
})

if (appJson.subPackages && appJson.subPackages.length > 0) {
  appJson.subPackages.forEach((item) => {
    let path = item.root.slice(0, -1)
    const packageName = path.split('/')
    let pages = []
    item.pages.forEach((child) => {
      if (typeof child !== 'string') {
        pages.push(child.path)
      }
    })
    choices.push({message: packageName[packageName.length - 1], value: pages})
  })
}
choices.unshift({message: MAIN_PACKAGE, value: mainPAge})

module.exports = [
  {
    type: 'select',
    name: 'package',
    message: '请选择分包:',
    choices: choices,
    createPrompter(e, i) {
      console.log(e, i)
      // sedPage = res.map((item) => {
      //   return {message: item, value: item}
      // })
      // if (res.length) {
      //   console.log(res + ']')
      //   console.log(typeof res)
      // }
      // sedPage = res
      console.log(choices[0].message)
    }
  },
  // {
  //   type: 'select',
  //   name: 'package',
  //   message: '请选择文件夹:',
  //   choices: sedPage
  // }
]
