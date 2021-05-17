export const state = () => ({
  fullName: null,
  birthday: null,
  avatar: null,
  isAdmin: false,
  userId: null,
  universityId: 'dd6308e8-f9c3-4354-9b9f-95105d86ffaa',
  professorId: null,
  studentId: null,
})

export const mutations = {
  init(state, data) {
    state.userId = data.userId
    state.fullName = data.fullName
    state.isAdmin = data.isAdmin
    state.isMonitor = data.isMonitor
    state.professorId = data.professorId
    state.universityId = data.universityId
    state.studentId = data.studentId
  },
}
