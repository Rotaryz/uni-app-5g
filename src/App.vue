<script>
    import {getProvider, getCode} from './utils/login.js'
    export default {
        data: {
            title: 0
        },
        async onLaunch() {
            //获取服务商信息
          let provider = await getProvider()
          this.$storage("provider", provider[0])
          this.silenceLogin()
        },
        onShow() {
        },
        onHide: function () {
            console.log('App Hide')
        },
        methods:{
          async silenceLogin() {
            // 初始化获取静默授权
            let code = await getCode(this.$storage("provider"))
            // this._login(code)
          },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    /*--公共样式--*/
    @import "./design/base.styl"

</style>
