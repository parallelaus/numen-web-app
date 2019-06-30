export default function({ $axios, store }) {
  $axios.onRequest(config => {
    if (!config.headers.common.Authorization) {
      // Authorization is not set, check if we have a local valid token
      if (store.getters['user/loggedIn']) {
        // User logged in, check if token is still valid
        if (!store.getters['user/tokenExpired']) {
          // token still valid
          console.log(
            'Setting Token: ' + store.state.user.user.token.access_token
          )
          $axios.setToken(store.state.user.user.token.access_token, 'Bearer')
          config.headers.common['Authorization'] =
            'Bearer ' + store.state.user.user.token.access_token
        } else {
          // Token no longer valid, try to refresh the token
        }
      }
    }
    return config
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code == 401) {
      store.commit('user/LOGOUT')
    }
  })
}
