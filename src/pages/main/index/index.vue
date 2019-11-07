<template>
    <div class="home">
        <skeleton-screen :visible="FirstLoading" :imgUrl="imgUrl"></skeleton-screen>
        <div v-show="!FirstLoading">
            <div v-for="(cms, cmsIdx) in cmsList" :key="cmsIdx" class="cms-content">
                <!--顶部图片-->
                <img
                        v-if="cms.code === 'shop_banner'"
                        class="banner-image"
                        lazy-load
                        mode="aspectFill"
                        :src="cms.children[0].detail.image_url"
                >
                <article class="content-wrap">
                    <!--播豆专区-->
                    <section v-if="cms.code === 'bean_area' && cms.goods_num" class="exchange-block">
                        <div v-for="(ex, exIdx) in cms.children" :key="exIdx" class="content-wrap">
                            <div v-if="ex.code === 'banner'" class="exchange-banner-wrap" @click="goGoodsList">
                                <img v-for="(item, index) in ex.children" :key="index" :src="item.detail.image_url" mode="fixWidth" class="exchange-banner">
                                <div v-if="cms.goods_num>6" class="more">
                                    <p class="more-text">查看更多</p>
                                    <img class="way-white" src="./icon-pressed@2x.png">
                                </div>
                            </div>
                            <div v-if="ex.code === 'bean_list'" class="ex-content">
                                <div v-for="(item, index) in ex.children" :key="index" class="exchange-goods">
                                    <block v-if="index < 6">
                                        <div class="ex-goods-item" @click="goGoodsDetail(item.detail)">
                                            <img :src="item.detail.goods_cover_image" mode="aspectFill" class="ex-goods-img">
                                            <div class="info-wrap bean-info-wrap">
                                                <p class="ex-goods-name">{{item.detail.name}}</p>
                                                <div class="pay-money middle-big goods-price">
                                                    <span class="money-icon">¥</span>
                                                    <span class="num">{{item.detail.cash_price}}</span>
                                                    <span class="add-icon">+</span>
                                                    <span class="num">{{ item.detail.bean_price}}</span>
                                                    <span class="bean-text">播豆</span>
                                                </div>
                                                <div class="price-sale">¥<span class="price-num">{{item.detail.price}}</span></div>
                                            </div>
                                            <div class="go-button">购买</div>
                                        </div>
                                    </block>
                                </div>
                            </div>
                        </div>
                    </section>
                    <!--兑换专区-->
                    <section v-if="cms.code === 'exchange_area' && cms.goods_num" class="exchange-block">
                        <div v-for="(ex, exIdx) in cms.children" :key="exIdx">
                            <div v-if="ex.code === 'banner'" class="exchange-banner-wrap" @click="goExchange">
                                <img v-for="(item, index) in ex.children" :key="index" :src="item.detail.image_url" mode="aspectFill" class="exchange-banner">
                                <div v-if="cms.goods_num > 6" class="more">
                                    <p class="more-text">查看更多</p>
                                    <img class="way-white" src="./icon-pressed@2x.png">
                                </div>
                            </div>
                            <div v-if="ex.code === 'exchange_list'" class="ex-content">
                                <div v-for="(item, index) in ex.children" :key="index" class="exchange-goods">
                                    <block v-if="index < 6">
                                        <div class="ex-goods-item" @click="goExchangeDetail(item.detail)">
                                            <img :src="item.detail.goods_cover_image" mode="aspectFill" class="ex-goods-img">
                                            <div class="info-wrap">
                                                <p class="ex-goods-name">{{item.detail.name}}</p>
                                                <div class="ex-goods-exchange">
                                                    <img src="./pic-dhqprice@2x.png" mode="aspectFill" class="ex-dou-icon">
                                                    <p class="price">{{item.detail.integral_price}}</p>
                                                </div>
                                                <div class="price-sale">¥<span class="price-num">{{item.detail.price}}</span></div>
                                            </div>
                                        </div>
                                    </block>
                                </div>
                            </div>
                        </div>
                    </section>
                </article>
                <article class="cart-box" @click="goToShoppingCart">
                    <img src="./icon-buycar@2x.png" class="cart-icon">
                    <p v-if="count" class="cart-num">{{count}}</p>
                </article>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './helpers'
  import SkeletonScreen from "@/components/skeleton-screen/skeleton-screen"
  import AppPromise from "@/utils/app-promise"

  const PAGE_IMAGE = require("./pic-sc@2x.png")
  let num = 0
  const PAGE_NAME = "HOME"
  export default {
    name: PAGE_NAME,
    components: {
      "skeleton-screen": SkeletonScreen
    },
    data() {
      return {
        imgUrl: PAGE_IMAGE,
        FirstLoading: true,
        bannerIndex: 0,
        // nav: NAV,
        cmsList: [],
        shopId: "",
        shopInfo: {},
        count: 0
      }
    },
    onLoad() {
    },
    onShow() {
      AppPromise.getInstance().then(res => {
        console.log(this.$storage("token"))
        if (this.shopId !== this.$storage("shopId")) {
          this.actionDataCollect()
          this.shopId = this.$storage("shopId")
        }
        let loading = num === 0
        num++
        this._getHomeDetail(loading)
        let token = this.$storage("token")
        if (!token) return
        this._getCartCount()
        this._getShopInfo()
      })
    },
    // 下拉刷新
    onPullDownRefresh() {
      this._getHomeDetail(true)
      wx.stopPullDownRefresh()
    },
    onShareAppMessage() {
      let shopId = this.$storage("shopId")
      const path = `${this.$routes.main.INDEX}?shopId=${shopId}`
      const title = `5G新店铺${this.shopInfo.name || ""}`
      return {
        title,
        path
      }
    },
    methods: {
      // 获取当前用户信息
      _getShopInfo() {
        this.$API.Shop.getShopInfo({loading:false}).then(res => {
          this.shopInfo = res.data
        })
      },
      // 获取购物车商品数量
      _getCartCount() {
        this.$API.Cart.getCartCount({loading:false}).then(res => {
          this.count = res.data.goods_count > 99 ? "99+" : res.data.goods_count
          console.log(this.count)
        })
      },
      // 获取cms数据
      _getHomeDetail(loading = false) {
        this.$API.Home.homeDetail({data: {code: "customer_index"}, loading, toast: true})
          .then((res) => {
            this.cmsList = res.data.children
            // 提取专区的商品数量
            this.cmsList = this.cmsList.map((item) => {
              item.goods_num = 0
              if (item.code === "exchange_area" || item.code === "bean_area") {
                item.children.forEach((child) => {
                  if (child.code === "exchange_list" || child.code === "bean_list") {
                    item.goods_num = child.children.length
                  }
                })
              }
              return item
            })
            this.FirstLoading = false
          })
          .catch(() => {
            this.FirstLoading = false
          })
      },
      // 行为记录收集
      actionDataCollect() {
        this.$sendMsg({
          event_no: 1001
        })
      },
      // 兑换详情
      goExchangeDetail(item) {
        uni.navigateTo({url: `${this.$routes.main.GOODS_DETAIL_EXCHANGE}?id=${item.id}`})
      },
      // 播豆商品详情
      goGoodsDetail(item) {
        uni.navigateTo({url: `${this.$routes.main.GOODS_DETAIL}?id=${item.id}`})
      },
      // 兑换列表
      goExchange() {
        let res = this.cmsList.find(item => item.code === "exchange_area")
        if (res.goods_num < 6) return
        wx.navigateTo({url: this.$routes.main.GOODS_EXCHANGE})
        //  跳转兑换列表
      },
      // 播豆商品列表
      goGoodsList() {
        let res = this.cmsList.find(item => item.code === "bean_area")
        if (res.goods_num < 6) return
        wx.navigateTo({url: this.$routes.main.GOODS_CLASSIFY})
        //  跳转商品分类列表
      },

      // 去购车
      goToShoppingCart() {
        uni.navigateTo({url: this.$routes.main.SHOPPING_CART})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../../design/bean-money.styl"
    .home
        min-height: 100vh
        background: $color-background

    .big-wheel
        display: block
        margin: 0 auto
        padding: 0 10px
        width: auto
        margin-bottom: 10px

    .banner-image
        width: 100%
        height: px-change-vw(224)
        border: none
        font-size: 0
        display: block

    .exchange-block
        border-radius: 3px
        background-image: linear-gradient(180deg, #FFFFFF 0%, #F5F6FA 50%)

        .content-wrap
            border-radius: 6px
            box-shadow: 0 6px 30px 0 rgba(227, 230, 241, 0.36)

        .exchange-banner-wrap
            padding: 15px 10px 5px
            border-radius: 6px 6px 0 0
            position: relative

            .more
                position: absolute
                right: 30px
                top: 39px
                display: flex
                justify-content: center
                align-items: center
                background: rgba(43, 47, 55, 0.5)
                border-radius 13px
                height: 22px
                width: 72px

                .more-text
                    font-size: $font-size-12
                    color: $color-white

                .way-white
                    margin-left: 2px
                    width: 5px
                    height: 9px

            .exchange-banner
                width: 100%
                display: block
                height: 80px
                border-radius: 6px 6px 0 0

    .ex-content
        border-radius: 6px
        overflow: hidden
        box-shadow: 0 6px 30px 0 rgba(227, 230, 241, 0.36)
        padding: 0 5px 5px 10px
        display: flex
        flex-wrap: wrap

    .exchange-goods
        width: 50%

        .ex-goods-item
            background: $color-white
            margin-right: 5px
            margin-bottom: 5px
            position: relative
            border-radius: 4px

            .ex-goods-img
                height: px-change-vw(175)
                background: $image-color
                display: block
                width: 100%
                border-radius: 4px 4px 1px 1px

            .info-wrap
                padding: 10px 10px 12px

                &.bean-info-wrap
                    padding-bottom: 25px

            .ex-goods-name
                font-size: $font-size-14
                line-height: $font-size-14
                no-wrap()
                font-bold()

            .ex-goods-exchange
                display: flex
                margin-top: 12px

                .ex-dou-icon
                    position: relative
                    z-index: 2
                    height: 19px
                    width: 44.5px

                .price
                    border-radius: 0 2px 2px 0
                    margin-left: -3px
                    padding: 0 8px
                    color: $color-text-main
                    background: #C4F1F0
                    font-bold()
                    font-size: $font-size-15
                    line-height: 19px

            .goods-price
                margin-top: 12px

            .price-sale
                margin-top: 4px
                font-size $font-size-13
                color: $color-text-sub
                text-decoration-line line-through

                .price-num
                    font-size $font-size-13

            .go-button
                background: $color-main
                border-radius: 2px
                line-height $font-size-22
                font-size $font-size-12
                color: $color-white
                width: 52px
                text-align: center
                position: absolute
                bottom: 10px
                right: 10px

    /*购物车*/
    .cart-box
        position: fixed
        bottom: 45px
        right: 10px
        width: 45px
        height: @width
        border-radius: 50%
        box-shadow: 0 6px 16px 0 rgba(43, 47, 55, 0.12)
        background-color: $color-white

    .cart-icon
        position: absolute
        top: 53%
        left: 48%
        transform: translate(-50%, -50%)
        width: 23px
        height: @width

    .cart-num
        position absolute
        right: 5px
        top: 7px
        background: $color-red
        font-size: $font-size-10
        text-align: center
        min-width: 18px
        height: 18px
        line-height: 18px
        border-radius: 50%
        color: $color-white
        border: 1px solid $color-white

</style>
