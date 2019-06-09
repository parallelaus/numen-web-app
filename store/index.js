export const state = () => ({
  techMode: false
})

export const mutations = {
  TOGGLE_TECH_MODE(state) {
    state.techMode = !state.techMode
  }
}

export const actions = {
  toggleTechMode({ commit }) {
    commit('TOGGLE_TECH_MODE')
  }
}
