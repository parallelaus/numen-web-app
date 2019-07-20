export const state = () => ({
  sites: []
})

export const mutations = {
  SET_SELECTED_SITES(state, sites) {
    state.sites = sites
    setItem('sites', sites)
  }
}

export const actions = {
  selectSites({ commit }, sites) {}
}
