export default function ({ store, redirect }) {
  if (!store.state.user.userId || !store.state.user.studentId) {
    return redirect('/singin')
  }
}
