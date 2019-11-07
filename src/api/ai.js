import request from '@/utils/http'

export default {
  /**
   * 行为记录采集[v1.4.4]
   * @param data
   * @param loading
   * @returns {*}
   */
  actionDataCollect(args) {
    const url = `/customer/radar/radar/action-data-collect`
    return request.post({ url, ...args })
  }
}
