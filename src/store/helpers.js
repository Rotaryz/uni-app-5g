import { mapGetters, mapActions, mapMutations } from 'vuex'
// -----------  购物车 ----------
export const globalComputed = {
  ...mapGetters('global', ['provider','token','userInfo'])
}

export const globalMethods = {
  ...mapMutations('global', [ 'SET_SYSTEM_INFO']),
}

export const cartComputed = {
  ...mapGetters('cart', ['count', 'order'])
}
export const cartMethods = {
  ...mapActions('cart', ['_addToCart', '_getCartCount', '_payFor']),
  ...mapMutations('cart', ['SET_ORDER', 'SET_CART_COUNT'])
}
