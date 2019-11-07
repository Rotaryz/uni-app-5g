<script>
  import {getProvider, getCode} from "@/utils/login.js"
  import AppPromise from "@/utils/app-promise"

  export default {
    data: {
      title: 0
    },
    async onLaunch() {
      this.$storage("keepPage", "/pages/main/index/index")
      //获取服务商信息
      let provider = await getProvider()
      this.$storage("provider", provider[0])
      this.setProvider(provider[0])
    },
    onShow() {
      let shopId = this.$storage("shopId") || ""
      AppPromise.getInstance(async resolve => {
        console.warn("页面全局处理shopId(当有分享的页面需要使用AppPromise.getInstance().then,设置好id之后再进行页面的操作，可参考home.vue)")
        if (!shopId) {
          let res = await this.$API.Login.getDefaultShop({data: {}, loading: false, toast: false})
            .then(async (res) => {
              this.$storage("shopId", res.data.shop_id)
              await this.silenceLogin()
              resolve(true)
            })
          return
        }
        await this.silenceLogin()
        resolve(true)
      })
    },
    methods: {
      async silenceLogin() {
        // 初始化获取静默授权
        let code = await getCode(this.$storage("provider"))
        await this._login(code)
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    /*--公共样式--*/
    @import "./design/base.styl"

</style>
