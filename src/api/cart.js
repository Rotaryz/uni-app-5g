import request from '@/utils/http'

export default {
  // 获取购物车列表
  getList(args) {
    const url = `/customer/bean-cart/cart/index`
    return request.get({ url, ...args })
  },
  // 加入购物车
  addToCart(args) {
    const url = `/customer/bean-cart/cart/create`
    return request.get({ url, ...args })
  },
  // 获取购物车数量
  getCartCount(args) {
    const url = `/customer/bean-cart/cart/total`
    return request.get({ url, ...args })
  },
  // 删除购物车商品
  deleteGoods(args) {
    const url = `/customer/bean-cart/cart/clear`
    return request.post({ url, ...args })
  },
  // 购物车商品数量改变
  setGoodsNum(args) {
    const url = `/customer/bean-cart/cart/update`
    return request.post({ url, ...args })
  }
}
