<template>
  <div class="order-list">
    <div class="scroll-box">
      <scroll-view
              class="scroll-view2"
              v-if="navList.length"
              id="scrollView"
              :scroll-into-view="viewToItem"
              scroll-x
              scroll-with-animation="true"
      >
        <div v-for="(item, index) in navList" :class="tabIndex === index ? 'item-active'  : ''" :key="index"
             class="item scroll-item" :id="'item'+index" @tag="_changeTab(index, item.status, $event)">
          <p class="text">{{item.name}}</p>
        </div>
        <div :style="{left: move + 'px'}" class="line-box">
          <div class="line"></div>
        </div>
      </scroll-view>
    </div>
    <div class="nav-block" :style=""></div>
    <div class="big-box">
      <div class="classify-big-box"
           :style="{'transform': ' translateX('+ -(tabIndex * 100) +'vw)', width:  width +'vw'}"
      >
        <div
                v-for="(tabItem, tabInx) in orderList" :key="tabInx"
                :style="{height: tabIndex * 1 === tabInx ? -1 : scrollHeight + 'px'}"
                class="goods-list-box"
        >
          <div v-for="(item, index) in tabItem.arr" :key="index" class="order-item" @click="goOrderDetail(item.id)">
            <div class="order-header">
              <div class="order-time">{{item.created_at}}</div>
              <div class="order-status">{{item.status_str}}</div>
            </div>
            <div v-for="(good, goodIdx) in item.details" :key="goodIdx" class="order-msg">
              <img :src="good.goods_cover_image" class="goods-img" mode="aspectFill">
              <div class="goods-msg">
                <div class="goods-title">{{good.goods_name}}</div>
                <div class="sku">
                  <div v-for="(sku, skuIdx) in good.goods_spec.specs_attrs" :key="skuIdx" class="sku-item">{{sku.attr_key}}:{{sku.attr_value}}</div>
                </div>
                <div class="goods-detail">
                  <div class="goods-price">
                    <div class="price-unit">¥</div>
                    <div class="goods-money">{{good.goods_spec.cash_price}}</div>
                    <div class="add">+</div>
                    <div class="goods-money">{{good.goods_spec.bean_price}}</div>
                    <div class="goods-dou-unit">播豆</div>
                  </div>
                  <div class="goods-num">x{{good.goods_num}}</div>
                </div>
              </div>
            </div>
            <div v-if="item.status === 0" class="order-button">
              <div v-if="item.status === 0" class="order-btn cancel" @click.stop="cancelOrder(item.id, index)">取消</div>
              <div v-if="item.status === 0" class="order-btn confirm" @click.stop="orderRepay(item.id, index)">立即支付</div>
            </div>
          </div>
          <!--<empty v-if="tabItem.isEmpty" :image="empty" :paddingTop="45.4" tip="你的订单是空的"></empty>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './helpers'
  // import API from '@api'

  const PAGE_NAME = 'ORDER_LIST'
  const NAV_LIST = [
    { name: '全部', status: '' },
    { name: '待付款', status: '0' },
    { name: '待发货', status: '10' },
    { name: '待收货', status: '20' },
    { name: '已完成', status: '100' }
  ]
  const ARR = { arr: [], classifyMore: false, isEmpty: false, lastPage: 2, page: 1, height: 145 }

  export default {
    name: PAGE_NAME,
    data() {
      return {
        navList: NAV_LIST,
        viewToItem: 'item0',
        boxTransition: 'all .3s',
        move: 0,
        tabIndex: 0,
        statusBarHeight: 64,
        orderList: [],
        width: NAV_LIST.length * 100,
        status: '',
        page: 1,
        winHeight: 667
      }
    },
    onLoad(option) {
      this.status = option.status || this.status
      let index = this.navList.findIndex((item) => item.status === this.status)
      this.orderList = this.navList.map(() => {
        return ARR
      })
      this._changeTab(index)
      let res = uni.getSystemInfoSync()
      this.statusBarHeight = res.statusBarHeight ? res.statusBarHeight + 44 : 64
      this.winHeight = res.screenHeight
      this.getOrderList(true)
    },
    methods: {
      _changeTab() {},
      getOrderList() {}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /*@import "~@design"*/

  .nav-block
    height: 40px
  .order-list
    width: 100%

  .scroll-box
    top: 0
    position: fixed
    background: $color-white
    height: 40px
    z-index: 999
    .scroll-view2
      position: relative
      padding-left: 10px
      z-index: 99
      display: block
      white-space: nowrap
      box-sizing: border-box
      transition: transform 0.3s
      transform: translate3d(0, 0, 0)
      height: 100%
      width: 100vw
      ::-webkit-scrollbar
        width: 0
        height: 0
        color: transparent
      .item
        white-space: nowrap
        text-align: center
        display: inline-block
        position: relative
        height: 100%
        transform-origin: 50%
        transition: all 0.2s
        width: 43px
        padding: 0 18px
        box-sizing: content-box
        .text
          line-height: 1
          padding: 10.5px 0 13.5px
          font-size: $font-size-14
          font-family: $font-family-regular
          color: $color-text-main
      .item-active
        color: $color-text-main
        position: relative
        transition: font-size 0.2s
        transform-origin: 50%
        .text
          font-size: $font-size-16
          font-bold()
    .line-box
      position: absolute
      width: 79px
      height: 3px
      top: 37px
      left: 0
      display: flex
      justify-content: center
      transition: all 0.2s
      .line
        background: $color-main
        width: 28px
        border-radius: 3px
        height: 3px

  .big-box
    margin-top: 10px
    width: 100vw
    overflow: hidden
    .classify-big-box
      width: 500vw
      display: flex
      transform: translateX(0)
      transition: all 0.3s
    .goods-list-box
      display: block
      width: 100vw

  .order-item
    padding: 0 15px
    box-sizing: border-box
    margin-bottom: 10px
    background: $color-white
    .order-header
      line-height: 40px
      min-height: 40px
      align-items: center
      display: flex
      justify-content: space-between
      border-bottom-1px()
      .order-time
        color: $color-text-main
        font-family: $font-family-regular
        font-size: $font-size-14
      .order-status
        color: $color-main
        font-family: $font-family-regular
        font-size: $font-size-14
    .order-msg
      display: flex
      padding: 15px 0
      border-bottom-1px($color-line)
      &:last-of-type
        border-none()
      .goods-img
        border-radius: 2px
        width: 75px
        min-width: 75px
        height: @width
        min-height: 75px
      .goods-msg
        flex: 1
        width: 0
        margin-left: 10px
        .goods-title
          no-wrap()
          color: $color-text-main
          font-bold()
          font-size: $font-size-14
        .sku
          width: 100%
          display: flex
          flex-wrap: wrap
          margin-top: 7.4px
          font-size: $font-size-13
          font-family: $font-family-regular
          line-height: 1.2
          height: 13px
          .sku-item
            margin-right: 10px
            white-space: nowrap
            color: $color-text-sub
        .goods-detail
          margin-top: 18px
          display: flex
          align-items: flex-end
          justify-content: space-between
          .goods-price
            display: flex
            align-items: flex-end
            line-height: 1
            margin-top: 1px
            .price-unit
              margin-right: 1px
              font-size: $font-size-11
              font-bold()
              transform: translateY(-1px)
              color: $color-money
            .goods-money
              font-bold()
              font-size: $font-size-17
              color: $color-money
            .add
              margin: 0 2px
              font-size: $font-size-16
              color: $color-money
            .goods-dou-unit
              font-size: $font-size-12
              font-family: $font-family-regular
              color: $color-money
              margin-left: 2px
              transform: translateY(-1px)
          .goods-num
            color: $color-text-main
            font-family: $font-family-regular
            font-size: $font-size-14

    .order-button
      height: 45px
      display: flex
      justify-content: flex-end
      align-items: center
      .order-btn
        margin-left: 10px
        line-height: 27px
        border-1px(#C8CACF, 14.5px)
        width: 75px
        text-align: center
        font-family: $font-family-regular
        font-size: $font-size-12
        color: $color-text-main
      .confirm
        border-1px($color-main, 14.5px)
        color: $color-main
</style>
