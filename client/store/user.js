export const state = () => ({
  id: null,
  fullName: null,
  birthday: null,
  avatar: null,
  isAdmin: false,
})

export const mutations = {
  initUser(state, date) {
    state.id = date.id
    state.fullName = date.fullName
    state.isAdmin = date.isAdmin
  },
}
