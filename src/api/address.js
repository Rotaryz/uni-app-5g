import request from '@/utils/http'

export default {
  // 增加地址
  addAddress(args) {
    const url = `/customer/customer/receiver-address/create`
    return request.post({ url, ...args })
  },
  // 删除地址
  deleteAddress(args) {
    const url = `/customer/customer/receiver-address/destroy`
    return request.get({ url, ...args })
  },
  // 地址列表
  getAddressList(args) {
    const url = `/customer/customer/receiver-address/index`
    return request.get({ url, ...args })
  },
  // 编辑地址
  editAddress(args) {
    const url = `/customer/customer/receiver-address/update`
    return request.post({ url, ...args })
  },
  // 设置默认地址
  setDefaultAddress(args) {
    const url = `/customer/customer/receiver-address/set-status`
    return request.post({ url, ...args })
  },
  // 获取地址详情 or 获取默认地址 is_default 0 id:0
  getAddressDetail(args) {
    const url = `/customer/customer/receiver-address/show`
    return request.get({ url, ...args })
  },
  // 获取地址详情 or 获取默认地址 is_default 0 id:0
  getDefaultAddress(loading = false) {
    const url = `/customer/customer/receiver-address/show`
    return request.get({
      url,
      loading,
      data: {
        is_default: 1,
        id: 0
      }
    })
  }
}
