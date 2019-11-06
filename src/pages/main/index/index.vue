<template>
  <div class="index">
    index
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './helpers'
  // import API from '@api'

  const PAGE_NAME = 'INDEX'

  export default {
    name: PAGE_NAME,
    data() {
      return {

      }
    },
	onLoad () {
	    console.log('index onLoad')
	},
    onShow() {
	    console.log('index Show')
	},
    onHide() {
	    console.log('index Hide')
	}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /*@import "~@design"*/

  .index
    width: 100%
</style>
