import request from '@/utils/http'

export default {
  // 企业介绍[PM_1.3]
  getShopInfo(args) {
    const url = `/customer/shop/shop-manager/show`
    return request.get({ url, loading: false, ...args })
  },
  // 店铺记录
  getShopRecode() {
    const url = `/customer/customer/customer/shop-history-list`
    return request.get({ url, loading: false })
  },
}
