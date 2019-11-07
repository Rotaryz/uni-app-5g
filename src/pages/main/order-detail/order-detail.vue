<template>
  <div class="order-detail">
    <div class="order-header">
      <img src="./pic-bg_order@2x.png" mode="aspectFill" class="header-bg">
      <img :src="orderIcon[orderMsg.status + '']" class="order-icon">
      <div class="order-status">{{orderMsg.status_str}}</div>
    </div>

    <div class="address">
      <div class="add-user">
        <img src="./icon-address@2x.png" class="add-icon">
        <div class="user-name">{{orderMsg.receiver_addresses ? orderMsg.receiver_addresses.name : ''}}</div>
        <div class="user-phone">{{orderMsg.receiver_addresses ? orderMsg.receiver_addresses.mobile : ''}}</div>
      </div>
      <div class="address-msg">{{address}}</div>
    </div>

    <div class="goods-box">
      <div v-for="(item, index) in orderMsg.details" :key="index" class="goods">
        <img :src="item.goods_cover_image" class="goods-img" mode="aspectFill">
        <div class="goods-msg">
          <div class="goods-title">{{item.goods_name}}</div>
          <div class="sku">
            <div v-for="(sku, skuIdx) in item.goods_spec.specs_attrs" :key="skuIdx" class="sku-item">{{sku.attr_key}}:{{sku.attr_value}}</div>
          </div>
          <div class="goods-detail">
            <div class="goods-price">
              <div class="price-unit">¥</div>
              <div class="goods-money">{{item.goods_spec.cash_price}}</div>
              <div class="add">+</div>
              <div class="goods-money">{{item.goods_spec.bean_price}}</div>
              <div class="goods-dou-unit">播豆</div>
              <!--<img src="./pic-bd@2x.png" class="goods-dou-unit">-->
            </div>
            <div class="goods-num">x{{item.goods_num}}</div>
          </div>
        </div>
      </div>
      <div class="goods-total">
        <div class="goods-total-title">商品总价</div>
        <div class="goods-price">
          <div class="price-unit">¥</div>
          <div class="goods-money">{{orderMsg.pay_amount_total}}</div>
          <div class="add">+</div>
          <div class="goods-money">{{orderMsg.pay_bean_price}}</div>
          <div class="goods-dou-unit">播豆</div>
        </div>
      </div>
    </div>

    <div class="order-information">
      <div class="information-msg">
        <div class="information-title">订单编号：</div>
        <div class="information-price">{{orderMsg.order_sn}}</div>
        <div class="copy-btn" @tap.stop="clipOrderId">复制</div>
      </div>
      <div class="information-msg">
        <div class="information-title">创建时间：</div>
        <div class="information-price">{{orderMsg.created_at}}</div>
      </div>
      <div v-if="orderMsg.status === 10 || orderMsg.status === 20 || orderMsg.status === 100" class="information-msg">
        <div class="information-title">支付时间：</div>
        <div class="information-price">{{orderMsg.pay_at}}</div>
      </div>
    </div>
    <form v-if="orderMsg.status !== -1 && orderMsg.status !== 10" class="order-btn">
      <button v-if="orderMsg.status === 0" class="btn" @click="cancelOrder(orderMsg.id)">取消</button>
      <button v-if="orderMsg.status === 0" class="btn" @click="orderRepay(orderMsg.id)">立即支付</button>
      <!--<button v-if="orderMsg.status === 20 || orderMsg.status === 100" class="btn" @click="logisticsDetail">查看物流</button>-->
      <button v-if="orderMsg.status === 20" class="btn" @click="confirmReceipt">确认收货</button>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './helpers'
  import * as UNI from '@/utils/uni-app.js'

  const PAGE_NAME = 'ORDER_DETAIL'
  const ORDER_ICON = { '-1': require('./icon-order_close@2x.png'), '0': require('./icon-order_payment@2x.png'), '10': require('./pic-order-delivery@2x.png'), '20': require('./pic-order_take@2x.png'), '100': require('./pic-order_complete@2x.png') }

  export default {
    name: PAGE_NAME,
    data() {
      return {
        orderIcon: ORDER_ICON,
        status: 0,
        orderMsg: {},
        id: ''
      }
    },
    computed: {
      address() {
        let add = this.orderMsg.receiver_addresses ? `${this.orderMsg.receiver_addresses.province} ${this.orderMsg.receiver_addresses.city} ${this.orderMsg.receiver_addresses.district} ${this.orderMsg.receiver_addresses.address}` : ''
        return add
      }
    },
    onLoad(option) {
      this.id = option.id || this.id
      this._getOrderDetail()
      console.log(UNI)
    },
    methods: {
      // 取消订单
      cancelOrder(id, index) {
        this.$API.Mine.cancelOrder({ data: { id: id } })
          .then((res) => {
            this._getOrderDetail()
          })
          .catch(() => {

          })
      },
      // 确认收货
      confirmReceipt() {
        this.$API.Mine.confirmReceipt({ data: { id: this.id } })
          .then((res) => {
            this._getOrderDetail()
          })
          .catch(() => {

          })
      },
      // 剪切
      clipOrderId() {
        UNI.setClipboardData(this.orderMsg.order_sn)
      },
      _getOrderDetail() {
        let data = { id: this.id }
        this.$API.Mine.orderDetail({data: data})
          .then((res) => {
            this.orderMsg = res.data
            console.log(this.orderMsg)
          })
          .catch((res) => {
            this.orderMsg = {}
          })
      },
      // 重新支付
      orderRepay(id) {
        let that = this
        this.$API.Mine.orderRepay({ data: { order_id: id } })
          .then((res) => {
            let payRes = res.data.pay_config
            UNI.payWayFor(payRes).then(() => {
              that._getOrderDetail()
            }).catch(() => {
            })
          })
          .catch(() => {
          })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /*@import "~@design"*/

  .order-detail
    height: 100vh
    overflow-y: auto
    padding-bottom: 60px
    box-sizing: border-box

  div, p
    word-break: break-all

  .order-header
    position: relative
    height: 24vw
    display: flex
    align-items: center
    padding: 0 18px
    box-sizing: border-box
    .header-bg
      position: absolute
      width: 100%
      height: 100%
      left: 0
      top: 0
    .order-status
      font-bold()
      font-size: $font-size-18
      position: relative
      z-index: 1
      color: $color-white
    .order-icon
      position: relative
      z-index: 1
      margin-right: 4.5px
      width: 33px
      height: @width

  .address
    background: $color-white
    padding: 25px 15px 20px
    .add-user
      font-size: 4.2667vw
      color: $color-text-main
      display: flex
      flex-wrap: wrap
      box-sizing: border-box
      align-items: center
      line-height: 1
      .user-phone
        font-family: $font-family-regular
        margin-left: 20px
      .user-name
        font-family: $font-family-regular
        word-break: break-all
      .add-icon
        height: 18px
        min-height: @height
        margin-right: 5px
        width: @height
        min-width: @height
    .address-msg
      padding: 0 0 0 23px
      margin-top: 9px
      line-height: 18px
      color: $color-text-sub
      font-family: $font-family-regular
      font-size: 3.7333vw

  .goods-box
    margin-top: 10px
    padding: 0 15px
    box-sizing: border-box
    background: $color-white
    .goods
      padding: 15px 0
      box-sizing: border-box
      display: flex
      border-bottom-1px()
      .goods-img
        border-radius: 3px
        background: $image-color
        width: 75px
        min-width: @width
        min-height: @width
        height: @width
      .goods-msg
        margin-left: 10px
        flex: 1
        box-sizing: border-box
        width: 0
        flex-wrap: wrap
        .goods-name
          no-wrap()
          margin-top: 2px
          font-bold()
          color: $color-text-main
          font-size: $font-size-14
        .sku
          display: flex
          flex-wrap: wrap
          margin-top: 7.4px
          font-size: $font-size-13
          font-family: $font-family-regular
          line-height: 1.2
          color: $color-text-secondary
          min-height: 16px
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
            .goods-money
              font-bold()
              font-size: $font-size-16
            .add
              margin: 0 2px
              font-size: $font-size-15
            .goods-dou-unit
              font-size: $font-size-12
              font-family: $font-family-regular
              margin-left: 2px
              transform: translateY(-1px)

          .goods-num
            color: $color-text-main
            font-family: $font-family-regular
            font-size: $font-size-14
    .goods-total
      height: 45px
      display: flex
      justify-content: space-between
      align-items: center
      .goods-total-title
        font-size: $font-size-14
        font-family: $font-family-regular
        color: $color-text-main
      .goods-price
        display: flex
        align-items: flex-end
        line-height: 1
        margin-top: 1px
        .price-unit
          margin-right: 1px
          font-size: $font-size-14
          font-bold()
          transform: translateY(-1px)
          color: $color-money
        .goods-money
          font-bold()
          font-size: $font-size-20
          color: $color-money
        .add
          margin: 0 2px
          font-size: $font-size-19
          color: $color-money
        .goods-dou-unit
          font-size: $font-size-14
          font-family: $font-family-regular
          color: $color-money
          margin-left: 2px
          transform: translateY(-1px)

  .order-information
    padding: 12px 15px
    box-sizing: border-box
    margin-top: 10px
    background: $color-white
    .information-item
      padding: 13px 0
      display: flex
      font-family: $font-family-regular
      justify-content: space-between
    .information-title
      font-size: $font-size-14
      color: $color-text-main
      line-height: 1
    .information-price
      line-height: 1
      font-size: $font-size-14
      color: $color-text-main
      font-family: $font-family-light
    .information-total
      font-bold()
      color: $color-money

  .information-msg
    padding: 12px 0
    display: flex
    font-family: $font-family-regular
    position: relative
    align-items: center
    .information-price
      line-height: 1
      font-size: $font-size-14

  .copy-btn
    width: 50px
    height: 22px
    border-1px(#D2D2D2, 10px)
    col-center()
    right: 0
    text-align: center
    line-height: 22px
    box-sizing: border-box
    font-family: $font-family-regular
    font-size: $font-size-12
    color: $color-text-main
    letter-spacing: 0.3px

  .order-btn
    box-shadow: 0 -1px 0 0 #E8EAEE
    position: fixed
    bottom: 0
    left: 0
    height: 50px
    padding: 0 10px
    box-sizing: border-box
    background: $color-white
    display: flex
    align-items: center
    justify-content: flex-end
    width: 100vw
    .btn
      background: $color-white
      font-size: $font-size-14
      font-family: $font-family-regular
      height: 30px
      line-height: 30px
      width: 95px
      text-align: center
      display: inline-block
      border-radius: 2px
      margin-left: 10px
      border-1px(#C8CACF, 14.5px)
      color: $color-text-main
      &:last-child
        border-1px($color-main, 14.5px)
        color: $color-main
</style>
