---
to: "src/pages/<%= h.inflection.dasherize(package[0]) %>/<%= h.inflection.dasherize(name) %>/demo/demo.vue"
---
<template>
  <div class="<%= h.inflection.dasherize(name) %>">
    <%= h.inflection.dasherize(name) %>
  </div>
</template>

<script type="text/ecmascript-6">
// 组件模板
  const COMPONENT_NAME = 'demo'

  export default {
    name: COMPONENT_NAME,
    data() {
      return {

      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .demo
    width: 100%
</style>