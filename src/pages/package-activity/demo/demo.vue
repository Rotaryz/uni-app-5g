<template>
  <div class="demo">
    <div v-for="(item, index) in list" :key="index" class="item">
      <text class="red">{{page}}</text>
      <div>{{item}}</div>
      <div>{{item}}</div>
      <div>{{item}}</div>
      <div>{{item}}</div>
      <div>{{item}}</div>
      <div>{{item}}</div>
      <div>{{item}}</div>
      <div>{{item}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './helpers'
  // import API from '@api'

  const PAGE_NAME = 'DEMO'

  export default {
    name: PAGE_NAME,
    data() {
      return {
        list: [],
        page: 1
      }
    },
    onLoad() {
      this.getMore()
    },
    onReachBottom() {
      this.page++
      this.getMore()
    },
    methods: {
      getMore() {
        for (let i = 0; i < 10; i++) {
          this.list.push(`发昆仑山覅按时来开发哈拉开始放假了开始发个图人${i}`)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .item
    display: block
    text-align: center

  .red
    color: red
</style>
