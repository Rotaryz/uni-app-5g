import request from '@/utils/http'

export default {
  /**
   * 首页页面详情
   * @param data
   * @param loading
   * @returns {*}
   */
  homeDetail(args) {
    console.log(uni.getStorageSync('token'),'uni.getStorageSync(\'token\')')
    const url = `/customer/content/module/page`
    return request.get({ url, ...args })
  },
  /**
   * 公司信息
   * @param data
   * @param loading
   * @returns {*}
   */
  companyDetail(args) {
    const url = `/customer/shop/shop-manager/show`
    return request.get({ url, ...args })
  }
}
