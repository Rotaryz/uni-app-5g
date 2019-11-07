import request from '@/utils/http'

export default {
  /**
   * 获取播豆兑换券数
   * @param args
   * @returns {*}
   */
  getIntegralBeanCount(args) {
    const url = `/customer/customer/integral-bean/total`
    return request.get({ url, ...args })
  },
  /**
   * 获取广告位
   * @param args
   * @returns {*}
   */
  adShow(args) {
    const url = `/common/content/ad/show`
    return request.get({ url, ...args })
  },
  /**
   * 获取用户详情
   * @param args
   * @returns {*}
   */
  getUserInfo(args) {
    const url = `/customer/customer/customer/show`
    return request.get({ url, ...args })
  }
}
