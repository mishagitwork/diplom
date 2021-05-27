export default function ({ app, redirect }) {
  if (!app.$cookies.get('userId')) {
    return redirect('/singin')
  }
}
