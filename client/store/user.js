export const state = () => ({
  fullName: null,
  birthday: null,
  avatar: null,
  isAdmin: false,
  userId: null,
  universityId: null,
  professorId: null,
  studentId: null,
  groupId: null,
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
    state.groupId = data.groupId
  },
}
