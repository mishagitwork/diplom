export default function ({ app, redirect }) {
  if (!app.$cookies.get('studentId')) {
    return redirect('/')
  }
}
