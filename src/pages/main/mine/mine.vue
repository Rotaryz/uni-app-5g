<template>
  <div class="mine">
    <section class="top-background" :style="{height: backgroundHeight+'px'}">
      <img class="top-background-img" mode="aspectFill" src="./bg-my.png">
    </section>
    <div class="mine-info">
      <div class="info-main-box">
        <div class="info-main-top">
          <img class="user-img" mode="aspectFill" :src="!isLogin ? myUserInfo.avatar : defaultImg">
          <div v-if="!isLogin" class="user-name">{{myUserInfo.nickname}}</div>
          <div v-else class="login-in" @tap="login">登录/注册<img src="./icon-pressed@2x.png" class="way"></div>
        </div>
        <div class="info-main-bottom">
          <div class="info-list">
            <div class="info-number">{{integral || 0}}</div>
            <div class="info-text">兑换券</div>
          </div>
          <div class="info-list">
            <div class="info-number">{{bean || 0}}</div>
            <div class="info-text">播豆</div>
          </div>
        </div>
      </div>
    </div>
    <div class="order-router">
      <div class="order-title-box">
        <div class="order-title">服务订单</div>
      </div>
      <div class="order-enter">
        <div class="order-enter-item" v-for="(item, index) in orderNav" :key="index">
          <img mode="aspectFill" :src="item.icon" class="item-icon">
          <div class="item-text">{{item.text}}</div>
        </div>
      </div>
    </div>
    <div class="my-service">
      <div class="order-title-box">
        <div class="order-title">我的服务</div>
      </div>
      <div class="service-nav">
        <div class="ser-nav-item" v-for="(item, index) in serviceNav" :key="index" @tap="jumpPage(item)">
          <img mode="aspectFill" :src="item.icon" class="nav-icon">
          <div class="nav-text">{{item.text}}</div>
        </div>
      </div>
    </div>
    <!--分享赚钱-->
    <div v-if="earnMoney.is_show" class="share-get-money">
      <img src="./pic-fxzq@2x.png" class="share-img" mode="aspectFill">
    </div>
    <!-- 广告 -->
    <div v-if="isAd" class="ad">
      <img :src="ad.image_url" mode="aspectFill" class="ad-img">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './helpers'
  // import API from '@api'
  import routes from '@/utils/routes'

  const PAGE_NAME = 'MINE'
  const ORDER_NAV = [
    { url: '', icon: require('./icon-dfk@2x.png'), text: '待付款', status: 1 },
    { url: '', icon: require('./icon-dct@2x.png'), text: '待成团', status: 2 },
    { url: '', icon: require('./icon-dsy@2x.png'), text: '待使用', status: 3 },
    { url: '', icon: require('./icon-alloeder@2x.png'), text: '全部订单', status: '' }
  ]
  const SERVICE_NAV = [
    { url: routes.main.ORDER_LIST, icon: require('./icon-fworder@2x.png'), text: '播豆订单', status: '' },
    { icon: require('./icon-dhjl@2x.png'), text: '兑换记录', status: '' },
    { icon: require('./icon-jpjl@2x.png'), text: '奖品记录', status: '' },
    { icon: require('./icon-fxzq@2x.png'), text: '我的收益', status: '' },
    { icon: require('./icon-address@2x.png'), text: '我的地址', status: '' },
    { icon: require('./icon-qhdp@2x.png'), text: '切换店铺', status: '' }
  ]

  export default {
    name: PAGE_NAME,
    data() {
      return {
        backgroundHeight: '',
        placeHeight: '',
        myUserInfo: {},
        defaultImg: require('./pic-head@2x.png'),
        orderNav: ORDER_NAV,
        serviceNav: SERVICE_NAV,
        isLogin: true,
        ad: {},
        earnMoney: { id: '', is_show: 0 },
        integral: '',
        bean: '',
        isAd: false
      }
    },
    onLoad() {
      let res = uni.getSystemInfoSync()
      this.statusBarHeight = res.statusBarHeight || 20
      this.placeHeight = 44 + this.statusBarHeight
      this.backgroundHeight = 0.217 * res.screenWidth + this.placeHeight
    },
    onShow() {
      this.isLogin = !uni.getStorageSync('token')
      this.myUserInfo = uni.getStorageSync('userInfo')
      if (this.isLogin) return
      this._getUserInfo()
      this._getIntegralBeanCount()
    },
    methods: {
      login() {
        uni.setStorageSync('errorUrl', 'pages/mine')
        uni.navigateTo({ url: this.$routes.main.LOGIN })
      },
      _getUserInfo() {
        this.$API.Mine.getUserInfo({ data: {}, loading: false, toast: false })
          .then((res) => {
            let userInfo = uni.getStorageSync('userInfo') || {}
            this.myUserInfo = Object.assign({}, userInfo, res.data)
            uni.setStorageSync('userInfo', this.myUserInfo)
          })
          .catch(() => {
          })
      },
      jumpPage(item) {
        if (!item.url) return
        wx.navigateTo({ url: item.url })
      },
      dealPrice(num, multiple) {
        // 格式化数据
        let numFix = (num / multiple).toFixed(3)
        numFix = numFix.slice(0, -1)
        let aa = numFix.match(/\d+\.\d+/g)
        for (let index in aa) {
          numFix = numFix.replace(aa[index], parseFloat(aa[index]))
        }
        return numFix
      },
      _getIntegralBeanCount() {
        this.$API.Mine.getIntegralBeanCount({ data: {}, loading: false, toast: false })
          .then((res) => {
            this.bean = res.data.bean.available >= 10000 ? this.dealPrice(res.data.bean.available, 10000) + 'w' : res.data.bean.available
            this.integral = res.data.integral.available >= 10000 ? this.dealPrice(res.data.integral.available, 10000) + 'w' : res.data.integral.available
          })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /*@import "~@design"*/

  .mine
    width: 100vw
    min-height: 100vh
    box-sizing: border-box
    background: $color-white
    position: relative
    padding-bottom: 20px
    .mine-info
      position: relative
      padding: 25px 15px 0
      margin-bottom: 10px

      .info-main-box
        background: $color-white
        border-radius: 6px
        box-shadow: 0 3px 15px 0 rgba(227, 230, 241, 0.36)
        padding: 20px 0 25px

      .info-main-top
        padding-left: 15px
        margin-bottom: 25px
        layout(row)
        align-items: center

        .user-img
          display: block
          border-radius: 50%
          width: 55px
          height: @width
          margin-right: 11px

        .user-name
          font-size: $font-size-20
          font-bold()
          color: $color-text-main
          flex: 1
          width: 0
          word-break: break-all
          line-height: 1.4
          no-wrap()

        .login-in
          font-size: $font-size-16
          letter-spacing: 0.8px
          font-family: $font-family-regular
          color: $color-text-main

          .way
            margin-left: 3px
            width: 10px
            height: 10px

      .info-main-bottom
        layout(row)

        .info-list
          flex: 1
          text-align: center
          position: relative

          .info-number
            font-bold()
            font-size: $font-size-20
            color: $color-text-main
            margin-bottom: 9px
            line-height: 1

          .info-text
            font-size: $font-size-12
            font-family: $font-family-regular
            color: $color-text-sub
            line-height: 1

          &:nth-of-type(1)
            &:before
              content: ''
              width: 1px
              height: 10px
              position: absolute
              background: $color-line
              transform: scaleX(.5) translateZ(0)
              right: 0
              top: 0
              bottom: 0
              margin: auto 0

    .order-router
      margin: 0 15px 10px
      overflow: hidden
      position: relative
      box-shadow: 0 6px 30px 0 rgba(227, 230, 241, 0.36)
      background: $color-white
      border-radius: 6px
      border-1px($color-background)

      .order-enter
        layout(row)
        align-items: center
        padding: 20px 0 25px

        .order-enter-item
          flex: 1

          .item-icon
            display: block
            width: 27px
            height: @width
            margin: 0 auto 8px
          .item-text
            text-align: center
            font-size: $font-size-11
            font-family: $font-family-regular
            color: $color-text-sub

  .order-title-box
    height: 40px
    padding: 0 15px

    .order-title
      width: 100%
      height: 40px
      line-height: @height
      font-size: $font-size-15
      font-bold()
      color: #1f1f1f
      border-bottom-1px($color-line)

  .top-background
    position: absolute
    left: 0
    right: 0
    top: 0
    .top-background-img
      width: 100%
      height: 100%
      font-size: 0
      line-height: 0
  .ad
    margin: 15px 15px 0

    .ad-img
      border-radius: 6px
      height: 21.33vw
      display: block
      width: 100%

  .my-service
    margin: 0 15px 10px
    padding-bottom: 5.5px
    position: relative
    border-radius: 6px
    box-shadow: 0 6px 30px 0 rgba(227, 230, 241, 0.36)

    .service-nav
      display: flex
      flex-wrap: wrap

      .ser-nav-item
        display: flex
        flex-direction: column
        align-items: center
        width: 25%
        padding: 20px 0 18.5px

      .nav-icon
        width: 23px
        height: @width

      .nav-text
        color: $color-text-main
        font-family: $font-family-regular
        margin-top: 12px
        font-size: $font-size-12
  .share-get-money
    display: block
    border-radius: 6px
    height: px-change-vw(80)
    padding: 0 15px 10px

    .share-img
      border-radius: 6px
      width: 100%
      height: 100%

</style>
