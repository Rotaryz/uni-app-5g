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
        let param = {
            code: e.code,
            encryptedData: e.encryptedData,
            iv: e.iv
        }
        return new Promise((resolve,reject) => {
            uni.request({
                url:'https://exchange-platform-api.jkweixin.com/exchange-platform/customer/customer/auth/post-login',
                method:"GET",
                data:param,
                success:function(rs){
                    if(rs.data.error_code===0){
                        //储存用户信息到本地
                        let data = rs.data || {}
                        uni.setStorageSync('userInfo', data.customer_info)
                        uni.setStorageSync('token', data.access_token)
                        resolve(res)
                    }else{
                        uni.showToast({
                            icon: 'none',
                            title: rs.error,
                            duration: 2000
                        })
                    }
                },
                fail(err){
                    reject(err)
                }
            })
        })


    },
    /**
     * 收集formId
     * @param data
     * @param loading
     * @returns {*}
     */
    getFormId(param) {
        uni.request({
            url:'https://exchange-platform-api.jkweixin.com/exchange-platform/customer/customer/customer/collect-formid',
            method:"GET",
            data:param,
            success:function(rs){
            }
        })
    }
}
