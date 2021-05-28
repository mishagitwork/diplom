export default function ({ app, redirect, route }) {
  if (route.name !== 'singin' && !app.$cookies.get('userId')) {
    return redirect('/singin')
  }
}
