<template>
  <div class="test">
    test
  </div>
</template>

<script type="text/ecmascript-6">
  import {globalMethods} from '@/store'
  // import API from '@api'

  const PAGE_NAME = 'TEST'

  export default {
    name: PAGE_NAME,
    data() {
      return {}
    },
    onLoad() {
      console.log(this)
    },
    methods:{
      ...globalMethods,
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /*@import "~@design"*/

  .test
    width: 100%
</style>
