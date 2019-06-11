export const state = () => ({
  sites: [],
  site: {},
  buildings: [],
  switchboards: [],
  circuits: [],
  devices: []
})

export const mutations = {
  SET_SITES(state, sites) {
    state.sites = sites
  },
  SET_SITE_CONFIG(state, config) {
    state.site = config.site
    state.buildings = config.buildings
    state.switchboards = config.switchboards
    state.circuits = config.circuits
    state.devices = config.devices
  },
  ADD_BUILDING(state, building) {
    state.buildings.push(building)
  },
  UPDATE_BUILDING(state, building) {
    const idx = state.buildings.findIndex(item => item.id == building.id)
    state.buildings.splice(idx, 1, building)
  },
  DELETE_BUILDING(state, id) {
    const idx = state.buildings.findIndex(item => item.id === id)
    state.buildings.splice(idx, 1)
  }
}

export const actions = {
  async fetchSites({ commit }) {
    const response = await this.$site.index()
    commit('SET_SITES', response.sites)
  },

  async fetchSiteConfig({ commit }, id) {
    const response = await this.$siteConfig.fetch(id)
    commit('SET_SITE_CONFIG', response)
  },

  async addBuilding({ commit, state }, building) {
    const response = await this.$siteConfig.addBuilding(state.site.id, building)
    commit('ADD_BUILDING', response.building)
  },

  async updateBuilding({ commit }, building) {
    const response = await this.$building.update(building)
    commit('UPDATE_BUILDING', response.building)
  },

  async deleteBuilding({ commit }, id) {
    await this.$building.delete(id)
    commit('DELETE_BUILDING', id)
  }
}

export const getters = {
  site: state => id => {
    return state.sites.find(site => site.id == id)
  },

  buildings: state => {
    return state.buildings
  },

  switchboardsByBuilding: state => building_id => {
    return state.switchboards.filter(
      switchboard => switchboard.building_id == building_id
    )
  },

  devicesBySwitchboard: state => switchboard_id => {
    const switchboardCircuits = state.circuits.filter(
      circuit => circuit.switchboard_id == switchboard_id
    )
    const devices = new Set()
    switchboardCircuits.forEach(element => {
      if (element.devices) {
        // Only single device per circuit is supported, so first
        // device from the array is taken
        devices.add(element.devices[0])
      }
    })
    return state.devices.filter(device => devices.has(device.id))
  },

  circuitsByDevice: state => device_id => {
    const device = state.devices.find(device => device.id == device_id)

    const deviceCircuitsIds = device.circuits
    return state.circuits.filter(circuit =>
      deviceCircuitsIds.includes(circuit.id)
    )
  }
}
