import request from '../utils/http'

export default {
  /**
   * 模板
   * @param data
   * @param loading
   * @returns {*}
   */
  demo(args) {
    const url = `/customer/content/module/show`
    return request.get({url, ...args})
  },
  // ---- 商品列表 ---- keyword category_id limit page
  getGoodsList(args) {
    const url = `/customer/platform-goods/goods/index`
    return request.get({ url, ...args })
  }
}
