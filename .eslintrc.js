module.exports = {
 //此项是用来告诉eslint找当前配置文件不能往父级查找
  root: true,
  //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
  parser: 'babel-eslint',
  parserOptions: {
    "ecmaVersion": 6,
    //此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
    "sourceType": "module"
  },
  // required to lint *.vue files
  env: {
    browser: true,
    es6: true,
    node: true
  },
  'rules': {
    // 允许箭头函数不使用圆括号
    'arrow-parens': 0,
    // 开发模式允许使用console
    'no-console': 0,
    // debugger使用
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow async-await
    'generator-star-spacing': 0,
    'eol-last': 0,
    'space-before-function-paren': 0,
    // 不允许使用var变量
    'no-var': 2,
    // 不允许重复声明变量
    'no-redeclare': [2, {builtinGlobals: true}]
  },
  globals: {
    App: true,
    Page: true,
    wx: true,
    swan: true,
    tt: true,
    my: true,
    getApp: true,
    getPage: true,
    requirePlugin: true,
    getCurrentPages: true,
    uni: true,
    plus: true,
  }
}
