import { globalComputed } from '@/state/helpers'

export default {
  computed: {
    ...globalComputed
  },
  onLoad(options) {
  },
  methods: {
    // 获取缓存
    $storage(key, val) {
      if (val) uni.setStorageSync(key, val)
      else return uni.getStorageSync(key)
    },
    // button收集手机formId
    async $getFormId(e) {
      const token = this.$storage('token')
      if (!token) {
        return
      }
      let formId = e.uni.detail.formId
      this.$API.Login.getFormId({ data: { form_ids: [formId] }})
    },
    // 授权登录
    async  _login(code,e){
      let data = { code: code }
      if (e) {
        this.e = e
        data = {
          ...data,
          encrypted_data: e.detail.encryptedData,
          iv: e.detail.iv
        }
      }
      let res = await this.$API.Login.getToken({
        data,
        loading: false,
        toast: false,
      })
      if (res.error_code !== this.$ERR_OK) return res
      this.$storage('token', res.data.access_token)
      this.$storage('userInfo', res.data.customer_info)
    },
    // 判断是否需要跳转登录页面
    async $checkToken() {
      let that = this
      let url = this.$getUrl()
      /* eslint-disable no-undef */
      let token = this.$storage('token')
      if (!token) {
        let codeMsg = await wechat.login()
        let tokenJson = await API.Login.getToken({
          data: { code: codeMsg.code },
          loading: false,
          toast: false,
          doctor() {
            wx.reLaunch({ url: that.$routes.other.LOGIN })
            this.$storage('targetPage', url)
            return false
          }
        })
        if (!tokenJson.data.customer_info.is_register) {
          wx.reLaunch({ url: this.$routes.other.LOGIN })
          return false
        }
        wx.setStorageSync('token', tokenJson.data.access_token)
        wx.setStorageSync('userInfo', tokenJson.data.customer_info)
        HTTP.setHeaders({ Authorization: tokenJson.data.access_token })
        /* eslint-disable no-undef */
        let page = getCurrentPages()[getCurrentPages().length - 1]
        page.onLoad(page.options)
        page.onShow()
        return true
      }
      let userInfo = this.$storage('userInfo')
      if (!userInfo.is_register) {
        wx.reLaunch({ url: this.$routes.other.LOGIN })
        return false
      }
      return true
    }
  }
}
