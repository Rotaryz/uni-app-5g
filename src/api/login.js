import request from '@/utils/http'
export default {
    /**
     * 模板
     * @param data
     * @param loading
     * @returns {*}
     */
    //登录授权
    getToken(e) {
        //获取服务商信息
        // let provider = await getProvider();
        //获取code
        // let code = await getCode(provider[0])
        //小程序授权微信
        let data = {
            code: e.code,
            encryptedData: e.encryptedData,
            iv: e.iv
        }
        const url = '/customer/customer/auth/post-login'
         return request.get({ url, data })
    },
    /**
     * 收集formId
     * @param data
     * @param loading
     * @returns {*}
     */
    getFormId(param) {
        const url = '/customer/customer/customer/collect-formid'
        return request.get({ url, ...param })
    }
}
