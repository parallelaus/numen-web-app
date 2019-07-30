export const state = () => ({
  sites: []
})

export const mutations = {
  SET_SITE_STATS(state, stats) {
    state.sites = stats
  }
}

export const actions = {
  async fetchSiteStats({ commit }, options) {
    // add API call for each site to an array
    const siteStatPromises = options.sites.map(site =>
      this.$stats.site(site.id, options.params)
    )
    const siteStats = await Promise.all(siteStatPromises)
    commit('SET_SITE_STATS', siteStats)
  }
}
