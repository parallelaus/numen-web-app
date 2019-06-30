export default function({ app, store, req }) {
  if (!store.getters['user/loggedIn']) {
    if (process.server && !req) return

    let user = undefined
    if (process.server) {
      // User can only be in a Cookie, if not, we cannot auto authenticate
      user = app.$cookies.get('user')
    } else {
      // We are on the client, try to get user from local storage
      const jsonUser = localStorage.getItem('user')
      user = jsonUser ? JSON.parse(jsonUser) : undefined
    }
    if (!user) return
    store.commit('user/LOGIN', user)
  }
}
