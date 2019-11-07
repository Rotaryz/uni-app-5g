import request from '@/utils/http'

export default {
  /**
   * 订单列表
   * @param data
   * @param loading
   * @returns {*}
   */
  getOrderList(args) {
    const url = `/customer/bean-order/order/index`
    return request.get({ url, ...args })
  },
  /**
   * 订单列表取消订单
   * @param data
   * @param loading
   * @returns {*}
   */
  cancelOrder(args) {
    const url = `/customer/bean-order/order/close-order`
    return request.get({ url, ...args })
  },
  /**
   * 订单详情（子订单）
   * @param data
   * @param loading
   * @returns {*}
   */
  orderDetail(args) {
    const url = `/customer/bean-order/order/show`
    return request.get({ url, ...args })
  },
  /**
   * 确认收货
   * @param data
   * @param loading
   * @returns {*}
   */
  confirmReceipt(args) {
    const url = `/customer/bean-order/order/confirm-receipt`
    return request.get({ url, ...args })
  },
  /**
   * 订单列表重新支付
   * @param data
   * @param loading
   * @returns {*}
   */
  orderRepay(args) {
    const url = `/customer/bean-order/order/repay`
    return request.get({ url, ...args })
  },
  /**
   * 获取用户详情
   * @param args
   * @returns {*}
   */
  getUserInfo(args) {
    const url = `/customer/customer/customer/show`
    console.log(url)
    return request.get({ url, ...args })
  },
  /**
   * 获取播豆兑换券数
   * @param args
   * @returns {*}
   */
  getIntegralBeanCount(args) {
    const url = `/customer/customer/integral-bean/total`
    return request.get({ url, ...args })
  }
}
