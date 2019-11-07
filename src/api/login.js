import request from '@/utils/http'
export default {
    /**
     * 模板
     * @param data
     * @param loading
     * @returns {*}
     */
    //登录授权
    getToken(args) {
        const url = '/customer/customer/auth/post-login'
        return request.post({ url, ...args })
    },
    /**
     * 收集formId
     * @param data
     * @param loading
     * @returns {*}
     */
    getFormId(args) {
        const url = '/customer/customer/customer/collect-formid'
        return request.get({ url, ...args })
    },
    /**
     * 获取默认店铺ID
     * @param data
     * @param loading
     * @returns {*}
     */
    getDefaultShop(args) {
        const url = `/common/system/system/get-default-shop-id`
        return request.get({ url, ...args })
    },
}
