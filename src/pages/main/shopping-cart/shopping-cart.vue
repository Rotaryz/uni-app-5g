<template>
  <view class="shopping-cart">
    <view class="list-con">
      <view v-for="(item) in listData" :key="item.id" class="item">
        <uni-swipe-action :options="options" @click="_deleteGoods(item)">
          <view class="item-con">
            <div class="item-left">
              <div v-if="item.saleable && item.status" :class="{checked: item.select}" class="item-checked"
                   @click="checkedGoods(item)"></div>
              <div v-else class="lose-tips">失效</div>
            </div>
            <img class="goods-img" mode="aspectFill" :src="item.goods_cover_image">
            <div class="goods-info">
              <div class="top-box">
                <div class="name no-wrap">{{item.name}}</div>
                <div v-if="item.goods_spec&&item.goods_spec.specs_attrs" class="specs no-wrap">
                    <span v-for="(sp,idx) in item.goods_spec.specs_attrs" :key="sp.attr_key" class="spec-item">
                      {{sp.attr_key}}:{{sp.attr_value}}{{idx ===item.goods_spec.specs_attrs.length-1 ? '' :',' }}
                    </span>
                </div>
              </div>
              <div class="bottom-box">
                <div class="price">
                  <span class="money-icon">¥</span>
                  <span class="num">{{item.goods_spec.cash_price}}</span>
                  <span class="add-icon">+</span>
                  <span class="num">{{item.goods_spec.bean_price}}</span>
                  <span class="bean-text">播豆</span>
                </div>
                <div class="counter">
                  <div :class="['icon', 'minus',{disable:item.num<=1}]" @click="_goodsCounter(item, -1)">
                    <span class="text"></span>
                  </div>
                  <input :value="item.num" type="number" class="input-inner">
                  <div class="icon add" @click="_goodsCounter(item, 1)"><span class="text"></span> <span
                          class="text"></span></div>
                </div>
              </div>
            </div>
          </view>
        </uni-swipe-action>
      </view>
    </view>
    <view class="bottom-bar">
      <div class="total-info">
        <div :class="{checked: selectAll}" class="item-checked" @click="selectAllGoods"></div>
        <div class="label" @click="selectAllGoods">全选</div>
        <div class="label label-hj">合计：</div>
        <div class="pay-money">
          <span class="money-icon">¥</span>
          <span class="num">{{total.cashPrice}}</span>
          <span class="add-icon">+</span>
          <span class="num">{{total.beanPrice}}</span>
          <span class="bean-text">播豆</span>
        </div>
      </div>
      <div class="button-primary submit-btn" @click="settlement">去结算</div>
    </view>
  </view>
</template>

<script type="text/ecmascript-6">
  import API from '../../../api'
  import uniSwipeAction from '../../../components/uni-swipe-action/uni-swipe-action.vue'
  import { cartMethods } from '../../../store/helpers'

  const PAGE_NAME = 'SHOPPING_CART'

  export default {
    name: PAGE_NAME,
    components: {
      uniSwipeAction
    },
    data() {
      return {
        options: [{text: '删除'}],
        listData: [],
        selectArr: {},// 存储勾选的id
        selectCount: 0,// 勾选数量
        canSelectCount: 0// 可以勾选的数量
      }
    },
    computed: {
      selectAll() {
        // 勾选的数量 = 可以勾选的数量就是全选
        return this.canSelectCount && this.selectCount === this.canSelectCount
      },
      total() {
        if (this.selectCount) {
          let cashPrice = 0
          let beanPrice = 0
          this.listData.map((item) => {
            if (item.select) {
              cashPrice += Number(item.goods_spec.cash_price * item.num)
              beanPrice += Number(item.goods_spec.bean_price * item.num)
            }
          })
          cashPrice = cashPrice.toFixed(0)
          beanPrice = beanPrice.toFixed(0)
          return {cashPrice: cashPrice, beanPrice: beanPrice}
        }
        return {cashPrice: 0, beanPrice: 0}
      }
    },
    onPullDownRefresh() {
      console.log('onPullDownRefresh...')
      this._getListData(true)
    },
    onShow() {
      this._getListData()
    },
    methods: {
      ...cartMethods,
      setListData(res) {
        // 清除勾选计数
        this.selectCount = 0
        this.canSelectCount = 0
        // 遍历数组，增加select字段作为勾选判断
        this.listData = res.map(item => {
          item.select = !!this.selectArr[item.id]
          item.select && this.selectCount++
          // 不是失效商品，可以勾选的数量+1
          if (item.saleable && item.status) {
            this.canSelectCount++
          }
          return item
        })
      },
      _getListData(isRefresh=false) {
        API.Cart.getList({ data: { limit: 0, page: 1 } }).then(res => {
          this.setListData(res.data.list)
          isRefresh&&uni.stopPullDownRefresh()
        })
      },
      // 单个勾选商品
      checkedGoods(item) {
        if (item.saleable < item.num) return
        item.select = !item.select
        this.selectArr[item.id] = item.select
        this.selectCount = this.selectCount + (item.select ? 1 : -1)
      },
      // 全选
      selectAllGoods() {
        if (!this.canSelectCount) {
          uni.showToast({icon:"none", title:"暂没有可以选择的宝贝~"})
          return false
        }
        // this.selectAll代表点击全选按钮之前是否为全选
        this.listData.forEach((item) => {
          // 判断是否为失效商品
          if (item.saleable && item.status) {
            item.select = !this.selectAll
            this.selectArr[item.id] = item.select
          }
        })
        this.selectCount = this.selectAll ? 0 : this.canSelectCount
      },
      // 计数器
      _goodsCounter(item, val) {
        if (item.num <= 1 && val < 0) return
        item.num = item.num + val
        API.Cart.setGoodsNum({ data: { spec_id: item.spec_id, num: item.num }, loading: false }).then(res => {
          this.setListData(res.data.list)
        })
      },
      // 删除商品
      _deleteGoods(item) {
        API.Cart.deleteGoods({ data: { ids: [item.id] }, loading: false }).then(res => {
          this.setListData(res.data.list)
        })
      },
      // 结算
      settlement() {
        let list = this.listData.filter(item => item.select)
        if (list.length <= 0) {
          uni.showToast({ title: '请选择需要提交的商品', icon: 'none' })
          return
        }
        let subList = list.map(item => {
          return {
            name: item.name,
            id: item.id,
            image: item.goods_cover_image,
            specification: item.goods_spec.specs_attrs.map(item => {
              return {
                name: item.attr_key,
                value: item.attr_value
              }
            }),
            count: item.num,
            spec_id: item.spec_id,
            cashPrice: item.goods_spec.cash_price,
            beanPrice: item.goods_spec.bean_price
          }
        })
        console.log(subList)
        this.SET_ORDER({
          list: subList,
          type: 'shopping_cart'
        })
        // uni.navigateTo({ url: this.$routes.main.SUBMIT_ORDER })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /*@import "~@design"*/
  $height = 20px
  $line-width = 14px
  $line-height = 3px

  .shopping-cart
    width: 100%
    padding-bottom: 45px
  .list-con
    padding: 10px
  .item
    height: 120px
    margin-bottom: 10px
    border-radius: 6px
    background: #FFFFFF
    overflow: hidden
    .item-con
      padding-right: 10px
      height: 120px
      display: flex
      align-items: center
      .item-left
        width: 35px
        display: flex
        align-items: center
        justify-content: center
        .lose-tips
          padding: 2.5px 4px
          line-height: 1
          font-size: 10px
          font-family: $font-family-regular
          color: #ffffff
          background: #C8CACF
          border-radius: 7.5px
      .goods-img
        width: 90px
        height: @width
        margin-right: 8px
        border-radius: 1px
      .goods-info
        flex: 1
        height: 84px
        display: flex
        flex-direction: column
        justify-content: space-between
        .name
          width: 100%
          color: $color-text-main
          font-size: 14px
          font-bold()
        .specs
          width: 100%
          color: $color-text-sub
          font-size: 13px
          font-family: $font-family-regular
        .bottom-box
          width: 100%
          display: flex
          justify-content: space-between
          align-items: center
          .price
            color: $color-text-main
            font-family: $font-family-regular
            display: flex
            align-items: flex-end
            .money-icon
              margin-right:1px
              font-size: 11px
              line-height: 1
              transform: translateY(1px)
            .num
              font-size: 17px
              line-height: 1
              font-bold()
              transform: translateY(2px)
            .add-icon
              font-size: 17px
              line-height: 1
              margin:0 1px
              transform: translateY(2px)
            .bean-text
              line-height: 1
              font-size: 13px
              margin-left:2px
      .counter
        flex-shrink 0
        display flex
        align-items center
        .icon
          width: $height
          height: @width
          line-height: @width
          flex-shrink: 0
          text-align center
          color: $color-text-main
          position relative
          font-size $font-size-20
          .text
            display inline-block
            background-color $color-text-main
            width:  $line-width
            height: $line-height
            left:$height*0.5
            top:$height*0.5
          &.minus
            display flex
            justify-content center
            align-items center
            .text
               transform scale(0.5)
          &.add
            position relative
            .text
              position absolute
              left:$height*0.5
              top:$height*0.5
              transform translate(-50%,-50%) scale(0.5)
              &:last-child
                height:  $line-width
                width:$line-height
          &.disable .text
            background-color: $color-text-assist
            opacity 0.3
        .input-inner
          width: 35px
          line-height $height
          height: $height
          font-size: $font-size-14
          text-align center
          background-color $color-background
          border-radius 3px
          font-bold()

  // 选择框样式
  .item-checked
    width: 17px
    height: @width
    display: inline-block
    position: relative
    box-sizing border-box
    border: 1px solid $color-text-sub
    border-radius: 50%
    background-color: #fff
    z-index: 1
    &.checked
     border: none
     width:17px
     height:17px
     background-image url("~@/static/icon-pick@2x.png")
     background-size 100% 100%

  .bottom-bar
    position: fixed
    bottom: 0
    left: 0
    right: 0
    box-sizing: border-box
    width: 100vw
    height: 55px
    padding: 0 10px
    display: flex
    justify-content: space-between
    align-items: center
    z-index: 20
    background-color: #ffffff
    .total-info
      flex: 1
      display: flex
      align-items: center
      .label
        white-space: nowrap
        color: $color-text-main
        font-size: 14px
        margin-left: 5px
        line-height: 14px
        &.label-hj
          margin-left: 10px
      .pay-money
        margin-top: -3px
        color: $color-red
        font-family: $font-family-regular
        display: flex
        align-items: flex-end
        .money-icon
          margin-right:1px
          font-size: 14px
          line-height: 1
          transform: translateY(1px)
        .num
          font-size: 20px
          line-height: 1
          font-bold()
          transform: translateY(2px)
        .add-icon
          font-size: 20px
          line-height: 1
          margin:0 1px
          transform: translateY(2px)
        .bean-text
          line-height: 1
          font-size: 15px
          margin-left:2px
    .submit-btn
      height: 40px
      line-height: 40px
      background-color: $color-main
      color: #ffffff
      border-radius: 20px
      width: 100px
      font-size 14px
      font-family: $font-family-regular
      text-align center
      letter-spacing: 0.8px

  .no-wrap
    text-overflow: ellipsis
    overflow: hidden
    white-space: nowrap
</style>