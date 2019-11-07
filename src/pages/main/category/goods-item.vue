<template>
  <div class="goods-item">
    <img v-if="goods.goods_cover_image" :src="goods.goods_cover_image" mode="aspectFill" class="goods-img">
    <p class="title">{{goods.name}}</p>
    <div class="pay-money middle-big">
      <span class="money-icon font-regular">¥</span>
      <span class="num">{{goods.cash_price}}</span>
      <span class="add-icon font-regular">+</span>
      <span class="num">{{ goods.bean_price}}</span>
      <span class="bean-text font-regular">播豆</span>
    </div>
    <div class="price-sale">¥<span class="price-num">{{goods.price}}</span></div>
    <div class="buy-btn font-regular" @click="goToBuy(goods)">购买</div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'GOODS_ITEM',
    props: {
      goods: {
        type: Object,
        default: {}
      }
    },
    methods: {
      goToBuy(goods) {}
    }
  }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  .goods-item
    position: relative
    height: 100%
    border-radius: 6px
    background: #ffffff

    .goods-img
      display: flex
      width: 48vw
      height: @width
      border-radius: 6px 6px 0 0

    .title
      font-size 14px
      line-height 20px
      margin: 7px 10px 9px
      color: $color-text-main
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
      font-bold()
      no-wrap()

    .price-sale
      font-size: 11px
      color: $color-text-sub
      text-decoration-line line-through
      padding: 7px 10px 19px

    .pay-money
      padding: 0 10px
      color: $color-red
      display: flex
      align-items: flex-end

      .money-icon
        font-size: 14px
        line-height: 1
        transform: translateY(1px)

      .num
        font-size: 16px
        line-height: 1
        transform: translateY(2px)
        font-bold()

      .add-icon
        font-size: 15px
        line-height: 1
        margin: 0 1px
        transform: translateY(1px)

      .bean-text
        font-size: 13px
        line-height: 1
        margin-left: 2px

    .buy-btn
      position: absolute
      bottom: 10px
      right: 10px
      width: 48px
      height: 22px
      line-height: 22px
      font-size: 13px
      text-align: center
      color: #ffffff
      background: $color-main
      border-radius: 2px
</style>
