import delivery from '@/delivery'

export const state = () => {
  return {
    userId: '',
    refreshToken: process.browser ? localStorage.getItem('refreshToken') : '',
    accessToken: process.browser ? localStorage.getItem('accessToken') : '',
  }
}

export const getters = {}

export const mutations = {
  setTokens(state, data) {
    state.refreshToken = data.refreshToken
    state.accessToken = data.accessToken
  },
}

export const actions = {
  async login({ commit, dispatch }, data) {
    try {
      const response = await delivery.AuthAction.login(data)
      commit('setTokens', response)
      dispatch('refreshTokenTimeout', response)
      return response
    } catch (e) {
      return false
    }
  },

  logout({ commit }) {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    commit('setTokens', { accessToken: null, refreshToken: null })
    this.$router.push('/singin')
  },
  initial({ commit, dispatch }) {
    const refreshToken = localStorage.getItem('refreshToken')
    if (refreshToken) {
      dispatch('refreshToken')
    }
    commit('setTokens', { accessToken: null, refreshToken: null })
  },
  refreshToken({ dispatch }) {
    const refreshToken = localStorage.getItem('refreshToken')
    delivery.AuthAction.refresh(refreshToken)
      .then((res) => dispatch('refreshTokenTimeout', res))
      .catch((e) => {
        console.error(e)
        dispatch('logout')
      })
  },
  refreshTokenTimeout({ dispatch, commit }, data) {
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    commit('user/init', delivery.AuthAction.decodeToken(), { root: true })
    delivery.AuthAction.refreshTokenTimeout(data)
    var timeout = data.expiresIn - parseInt(new Date().getTime() / 1000) - 300
    this.refreshTokenInterval = setTimeout(() => {
      dispatch('refreshToken')
    }, timeout * 1000)
  },
}
