export default function({ app, store, req }) {
  if (!store.getters['user/loggedIn']) {
    if (process.server && !req) return

    let user = undefined
    if (process.server) {
      user = app.$cookies.get('user')
    } else {
      const jsonUser = localStorage.getItem('user')
      user = jsonUser ? JSON.parse(jsonUser) : undefined
    }
    if (!user) return
    store.commit('user/LOGIN', user)
  }
}
