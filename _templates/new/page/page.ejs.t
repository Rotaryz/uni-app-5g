---
to: "src/pages/<%= h.inflection.dasherize(package[0]) %>/<%= h.inflection.dasherize(name) %>/<%= h.inflection.dasherize(name) %>.vue"
---
<template>
  <div class="<%= h.inflection.dasherize(name) %>">
    <%= h.inflection.dasherize(name) %>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './helpers'
  // import API from '@/api'
  // import Demo from './demo/demo'

  const PAGE_NAME = '<%=  h.inflection.dasherize(name).toUpperCase().replace(/-/g, '_')%>'

  export default {
    name: PAGE_NAME,
    data() {
      return {
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /*@import "~@design"*/

  .<%= h.inflection.dasherize(name) %>
    width: 100%
</style>