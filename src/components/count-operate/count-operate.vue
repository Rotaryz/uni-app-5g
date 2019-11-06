<template>
  <div class="zb-count-operate" :class="size" @click.stop="clickEvent">
    <div :class="['icon', 'minus',{disable:value<=minNumber}]" @click="minus">
      <span class="text"></span>
    </div>
    <div v-if="onlyRead" class="input-inner">{{value}}</div>
    <input v-else :value="newValue" type="number" class="input-inner" @focus.stop="focus()" @input="input" @blur="blur" @confirm="enter">
    <div class="icon add" @click="add"> <span class="text"></span> <span class="text"></span></div>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'ZB_COUNT_OPERATE'

  export default {
    name: COMPONENT_NAME,
    props: {
      value: {
        default: 1,
        type: [String, Number]
      },
      minNumber: {
        default: 1,
        type: [String, Number]
      },
      maxNumber: {
        default: null,
        type: [String, Number]
      },
      onlyRead: {
        default: false,
        type: Boolean
      },
      size: {
        default: '', // small
        type: String
      }
    },
    computed: {
      newValue: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', val)
          this.$emit('change', val)
        }
      }
    },
    methods: {
      focus(e) {
        this.$emit('focus', e)
      },
      minus() {
        if (this.newValue - 1 < this.minNumber) {
          this.$emit('less')
          return
        }
        --this.newValue
      },
      add() {
        if (this.maxNumber && this.newValue + 1 > this.maxNumber) {
          this.$emit('over')
          return
        }
        ++this.newValue
      },
      clickEvent(e) {
        this.$emit('click', e)
      },
      blur(v) {
        if (this.minNumber > v.target.value) {
          this.newValue = this.minNumber
        }
        this.$emit('blur', v)
      },
      input(v) {
        let newValue = v.target.value
        if (!newValue) {
          this.newValue = 0
          return 0
        } else if (this.maxNumber && newValue > this.maxNumber) {
          this.$emit('over')
          this.newValue = this.maxNumber * 1
        } else if (this.minNumber <= newValue) {
          this.newValue = newValue * 1
        } else {
          // console.log(newValue, 'newValue')
        }
        return this.newValue
      },
      enter(v) {
        if (this.newValue <= this.minNumber) {
          this.newValue = this.minNumber
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../design"
  $height = 30px
  /* 后面会缩小*/
  $line-width = 20px
  $line-height = 3px
  .zb-count-operate
    flex-shrink 0
    display flex
    align-items center
    .icon
      height: $height
      width: $height
      line-height $height
      flex-shrink 0
      text-align center
      color: $color-text-main
      position relative
      font-size $font-size-20
      .text
        display inline-block
        background-color $color-text-main
        width:  $line-width
        height: $line-height
      &.minus
        display flex
        justify-content center
        align-items center
        .text
           transform scale(0.5)
      &.add
        position relative
        .text
          position absolute
          left:$height*0.5
          top:$height*0.5
          transform translate(-50%,-50%) scale(0.5)
          &:last-child
            height:  $line-width
            width:$line-height

      &.disable .text
        background-color: $color-text-assist
        opacity 0.3

    .input-inner
      width: 50px
      font-size: $font-size-14
      line-height $height
      height: $height
      text-align center
      background-color $color-background
      border-radius 3px
      font-bold()

  .zb-count-operate.small
    $height = 20px
    $line-width = 14px
    .input-inner
      width: 35px
      line-height $height
      height: $height
    .icon
      height: $height
      width: $height
      line-height $height
      .text
        width:  $line-width
        height: $line-height
        left:$height*0.5
        top:$height*0.5
      &.add .text:last-child
        height:  $line-width
        width:$line-height
</style>
