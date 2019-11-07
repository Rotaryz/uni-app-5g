import {globalComputed,globalMethods} from "@/store/helpers.js"

export default {
  computed: {
    ...globalComputed
  },
  onLoad(options) {
  },
  methods: {
    ...globalMethods,
    // 获取缓存
    $storage(key, val) {
      if (val) uni.setStorageSync(key, val)
      else return uni.getStorageSync(key)
    },
    // button收集手机formId
    async $getFormId(e) {
      const token = this.$storage("token")
      if (!token) {
        return
      }
      let formId = e.detail.formId
      this.$API.Login.getFormId({data: {form_ids: [formId]}})
    },
    // 授权登录
    /**
     *code 静默授权要传
     * encrypted_data，iv 首次登录要传
     */
    _login(code, e) {
      let data = {code: code}
      if (e) {
        data = {
          ...data,
          encrypted_data: e.detail.encryptedData,
          iv: e.detail.iv
        }
      }
      return this.$API.Login.getToken({
        data,
        loading: false,
        toast: false,
      }).then(res => {
        console.log(res)
        if (res.error_code !== this.$ERR_OK) return res
        this.$storage("token", res.data.access_token)
        this.$storage("userInfo", res.data.customer_info)
        uni.navigateBack({
          delta: 1
        })
      }).catch(err => {
        console.log(err)
      })

    },
    // 判断是否需要跳转登录页面
    async $checkToken() {
      let that = this
      let url = this.$getUrl()
      let token = this.$storage("token")
      if (!token) {
        let code = await getCode(this.$storage("provider"))
        this._login({data: code}).then(res => {
          if (!res.data.customer_info.is_register) {
            uni.navigateTo({url: this.$routes.main.LOGIN})
            return false
          }
        }).catch(err => {
          uni.navigateTo({url: that.$routes.uni.LOGIN})
          return false
        })
        return true
      }
      // 有token 是否注册
      let userInfo = this.$storage("userInfo")
      if (!userInfo.is_register) {
        wx.reLaunch({url: this.$routes.main.LOGIN})
        return false
      }
      return true
    }
  }
}
