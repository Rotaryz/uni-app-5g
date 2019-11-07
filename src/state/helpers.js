import {mapGetters, mapActions, mapMutations} from 'vuex'

export const cartComputed = {
  ...mapGetters('cart', ['count', 'order'])
}
export const cartMethods = {
  ...mapActions('cart', ['_addToCart', '_getCartCount', '_payFor']),
  ...mapMutations('cart', ['SET_ORDER', 'SET_CART_COUNT'])
}

