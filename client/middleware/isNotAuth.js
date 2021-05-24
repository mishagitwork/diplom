export default function ({ store, redirect }) {
  if (!store.state.user.userId) {
    return redirect('/singin')
  }
}
