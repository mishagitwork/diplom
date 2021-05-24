export const state = () => ({
  isMobile: false,
})

export const mutations = {
  setIsMobile(state, data) {
    state.isMobile = data.isMobile
  },
}
