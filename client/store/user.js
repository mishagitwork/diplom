export const state = () => ({
  id: null,
  fullName: null,
  birthday: null,
  avatar: null,
  isAdmin: false,
  universityId: 'dd6308e8-f9c3-4354-9b9f-95105d86ffaa',
})

export const mutations = {
  initUser(state, date) {
    state.id = date.id
    state.fullName = date.fullName
    state.isAdmin = date.isAdmin
    state.universityId = date.university.id
  },
}
