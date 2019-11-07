import { mapGetters, mapActions, mapMutations } from 'vuex'
// -----------  购物车 ----------
export const globalComputed = {
  ...mapGetters('global', ['provider','token','userInfo'])
}

export const globalMethods = {
  ...mapActions('global', [ 'setToken','setUserInfo','setProvider']),
  ...mapMutations('global', [ 'SET_TOKEN','SET_USER_INFO','SET_PROVIDER']),
}
