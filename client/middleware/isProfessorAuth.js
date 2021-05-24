export default function ({ store, redirect }) {
  if (!store.state.user.userId || !store.state.user.professorId) {
    return redirect('/singin')
  }
}
