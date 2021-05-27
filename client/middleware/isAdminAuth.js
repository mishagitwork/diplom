export default function ({ app, redirect }) {
  if (!app.$cookies.get('universityId')) {
    return redirect('/')
  }
}
