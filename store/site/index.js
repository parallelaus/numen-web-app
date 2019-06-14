import pluralize from 'pluralize'

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

  ADD_ENTITY(state, entity) {
    state[entity.collection].push(entity.entity)
  },
  UPDATE_ENTITY(state, entity) {
    const idx = state[entity.collection].findIndex(
      item => item.id == entity.entity.id
    )
    state[entity.collection].splice(idx, 1, entity.entity)
  },
  DELETE_ENTITY(state, entity) {
    const idx = state[entity.collection].findIndex(
      item => item.id === entity.id
    )
    state[entity.collection].splice(idx, 1)
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
    commit('ADD_ENTITY', { collection: 'buildings', entity: response.building })
  },

  async updateBuilding({ commit }, building) {
    const response = await this.$building.update(building)
    commit('UPDATE_ENTITY', {
      collection: 'buildings',
      entity: response.building
    })
  },

  async deleteBuilding({ commit }, id) {
    await this.$building.delete(id)
    // commit('DELETE_BUILDING', id)
    commit('DELETE_ENTITY', { collection: 'buildings', id: id })
  },

  /**
   * Adds a child entity to the given parent
   *
   * @param { parentType, parentId, childType, child } entity
   */
  async addChildEntity({ commit }, entity) {
    const response = await this[`$${entity.parentType}`].addChild(
      entity.parentId,
      entity.childType,
      entity.child
    )
    commit('ADD_ENTITY', {
      collection: pluralize(entity.childType),
      entity: response.switchboard
    })
  },

  async updateEntity({ commit }, entity) {}
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
    return state.devices
      .filter(device => devices.has(device.id))
      .sort(sortByLoadType)
  },

  circuitsByDevice: state => device_id => {
    const device = state.devices.find(device => device.id == device_id)

    const deviceCircuitsIds = device.circuits
    return state.circuits.filter(circuit =>
      deviceCircuitsIds.includes(circuit.id)
    )
  }
}

function sortByLoadType(a, b) {
  return a.load_type_id - b.load_type_id
}
