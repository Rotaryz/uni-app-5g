<template>
  <div class="category">
    <scroll-view :scroll-into-view="scrollInto" scroll-x class="category-tab">
      <div class="tab-con none-scrollbar">
        <view v-for="(item, idx) in categoryTab" :key="item.id" :id="'tab'+item.id" class="tab-item font-regular" :class="{active: idx === tabIndex}" @click="tabTap(idx)">
          {{item.name}}
        </view>
        <div :style="{left: (tabIndex)*84+'px'}" class="tab-line"><div class="line"></div></div>
      </div>
    </scroll-view>
    <swiper :current="tabIndex" class="swiper-box" :duration="durationTime" @change="changeTab">
      <swiper-item v-for="(tabItem,tabIndex) in categoryTab" :key="tabIndex">
        <scroll-view :scroll-top="scrollTop" lower-threshold="300" class="list-scroll-content" scroll-y @scrolltolower="_getListData">
          <div class="list-content">
            <div v-for="(item, idx) in listData" :key="idx" class="item-con">
              <goods-item :goods="item"></goods-item>
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
  import goodsItem from './goods-item'
  import categoryData from './category-data'

  const PAGE_NAME = 'CATEGORY'
  const CATEGORY = [
    { name: '家用百货', id: 1 },
    { name: '食品酒类', id: 2 },
    { name: '服装饰品', id: 3 },
    { name: '家用电器', id: 4 },
    { name: '美妆个护', id: 5 },
    { name: '办公文具', id: 6 },
    { name: '体育用品', id: 7 }
  ]

  export default {
    name: PAGE_NAME,
    components: {
      goodsItem
    },
    data() {
      return {
        categoryTab: CATEGORY,
        tabIndex: 0,
        durationTime: 300,
        scrollTop: 0,
        scrollInto: 'tab0',
        oldScrollTop: 0,
        listData: [],
        page: 1,
        hasMore: true,
        onLoading: false,
        testData: []
      }
    },
    onLoad() {
      this._getListData()
    },
    onPullDownRefresh() {
      console.log('onPullDownRefresh...')
      this._getListData('', true)
    },
    methods: {
      initData() {
        this.page = 1
        this.hasMore = true
        this.listData = []
      },
      _getListData(e, isRefresh = false) {
        // if (!this.hasMore) return
        this.onLoading = true
        e && this.page++
        API.Goods.getGoodsList({ data: {keyword: '', limit: 10, page: this.page} }).then(res => {
          // if (this.page === 1) this.listData = []
          // if ([0, 2, 5].includes(this.tabIndex)) this.listData = [...this.listData, ...res.data]
          // console.log(JSON.stringify(res.data))
          if (this.page === 1) {
            this.listData = res.data
            // this.testData = res.data
          } else {
            this.listData = [...this.listData, ...categoryData.categoryData]
            this.categoryTab[0].name = this.page * categoryData.categoryData.length
          }
          // this.hasMore = res.meta.current_page < res.meta.last_page
          isRefresh&&uni.stopPullDownRefresh()
        })
      },
      // 顶部分类点击切换
      tabTap(tabIndex) {
        if(this.tabIndex === tabIndex) return
        // 相邻的才要动画
        if(this.tabIndex === tabIndex + 1 || this.tabIndex === tabIndex - 1) {
          this.durationTime = 300
        } else {
          this.durationTime = 0
        }
        this.tabIndex = tabIndex
        let scrollIndex = tabIndex < 3 ? 0 : tabIndex - 2
        this.scrollInto = 'tab' + this.categoryTab[scrollIndex].id
      },
      // swiper切换
      changeTab(e) {
        // // 回到顶部
        // this.scrollTop = this.oldScrollTop
        // this.$nextTick(function() {
        //   this.scrollTop = 0
        // })
        this.tabIndex = e.target.current
        this.initData()
        this._getListData()
      },
      // scroll: function(e) {
      //   this.oldScrollTop = e.detail.scrollTop
      // },
      // 购买按钮
      goToBuy() {}
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
    margin: 0 5px
    display: flex
    border-bottom-1px()
    .tab-item
      box-sizing: border-box
      min-width: 84px
      height: 45px
      line-height: 45px
      text-align: center
      font-size: 14px
      color: $color-text-main
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
    width: 105%
    height: 100%
  .list-content
    width: 100vw
    padding: $list-margin 0 $list-margin $list-margin
    display: flex
    flex-wrap: wrap
    .item-con
      width: 50%
      height: 291px
      padding-right: $list-margin
      padding-bottom: $list-margin
      box-sizing border-box

  .font-regular
    font-family: $font-family-regular
</style>
