<script>
  import AppPromise from "@/utils/app-promise"

  export default {
    data() {
      return {}
    },
    async onLaunch() {
    },
    onShow() {
      AppPromise.getInstance(async resolve => {
        resolve()
      })
    },
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*--公共样式--*/
  @import "./design/base.styl"
  /*底部tab栏样式修改，仅h5生效*/
  uni-tabbar .uni-tabbar__icon
    margin-bottom: 4.5px

  uni-tabbar .uni-tabbar__label
    line-height: 1

</style>
