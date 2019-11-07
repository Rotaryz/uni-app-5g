<template>
  <div class="submit-order">
    <div class="content-wrap">
      <div class="address-box">
        <div v-if="address.name" class="address-wrap" @click="goMyAddress">
          <img src="./icon-address@2x.png" class="address-icon">
          <div class="address-info">
            <div class="person">
              <span class="name">{{address.name}}</span>
              <span class="phone">{{address.mobile}}</span>
            </div>
            <div class="address">
              {{address.province}}{{address.city}}{{address.district}}{{address.address}}
            </div>
          </div>
          <img src="./icon-arrow-right@2x.png" class="arrow-right">
        </div>
        <div v-else class="address-wrap no-address-wrap" @click="goAddAddress">
          <img src="./icon-adddz@2x.png" class="address-icon">
          <div class="address-info">
            请添加收货地址
          </div>
          <img src="./icon-arrow-right@2x.png" class="arrow-right">
        </div>
        <img src="./pic-address@2x.png" class="address-image-border">
      </div>
      <ul class="order-list">
        <li v-for="(item,i) in order.list" :key="i" class="goods-item">
          <div class="item-wrap">
            <img class="good-img" mode="aspectFill" :src="item.image" alt="">
            <div class="info">
              <div class="name">{{item.name}}</div>
              <div class="spec">
                <span v-for="(sp,idx) in item.specification" :key="idx" class="spec-item">{{sp.name}}:{{sp.value}}</span>
              </div>
              <div class="num-wrap">
                <div class="pay-money small common">
                  <span class="money-icon">¥</span>
                  <span class="num">{{item.cashPrice}}</span>
                  <span class="add-icon">+</span>
                  <span class="num">{{item.beanPrice}}</span>
                  <span class="bean-text">播豆</span>
                </div>
                <div class="count">x <span class="count-num">{{item.count}}</span></div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="statistics">
      <div class="statistics-item">
        <div class="label">商品总额</div>
        <div>¥{{totalCashPrice}}</div>
      </div>
      <div class="statistics-item bean-item">
        <div class="label">需要播豆</div>
        <div><span class="tip-text">（可用{{canUseBeanCount}}）</span>{{totalBean}}</div>
      </div>
      <div class="statistics-item express-fee">
        <div class="label">快递运费</div>
        <div>包邮</div>
      </div>
      <div class="statistics-item pay-total-item">
        <div class="label">实付金额</div>
        <div class="pay-money middle-small common">
          <span class="money-icon">¥</span>
          <span class="num">{{totalCashPrice}}</span>
          <span class="add-icon">+</span>
          <span class="num">{{totalBean}}</span>
          <span class="bean-text">播豆</span>
        </div>
      </div>
    </div>
    <div class="footer-wrap" :style="{'padding-bottom':statusBarHeight>20 ? '20px':''}">
      <div class="footer" :style="{'padding-bottom':statusBarHeight>20 ? '20px':''}">
        <div class="v-bottom">
          <div class="hj-text">合计：</div>
          <div class="pay-money middle-total">
            <span class="money-icon">¥</span>
            <span class="num">{{totalCashPrice}}</span>
            <span class="add-icon">+</span>
            <span class="num">{{totalBean}}</span>
            <span class="bean-text">播豆</span>
          </div>
        </div>
        <form report-submit="true" @submit="$getFormId">
          <button formType="submit" class="button-primary submit-btn" @click="submitBtn">确认支付</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '@/api'
  import { cartComputed, cartMethods } from '@/store/helpers'

  const PAGE_NAME = 'SUBMIT_ORDER'

  export default {
    name: PAGE_NAME,
    components: {
    },
    data() {
      return {
        canUseBeanCount: 0,
        address: {
          id: 0,
          name: '',
          mobile: 0,
          address: ''
        }
      }
    },
    onShow() {
      let address = this.$storage('address')
      this._getDefaultAddress(address)
      this._getBeanCount()
    },
    // 页面销毁时
    onUnload() {
      this.SET_ORDER({ list: [], type: '' })
    },
    computed: {
      ...cartComputed,
      // 播豆
      totalBean() {
        if (!this.order.list.length) return 0
        let total = this.order.list.map(item => item.beanPrice * item.count || 0).reduce((total, num) => {
          return Number(total) + Number(num)
        })
        total = Number(total).toFixed(0)
        return total
      },
      // 商品总价
      totalCashPrice() {
        if (!this.order.list.length) return 0
        let total = this.order.list.map(item => item.cashPrice * item.count || 0).reduce((total, num) => {
          return Number(total) + Number(num)
        })
        total = Number(total).toFixed(2)
        return total
      }
    },
    methods: {
      ...cartMethods,
      // 获取当前播豆数
      _getBeanCount() {
        API.Mine.getIntegralBeanCount().then(res => {
          this.canUseBeanCount = (res.data && res.data.bean && res.data.bean.available) || 0
        })
      },
      // 获取默认地址
      _getDefaultAddress(address) {
        if (address && address.name) {
          this.$set(this, 'address', address)
          this.$storage('address', {})
          return false
        }
        API.Address.getDefaultAddress().then(res => {
          this.$set(this, 'address', res.data)
        }).catch(res => {
          // console.log('catch', res)
        })
      },
      // 去新增地址
      goAddAddress() {
        unit.navigateTo({ url: this.$routes.personal.NEW_ADDRESS })
      },
      // 去地址页面选择地址
      goMyAddress() {
        unit.navigateTo({ url: this.$routes.personal.MY_ADDRESS + '?save=1' })
      },
      // 确认支付下单
      submitBtn() {
        // if (!this.$checkToken()) return false
        if (!this.address.id) {
          unit.showToast({ title: '请选择收货地址', icon: 'none' })
          return
        }
        let data = {}
        // 商品详情立即购买
        if (this.order.type === 'goods_detail') {
          data.goods = this.order.list.map(item => {
            return {
              goods_id: item.id,
              goods_spec_id: item.spec_id,
              num: item.count
            }
          })
          //   购物车列表选择购买
        } else {
          data.cart = this.order.list.map(item => {
            return {
              cart_id: item.id
            }
          })
        }
        data.address_id = this.address.id
        API.Order.placeOrder({ data, loading: false }).then(res => {
          this._payFor(res.data.pay_config).then(() => {
            unit.showToast({ title: '支付成功' })
            unit.redirectTo({ url: this.$routes.main.PAY_SUCCESS + '?id=' + res.data.id })
          }).catch(() => {
            unit.redirectTo({ url: this.$routes.main.ORDER_DETAIL + '?id=' + res.data.id })
          })
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .submit-order
    .content-wrap
      padding: 0 15px 0
      .address-box
        background: $color-white
        border-radius: 6px
        margin-top: 10px
        margin-bottom: 10px
        position: relative

        .address-wrap
          box-sizing: border-box
          height: 88px
          padding: 13px 14px 13px 14px
          display: flex
          align-items: center
          &.no-address-wrap
            align-items: center

            .arrow-right
              margin-top: 0

          .arrow-right
            width: 13px
            height: 13px
            flex-shrink 0
            margin-left: 20px

          .address-info
            flex: 1
            width: 0
            font-size: $font-size-14

            .person
              color: $color-text-main
              margin-bottom: 8px
              display: flex

            .name
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
              font-size: $font-size-16

            .phone
              margin-left: 14px
              font-size: $font-size-16

            .address
              line-height: 16px
              padding: 0 10px 5px 0
              font-size: $font-size-13
              font-family: $font-family-regular
              color: $color-text-sub
              white-space: nowrap
              overflow: hidden
              text-overflow: ellipsis

          .address-icon
            width: 18px
            height: 18px
            flex-shrink 0
            margin-top: -2px
            margin-right: 12px


        .address-image-border
          position: absolute
          bottom: 0
          left: 0
          right 0
          height: 5px
          width: 100%
          border-radius: 0 0 5px 5px

      .order-list
        border-radius: 6px
        overflow: hidden

        .goods-item
          background-color: $color-white
          box-sizing: border-box
          padding: 0 10px

          .item-wrap
            display: flex
            align-items: center
            padding: 15px 0px
            height: 90px
            border-bottom-1px()

          .good-img
            flex-shrink: 0
            height: 100%
            width: 90px
            margin-right: 8px
            border-radius: 3px

          .info
            height: 100%
            flex: 1
            width: 0
            display: flex
            flex-direction: column
            justify-content: space-between

            .name
              color: $color-text-main
              font-size: $font-size-14
              line-height: 14px
              white-space: nowrap
              overflow: hidden
              text-overflow: ellipsis
              font-bold()
              margin-top: 3px

            .spec
              color: $color-text-sub
              font-size: $font-size-13
              margin-bottom: 21px

              .spec-item
                margin-right: 10px

              .count
                font-size $font-size-14
                color: $color-text-sub

                .count-num
                  font-size $font-size-14
                  margin-left: 2px


            .num-wrap
              width: 100%
              display flex
              align-items flex-end
              justify-content space-between
              font-size $font-size-13
              .num
                font-family: $font-family-regular

              .count
                font-size: $font-size-14

          &:first-child   .item-wrap
            border-none()

    .statistics
      background-color $color-white
      padding: 15px 15px 0
      margin: 10px 15px
      border-radius: 6px

      .statistics-item
        display: flex
        align-items: center
        justify-content: space-between
        font-size: $font-size-14
        padding: 9px 0 15px 0

        &.pay-total-item
          padding: 15px 0 16px 0
          border-top-1px()

          .num
            font-bold()


        .label
          color: $color-text-main
          letter-spacing: 0.6px
          font-size: $font-size-14

    .footer-wrap
      height: 55px

    .footer
      border-top-1px()
      display: flex
      justify-content: space-between
      align-items: center
      height: 55px
      background-color: $color-white
      position: fixed
      bottom: 0px
      width: 100vw

      .hj-text
        font-size: $font-size-14
        padding-left:15px

      .v-bottom
        display: flex
        align-items: flex-end

      .submit-btn
        height: 40px
        line-height: 40px
        width: 120px
        border-radius: 20px
        text-align: center
        background-color: $color-main
        color: $color-white
        font-size: $font-size-14
        margin-right:15px

    .tip-text
      color: $color-text-sub
      font-size: 12px
      letter-spacing: 0.51px
    .pay-money
      color: $color-red
      display: flex
      align-items: flex-end
      .money-icon
       margin-right:1px
       font-size: $font-size-11
       line-height:$font-size-11
       transform: translateY(-1px)

      .num
        font-size $font-size-14
        line-height:$font-size-14
        font-bold()

      .add-icon
        font-size $font-size-14
        line-height:$font-size-14
        margin:0 1px
        transform: translateY(-1px)
      .bean-text
        font-size: $font-size-12
        line-height: $font-size-12
        margin-left:2px
        transform: translateY(-1px)
      &.common
        color: $color-text-main
    .middle-total
      .money-icon
        font-size $font-size-13
        line-height:$font-size-13
      .num
        font-size $font-size-19
        line-height:$font-size-19
      .add-icon
        font-size $font-size-19
        line-height:$font-size-19

      .bean-text
        font-size: $font-size-15
        line-height: $font-size-15
        font-bold()

    //  提交订单单个金额
    .small
      .money-icon
        font-size: $font-size-11
        line-height:$font-size-11

      .num
        font-size: $font-size-14
        line-height:$font-size-14

      .add-icon
        font-size: $font-size-14
        line-height:$font-size-14

      .bean-text
        font-size: $font-size-12
        line-height: $font-size-12
</style>
