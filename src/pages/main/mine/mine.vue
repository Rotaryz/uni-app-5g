<template>
  <div class="mine">
    mine
    <div @click="click">11111</div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './helpers'
  // import API from '@api'

  const PAGE_NAME = 'MINE'

  export default {
    name: PAGE_NAME,
    data() {
      return {
      }
    },
    onLoad(){
      console.log(this.$root,this.$root.$mp.page.route)
    },
    methods:{
      click(){
        uni.navigateTo({
          url: this.$routes.main.LOGIN
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /*@import "~@design"*/

  .mine
    width: 100%
</style>
