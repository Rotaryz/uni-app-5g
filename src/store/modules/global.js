export const state = {
  userInfo: {},
  token: '',
  provider:''
}

export const getters = {
  userInfo: state => state.userInfo,
  token: state => state.token,
  provider: state => state.token,
}

export const mutations = {
  SET_TOKEN(state, obj) {
    state.token = obj
  },
  SET_USER_INFO(state, obj) {
    state.userInfo = obj
  },
  SET_PROVIDER(state, str) {
    state.provider = str
  },
}

export const actions = {
  setToken({commit, state}, obj) {
    commit('SET_TOKEN', obj)
  },
  setUserInfo({commit, state}, obj) {
    commit('SET_USER_INFO', obj)
  },
  setProvider({commit, state}, str) {
    commit('SET_PROVIDER', str)
  }
}
