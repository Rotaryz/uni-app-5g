/**
 * 模板
 * @param data
 * @param loading
 * @returns {*}
 */
const check = () => {
    const promise = new Promise((resolve, reject) => {
        uni.checkSession({
            success() {
                console.log('状态未过期')
                //未过期
                resolve(0)
            },
            fail() {
                console.log('状态已过期')
                //已过期
                resolve(1)
            }
        })
    }).catch(res => {
        uni.showToast({
            icon: 'none',
            title: res.errMsg || '验证session失效',
            duration: 2000
        });
    })

    return promise
}

//获取服务商信息
const getProvider = () => {
    const promise = new Promise((resolve, reject) => {
        uni.getProvider({
            service: 'oauth', //服务类型  登录授权
            success: function (res) {
                resolve(res.provider)
            },
            fail(res) {
                reject(res)
            }
        });
    }).catch(res => {
        uni.showToast({
            icon: 'none',
            title: res.errMsg || '获取服务商信息失败',
            duration: 2000
        });
    })

    return promise
}

//获取code
const getCode = (provider) => {
    if (!provider) {
        uni.showToast({
            icon: 'none',
            title: '获取服务商信息失败',
            duration: 2000
        });
        return
    }

    const promise = new Promise((resolve, reject) => {
        uni.login({
            provider: provider,
            success: function (loginRes) {
                if (loginRes && loginRes.code) {
                    resolve(loginRes.code)
                } else {
                    reject(loginRes)
                }
            }
        });
    }).catch(res => {
        uni.showToast({
            icon: 'none',
            title: res.errMsg || '获取code失败',
            duration: 2000
        });
    })

    return promise
}


//验证授权状态 2未操作 1已经授权  0拒绝授权
const getSetting = () => {
    const promise = new Promise((resolve, reject) => {
        uni.getSetting({
            success(res) {
                let authSetting = res.authSetting
                //授权成功
                if (authSetting['scope.userInfo']) {
                    resolve(1)
                    return
                }
                //拒绝授权
                if (authSetting['scope.userInfo'] === false) {
                    resolve(0)
                    return
                }
                resolve(2)
            },
            fail(res) {
                console.log(111)

                reject(res)
            }
        })
    }).catch(res => {
        uni.showToast({
            icon: 'none',
            title: res.errMsg || '获取授权状态失败',
            duration: 2000
        });
    })

    return promise
}
export {check,getProvider,  getCode, getSetting}
