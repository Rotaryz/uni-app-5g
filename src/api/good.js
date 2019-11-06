import request from '../utils/http'

export default {
  /**
   * 模板
   * @param data
   * @param loading
   * @returns {*}
   */
  demo(args) {
    const url = `/customer/content/module/page`
    return request.get({url, ...args})
  },
}
