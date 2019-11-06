<template>
  <div class="goods-detail">

    <!--banner图-->
    <div class="banner-box">
      <swiper class="banner-swiper" @change="bannerChange">
        <swiper-item v-for="(item, index) in detail.goods_banner_images" :key="index">
          <img src="./image.jpg" alt="" mode="aspectFill" class="banner-image">
        </swiper-item>
      </swiper>
      <div class="banner-number-box">
        <span class="current-index">{{bannerIndex}}</span>
        <span>/</span>
        <span>{{detail.goods_banner_images.length}}</span>
      </div>
    </div>

    <!-- 商品基本信息-->
    <div class="num-wrap  header-num-wrap">
      <div class="pay-money white">
        <div class="money-icon">¥</div>
        <div class="num">{{detail.cash_price || 0}}</div>
        <div class="add-icon">+</div>
        <div class="num">{{detail.bean_price || 0}}</div>
      </div>
      <div class="bean-text"> 播豆</div>
      <div class="original-price"><span class="money-icon">¥</span>{{detail.price}}</div>
      <img src="@/static/images/pic-xq@2x.png" class="bg-image">
    </div>
    <div class="base-info-wrap">
      <div class="title"><span class="detail-goods-mask">商城</span><span class="name">{{detail.name}}</span></div>

      <div class="saleable">库存 <span class="saleable-num">{{totalSaleable}}</span></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './helpers'
  // import API from '@api'

  const PAGE_NAME = 'GOODS_DETAIL'

  export default {
    name: PAGE_NAME,
    components: {
    },
    data() {
      return {
        detail: {
          goods_banner_images: [1, 2, 3]
        },
        bannerIndex: 1
      }
    },
    methods: {
      bannerChange(current) {
        this.bannerIndex = current.target.current + 1
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .goods-detail
    height: 100vh
    background: #f2f5f7
    width: 100%
    .banner-box
      position: relative
      .banner-swiper
        width: 100%
        height: 640rpx
      .banner-image
        width: 100%
        height: 100%
      .banner-number-box
        display: inline-block
        position: absolute
        bottom: px-change-vw(10)
        right: 20px
        background: rgba(63, 69, 75, .4)
        color: #fff
        height: 20px
        line-height: 20px
        border-radius: 20px
        opacity: .75
        transition: all .3s
        font-size: $font-size-12
        padding: 0 10px
      .current-index
        font-size $font-size-15

    .header-num-wrap
      height: 50px
      position: relative
      box-sizing border-box
      padding: 15px
      display: flex
      justify-content: flex-start

      .bg-image
        width: 100%
        height: 100%
        position: absolute
        top: 0
        right: 0
        left: 0
        bottom: 0
        z-index: -1

      .original-price
        font-size: $font-size-14
        color: $color-white
        line-height: 12px
        text-decoration: line-through
        margin-left: 7px
        opacity: 0.8
        .money-icon
          margin-right:2px
      .white
        display: flex
        align-items: flex-end
        margin-bottom: -2px

        .money-icon,.num,.add-icon,.num
          color: $color-white

      .bean-text
        color: $color-white
        font-size: $font-size-17
        margin-left: 2px


</style>
