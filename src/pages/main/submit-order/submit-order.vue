<template>
  <div class="submit-order">
    <navigation-bar title="提交订单"></navigation-bar>

  </div>
</template>

<script type="text/ecmascript-6">
  import NavigationBar from '@/components/navigation-bar/navigation-bar'

  const PAGE_NAME = 'SUBMIT_ORDER'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar
    },
    data() {
      return {
      }
    },
    onShow() {
    },
    // 页面销毁时
    onUnload() {
    },
    computed: {
    },
    methods: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
