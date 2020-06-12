<template>
  <div class="index">
    index
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './helpers'
  import API from '@api'
  // import Demo from './demo/demo'

  const PAGE_NAME = 'INDEX'

  export default {
    name: PAGE_NAME,
    data() {
      return {}
    },
    async onLoad() {
      let res = await API.Banner.getBanner('/app/customer/info', { loading: false})
      console.log(res)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /*@import "~@design"*/

  .index
    width: 100%
</style>