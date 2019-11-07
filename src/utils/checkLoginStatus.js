import {
  check,//检验sessing是否过期 0未过期 1已过期
  getCode,
  getProvider
} from "@/pages/main/login/login.js"
import {login} from "@/api/login/login.js"
//用户缓存信息
const user = (uni.getStorageSync('user'));

//跳转至小程序登录页
const toLogin = () => {
  setTimeout(() => {
    uni.redirectTo({
      url: '/pages/login/login'
    });
  }, 2000)
}

//小程序登录态刷新
const loadLoginState = async function () {
  let provider = await getProvider() //获取服务商信息
  let code = await getCode(provider[0]) //获取code
  let param = {
    access3rdToken,
    code
  }

  let res = await login(param)
  if (res.resultCode !== '0000') {
    uni.showToast({
      icon: 'none',
      title: res.resultMessage,
      duration: 2000
    });
    return
  }
  console.log('刷新成功')
}

//判断登录状态
const checkLoginStatus = async function () {
  if (user) {
    // 检查 session_key 是否过期
    let status = await check()
    //已过期
    if (status === 1) {
      //小程序登录态刷新
      loadLoginState()
    } else {
      //未过期
      console.log('执行下一步操作')
    }
  } else {
    // 无skey，作为首次登录
    toLogin()
  }
}

export {
  checkLoginStatus, //判断登录状态
  toLogin, //跳转至小程序登录页
  loadLoginState //小程序登录态刷新
}
