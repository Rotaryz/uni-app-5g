<template>
  <div class="index">
    index
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './helpers'
  import API from '../../../api'

  const PAGE_NAME = 'INDEX'

  export default {
    name: PAGE_NAME,
    data() {
      return {}
    },
    async onLoad() {
      this.$API.Good.demo({
        data: {code: 'customer_index'}
      })
        .then((res) => {
          console.log(res, 'ok')
        })
        .catch((err) => {
          console.log(err, '5454')
        })
      // console.log(this.$routes.main.MINE)
      uni.navigateTo({url: this.$routes.main.MINE})
      // let res = await this.$API.Good.demo({
      //   data: {code: 'customer_index'},
      //   doctor(res) {
      //     console.log(res.message)
      //   }
      // })
      // console.log(res)
      // console.log('sdfsd')
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /*@import "~@design"*/

  .index
    width: 100%
</style>
