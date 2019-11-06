<template>
  <div class="mine">
    <section class="top-background" :style="{height: backgroundHeight+'px'}">
      <img class="top-background-img" mode="aspectFill" src="./bg-my.png">
    </section>
    <div class="mine-info">
      <div class="info-main-box">
        <div class="info-main-top">
          <img class="user-img" mode="aspectFill" :src="!isLogin ? userInfo.avatar : defaultImg">
          <div v-if="!isLogin" class="user-name">{{userInfo.nickname}}</div>
          <div v-else class="login-in" @tap="login">登录/注册<img src="./icon-pressed@2x.png" class="way"></div>
        </div>
        <div class="info-main-bottom">
          <div class="info-list">
            <div class="info-number">{{integral}}</div>
            <div class="info-text">兑换券</div>
          </div>
          <div class="info-list">
            <div class="info-number">{{bean}}</div>
            <div class="info-text">播豆</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './helpers'
  // import API from '@api'

  const PAGE_NAME = 'MINE'

  export default {
    name: PAGE_NAME,
    data() {
      return {
        backgroundHeight: '',
        placeHeight: '',
        userInfo: {},
        defaultImg: require('./pic-head@2x.png'),
        isLogin: true
      }
    },
    onLoad() {
      let res = uni.getSystemInfoSync()
      this.statusBarHeight = res.statusBarHeight || 20
      this.placeHeight = 44 + this.statusBarHeight
      this.backgroundHeight = 0.217 * res.screenWidth + this.placeHeight
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /*@import "~@design"*/

  .mine
    width: 100%
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

</style>
