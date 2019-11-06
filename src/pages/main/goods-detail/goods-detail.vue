<template>
  <div class="goods-detail">
    <swiper class="banner-swiper">
      <swiper-item v-for="(item, index) in detail.goods_banner_images" :key="index">
        <img src="./image.jpg" alt="" mode="aspectFill" class="banner-image">
      </swiper-item>
    </swiper>
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
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .goods-detail
    height: 100vh
    background: #f2f5f7
    width: 100%
    .banner-swiper
      width: 100%
      height: 640rpx
    .banner-image
      width: 100%
      height: 100%
</style>
