export const state = () => ({
  roles: [],
  token: {},
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
    try {
      const token = await this.$auth.token(credentials)

      if (token) {
        commit('SET_TOKEN', token)
        commit('SET_USER', { roles: ['installer'] })
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
  hasRole: state => role => {
    return state.roles.includes(role)
  },
  noRole: state => {
    return state.roles.length == 0
  }
}
