export const state = () => ({
  techMode: false
})

export const mutations = {
  TOGGLE_TECH_MODE(state) {
    state.techMode = !state.techMode
  }
}
