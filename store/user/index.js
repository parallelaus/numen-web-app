export const state = () => ({
  user: undefined,
  access: {
    techMode: {
      access: true // user can access tech mode
    },
    siteConfig: {
      view: true, // user can view site configuration
      update: true, // user can edit site entities e.g. name, description etc.
      manage: true // user can add and delete site entities
    },
    siteData: {
      view: true, // user can view data
      export: true // user can export data
    }
  }
})

export const mutations = {
  LOGIN(state, user) {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
    this.$axios.setToken(user.token.access_token, 'Bearer')
  },
  LOGOUT(state) {
    state.user = undefined
    localStorage.removeItem('user')
    this.$axios.setToken(false)
  }
}

export const actions = {
  async login({ commit }, credentials) {
    try {
      // Get token from Auth service
      const token = await this.$auth.token(credentials)

      // Get user roles
      // TODO: get user roles from the API
      const roles = ['installer']

      if (token) {
        const user = {
          token,
          expires: Date.now() + token.expires_in * 1000,
          roles
        }
        commit('LOGIN', user)
        console.log('User login successful. Username: ' + credentials.username)
      }
      return true
    } catch (error) {
      if (!error.response) {
        console.log('Server error')
      } else {
        if (error.response.status == 401) {
          console.log(error.response.data.error_description)
        } else {
          console.log(error.response)
        }
      }
      return false
    }
  },
  logout({ commit }) {
    commit('LOGOUT')
    console.log('User logout')
  }
}

export const getters = {
  loggedIn: state => {
    return state.user != undefined
  },
  hasRole: state => role => {
    return state.user.roles.includes(role)
  }
}
