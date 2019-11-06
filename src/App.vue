<script>
    import {getProvider, getCode, getSetting} from './utils/login.js'
    import { globalMethods } from '@/state/helpers'

    export default {
        data: {
            title: 0
        },
        async onLaunch() {
            //获取服务商信息
            let provider = await getProvider()
            uni.setStorageSync('provider', provider[0])
        },
        onShow() {
        },
        onHide: function () {
            console.log('App Hide')
        },
        methods:{
            ...globalMethods
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    /*--公共样式--*/
    @import "./design/base.styl"
    @import "./design/variable.styl"


</style>
