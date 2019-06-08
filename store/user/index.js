export const state = () => ({
  roles: [],
  token: {}
})

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    localStorage.setItem('token', JSON.stringify(token))

    // Set the access_token globally for API access
    this.$axios.setToken(token.access_token, 'Bearer')
  },
  LOGOUT(state) {
    state.token = null
    state.roles = []
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.$axios.setToken(false)
  },
  SET_USER(state, user) {
    state.roles = user.roles

    // Removes global access_token
    localStorage.setItem('user', JSON.stringify(user))
  }
}

export const actions = {
  async login({ commit }, credentials) {
    const token = await this.$auth.token(credentials)

    if (token) {
      commit('SET_TOKEN', token)
      commit('SET_USER', { roles: ['installer'] })
      console.log('User login successful. Username: ' + credentials.username)
    }
  },
  logout({ commit }) {
    commit('LOGOUT')
    console.log('User logout')
  }
}

export const getters = {
  hasRole: state => role => {
    return state.roles.includes(role)
  },
  noRole: state => {
    return state.roles.length == 0
  }
}
