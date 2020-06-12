import request from '@utils/http'

export default {
  /**
     * 获取轮播图案例
     * @param data
     * @param loading
     * @returns {*}
  */
  getBanner(url, args) {
      return request.get({ url, ...args })
  },
}