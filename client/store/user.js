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

export const actions = {
  async setCookies(context, data) {
    const options = {
      path: '/',
      maxAge: 60 * 6,
    }
    const cookieList = [
      {
        name: 'userId',
        value: !!data.userId,
        opts: options,
      },
      { name: 'isAdmin', value: !!data.isAdmin, opts: options },
      {
        name: 'universityId',
        value: !!data.universityId,
        opts: options,
      },
      {
        name: 'professorId',
        value: !!data.professorId,
        opts: options,
      },
      {
        name: 'studentId',
        value: !!data.studentId,
        opts: options,
      },
      { name: 'isMonitor', value: !!data.isMonitor, opts: options },
    ]
    this.$cookies.setAll(cookieList)
  },
}
