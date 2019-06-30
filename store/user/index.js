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
    if (process.client) {
      localStorage.setItem('user', JSON.stringify(user))
      this.$cookies.set('user', user)
      this.$axios.setToken(user.token.access_token, 'Bearer')
    }
  },
  LOGOUT(state) {
    state.user = undefined
    if (process.client) {
      localStorage.removeItem('user')
      this.$cookies.remove('user')
      this.$axios.setToken(false)
    }
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
        console.log('user login')
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
    console.log('user logout')
  }
}

export const getters = {
  loggedIn: state => {
    return state.user != undefined
  },
  hasRole: state => role => {
    return state.user.roles.includes(role)
  },
  tokenExpired: state => {
    state.user != undefined && Date.now() > state.user.expires ? true : false
  }
}
