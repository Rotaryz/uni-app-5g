<template>
    <view class="login">
        <img src="./bg-login@2x.png" class="bg">
        <div class="login-img-box">
            <img src="./bg-login@2x.png" class="bg">
            <img class="login-name" src="./pic-zbyp@2x.png">
            <form class="lost" action="" report-submit @submit="getFormId">
                <button class="login-btn" type="primary" @click="openSetting" v-if="status===0">
                    <!-- #ifdef MP-WEIXIN -->
                    <img src="./icon-wechat@2x.png" class="wx-logo">
                    <span class="title">微信授权登录</span>
                    <!-- #endif -->
                    <!-- #ifNdef MP-WEIXIN -->
                    <span class="title">授权登录</span>
                    <!-- #endif -->
                </button>
                <button class="login-btn" type="primary" open-type="getUserInfo" form-type="submit" @getuserinfo="_loginTo" v-else>
                    <!-- #ifdef MP-WEIXIN -->
                    <img src="./icon-wechat@2x.png" class="wx-logo">
                    <span class="title">微信授权登录</span>
                    <!-- #endif -->
                    <!-- #ifNdef MP-WEIXIN -->
                    <span class="title">授权登录</span>
                    <!-- #endif -->
                </button>
            </form>
        </div>
    </view>
</template>

<script type="text/ecmascript-6">
  import {getCode, getSetting} from "@/utils/login.js"

  // import * as Helpers from './helpers'
  // import API from '@api'
  const PAGE_NAME = "LOGIN"
  export default {
    name: PAGE_NAME,
    data() {
      return {
        e:{},
        loginTime: 3,
        code: "",
        status: 0 //2未操作 1已经授权  0拒绝授权
      }
    },
    onLoad() {

    },
    async onShow() {
      //获取授权状态
      this.status = await getSetting()
      //获取code
      this.code = await getCode(this.$storage("provider"))
    },
    methods: {
      getFormId(e) {
        this.formId = e.detail.formId
      },
      // 获取用户信息
      _loginTo(e) {
        if (this.loginTime <= 0) {
          return
        }
        if (!this.code) {
          uni.showToast({
            icon: "none",
            title: "正在加载中，稍等一下",
            duration: 2000
          });
          return
        }
        if (e.detail && e.detail.errMsg === "getUserInfo:ok") {
          this._login(this.code,e).then(res=>{
            this.$API.Login.getFormId({data: {form_ids: [this.formId]}})
            setTimeout(() => {
              uni.redirectTo({
                url: this.$routes.main.INDEX
              })
            }, 2000)
          }).catch(async (err) => {
            this.code = await getCode(this.$storage("provider"))
            this._login(this.code,e)
          })
        } else {
          uni.showToast({
            icon: "none",
            title: "已拒绝授权",
            duration: 2000
          });
          //用户拒绝授权
          this.status = 0
        }
      },
      // 设置授权
      openSetting() {
        uni.showModal({
          title: "提示",
          content: "你已经取消过授权，需设置授权权限",
          confirmText: "设置",
          success: function (res) {
            if (res.confirm) {
              uni.openSetting({
                success(res) {

                }
              })
            } else if (res.cancel) {
              console.log("用户点击取消")
            }
          }
        });
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .bg
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%

    .login
        height: 100vh
        background: $color-white
        width: 100%

    .login-img-box
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        padding-top: 18.2vh

        .login-img
            position: relative
            z-index: 10
            height: 88px
            width: @height

        .login-name
            position: relative
            z-index: 10
            width: 102.1px
            margin-top: 20.5px
            height: 20.85px

        .login-btn
            display: flex
            padding: 0
            margin: 24.4vh 0
            justify-content: center
            align-items: center
            width: 74.667vw
            height: 12vw
            border-radius: 22.5px
            transition: all 0.3s
            background: $color-main

            .wx-logo
                width: 20px
                height: 20px
                margin-right: 8px

            .title
                font-size: $font-size-16
                color: $color-white
                font-family: $font-family-regular

            &:after
                border: none

    .popup
        padding-top: 33.4vh
        box-sizing: border-box
        background: rgba(39, 39, 62, .7)
        position: fixed
        top: 0
        left: 0
        bottom: 0
        right: 0

        .popup-content
            display: flex
            flex-direction: column
            align-items: center
            border-1px(rgba(32, 32, 46, 0.10), 6px)
            border-radius: 6px
            margin: 0 auto
            width: 80vw
            background: $color-white

            .popup-title
                font-family: $font-family-medium
                color: $color-text-main
                font-size: $font-size-16
                padding: 25px 0

            .popup-tip
                font-family: $font-family-regular
                color: $color-text-main
                font-size: $font-size-16
                padding: 10px 0

            .popup-btn
                border-radius: 20px
                line-height: 32px
                text-align: center
                width: 110px
                background: $color-main
                color: $color-white
                font-family: $font-family-regular
                font-size: $font-size-14
                margin: 34px 0 25px

    .hide-popup
        opacity: 0
        z-index: -1
        transition: all 0.2s

    .fade-modal-enter-active
        opacity: 1
        z-index: 1000
        transition: all 0.5s


</style>
