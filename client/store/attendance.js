export const state = () => ({
  classId: null,
  expiredAt: null,
})

export const mutations = {
  setAttendance(state, data) {
    state.classId = data.classId
    state.expiredAt = data.expiredAt
  },
}
