import request from '../utils/http'

export default {
  // ---- 商品分类列表---- pid
  getCategoryList(args) {
    const url = `/customer/platform-goods/category/index`
    return request.get({ url, ...args })
  },
  // ---- 商品列表 ---- keyword category_id limit page
  getGoodsList(args) {
    const url = `/customer/platform-goods/goods/index`
    return request.get({ url, ...args })
  },
  // ---- 兑换商品列表 ---- keyword category_id limit page
  getExchangeGoodsList(args) {
    const url = `/customer/shop-goods/goods/index`
    return request.get({ url, ...args })
  },
  // 商品详情
  getGoodsDetail(args) {
    const url = `/customer/platform-goods/goods/show`
    return request.get({ url, ...args })
  }
}
