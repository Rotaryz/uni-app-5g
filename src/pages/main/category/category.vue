<template>
  <div class="category">
    <scroll-view scroll-x class="category-tab">
      <div class="tab-con none-scrollbar">
        <view v-for="(item, idx) in categoryTab" :key="item.id" class="tab-item font-regular" :class="{active: idx === tabIndex}" @click="tabTap(idx)">
          {{item.name}}
        </view>
        <div :style="{left: (tabIndex)*84+'px'}" class="tab-line"><div class="line"></div></div>
      </div>
    </scroll-view>
    <swiper :current="tabIndex" class="swiper-box" :duration="durationTime" @change="changeTab">
      <swiper-item v-for="(tabItem,tabIndex) in categoryTab" :key="tabIndex">
        <scroll-view :scroll-top="scrollTop" @scroll="scroll" lower-threshold="200" class="list-scroll-content" scroll-y @scrolltolower="_getListData">
          <div class="list-content">
            <div v-for="(item, idx) in listData" :key="idx" class="goods-item">
              <div class="goods-con">
                <img v-if="item.goods_cover_image" :src="item.goods_cover_image" mode="aspectFill" class="goods-img">
                <p class="title no-wrap font-medium">{{item.name}}</p>
                <div class="pay-money middle-big">
                  <span class="money-icon font-regular">¥</span>
                  <span class="num font-bold">{{item.cash_price}}</span>
                  <span class="add-icon font-regular">+</span>
                  <span class="num font-bold">{{ item.bean_price}}</span>
                  <span class="bean-text font-regular">播豆</span>
                </div>
                <div class="price-sale">¥<span class="price-num">{{item.price}}</span></div>
                <div class="buy-btn font-regular" @click="scrollTop = 0">购买</div>
              </div>
            </div>
          </div>
        </scroll-view>
      </swiper-item>
    </swiper>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './helpers'
  import API from '../../../api'
  import categoryData from './category-data'

  const PAGE_NAME = 'CATEGORY'

  export default {
    name: PAGE_NAME,
    data() {
      return {
        categoryTab: categoryData.category,
        tabIndex: 0,
        listData: [],
        durationTime: 300,
        scrollTop: 0,
        oldScrollTop: 0,
        page: 1
      }
    },
    onLoad() {
      console.log('category onLoad')
      this._getListData()
    },
    onPullDownRefresh() {
      console.log('onPullDownRefresh...')
      this._getListData('', true)
    },
    methods: {
      _getListData(e, isRefresh = false) {
        e && this.page++
        API.Good.getGoodsList({ data: {keyword: '', limit: 10, page: this.page} }).then(res => {
          this.page === 1 && (this.listData = [])
          this.listData = [...this.listData, ...res.data]
          isRefresh&&uni.stopPullDownRefresh()
        })
      },
      tabTap(tabIndex) {
        // 相邻的才要动画
        if(this.tabIndex === tabIndex + 1 || this.tabIndex === tabIndex - 1) {
          this.durationTime = 300
        } else {
          this.durationTime = 0
        }
        this.page = 1
        this.tabIndex = tabIndex
        this._getListData()
      },
      // swiper切换
      changeTab(e) {
        // 回到顶部
        this.scrollTop = this.oldScrollTop
        this.$nextTick(function() {
          this.scrollTop = 0
        })
        this.tabTap(e.target.current)
      },
      scroll: function(e) {
        this.oldScrollTop = e.detail.scrollTop
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /*@import "~@design"*/
  $list-margin = 5px

  .category
    position: absolute
    bottom: 0
    width: 100%
    height: 100%
  .category-tab
    background: #ffffff
  .tab-con
    position: relative
    padding: 0 5px
    display: flex
    border-bottom: 0.5px solid #E8EAEE
    .tab-item
      box-sizing: border-box
      min-width: 84px
      height: 45px
      line-height: 45px
      text-align: center
      font-size: 14px
      color: #2B2F37
      &.active
        font-family: PingFangSC-Medium
        font-size: 16px
    .tab-line
      position: absolute
      bottom: 0
      left: 0
      width: 84px
      display: flex
      align-items: center
      justify-content: center
      transition: all 0.25s
      .line
        width: 30px
        height: 2.5px
        border-radius: 1.5px
        background: #D83F35
  .swiper-box
    height: calc(100% - 45px)
  .list-scroll-content
    height: 100%
  .list-content
    padding: $list-margin 0 $list-margin $list-margin
    display: flex
    flex-wrap: wrap
    .goods-item
      width: 50%
      height: 291px
      padding-right: $list-margin
      padding-bottom: $list-margin
      box-sizing border-box
      .goods-con
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
          color: #2B2F37
          text-overflow: ellipsis
          overflow: hidden
          white-space: nowrap
        .price-sale
          font-size: 11px
          color: #979BA5
          text-decoration-line line-through
          padding: 7px 10px 19px
        .pay-money
          padding: 0 10px
          color: #FE7062
          display: flex
          align-items: flex-end
          .money-icon
            font-size: 14px
            line-height: 1
          .num
            font-size: 16px
            line-height: 1
            transform: translateY(2px)
          .add-icon
            font-size: 16px
            line-height: 1
            margin:0 1px
          .bean-text
            font-size: 13px
            line-height: 1
            margin-left:2px
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
          background: #19B6B4
          border-radius: 2px

  .font-bold
    font-family: DINAlternate-Bold
  .font-regular
    font-family: PingFangSC-Regular
  .font-medium
    font-family: PingFangSC-Medium
  .no-wrap
    text-overflow: ellipsis
    overflow: hidden
    white-space: nowrap
  .none-scrollbar
    &::-webkit-scrollbar
      width :0
      height :0
      background-color:rgba(0,0,0,0)
      display:none
    &::-webkit-scrollbar-button
      background-color:rgba(0,0,0,0)
    &::-webkit-scrollbar-track
      background-color:rgba(0,0,0,0)
    &::-webkit-scrollbar-track-piece
      background-color:rgba(0,0,0,0)
    &::-webkit-scrollbar-thumb
      background-color:rgba(0,0,0,0)
    &::-webkit-scrollbar-corner
      background-color:rgba(0,0,0,0)
    &::-webkit-scrollbar-resizer
      background-color:rgba(0,0,0,0)
    &.-o-scrollbar
      -moz-appearance: none !important
      background: rgba(0,255,0,0) !important
    &::-o-scrollbar-button
      background-color:rgba(0,0,0,0)
    &::-o-scrollbar-track
      background-color:rgba(0,0,0,0)
    &::-o-scrollbar-track-piece
      background-color:rgba(0,0,0,0)
    &::-o-scrollbar-thumb
      background-color:rgba(0,0,0,0)
    &::-o-scrollbar-corner
      background-color:rgba(0,0,0,0)
    &::-o-scrollbar-resizer
      background-color:rgba(0,0,0,0)

</style>
