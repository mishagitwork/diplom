export default function ({ app, redirect }) {
  if (!app.$cookies.get('professorId')) {
    return redirect('/')
  }
}
