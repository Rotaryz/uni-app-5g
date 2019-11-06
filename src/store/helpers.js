import { mapGetters, mapActions, mapMutations } from 'vuex'
// -----------  购物车 ----------
export const globalComputed = {
  ...mapGetters('global', ['provider','token','userInfo'])
}

export const globalMethods = {
  ...mapMutations('global', [ 'SET_SYSTEM_INFO']),
}
