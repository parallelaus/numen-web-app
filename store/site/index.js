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
    if (config.buildings) state.buildings = config.buildings
    if (config.switchboards) state.switchboards = config.switchboards
    if (config.circuits) state.circuits = config.circuits
    if (config.devices) state.devices = config.devices
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
      entity: response[entity.childType]
    })
  },
  /**
   * Deletes the given entity
   *
   * @param { type, entity } entity
   */
  async updateEntity({ commit }, entity) {
    const response = await this[`$${entity.type}`].update(entity.entity)
    commit('UPDATE_ENTITY', {
      collection: pluralize(entity.type),
      entity: response[entity.type]
    })
  },
  /**
   *
   * @param { type, id } entity
   */
  async deleteEntity({ commit }, entity) {
    const response = await this[`$${entity.type}`].delete(entity.id)
    commit('DELETE_ENTITY', {
      collection: pluralize(entity.type),
      id: entity.id
    })
  },

  async addDeviceCircuits({ commit }, data) {}
}

export const getters = {
  sites: state => {
    return state.sites
  },

  site: state => {
    return state.site
  },

  buildings: state => {
    return state.buildings
  },

  fedBySwitchboard: state => switchboard_id => {
    return fedBySwitchboard(state, switchboard_id)
  },

  feedingSwitchboards: state => switchboard_id => {
    return feedingSwitchboards(state, switchboard_id)
  },

  switchboardsByBuilding: state => building_id => {
    return switchboardsByBuilding(state, building_id)
  },

  devicesBySwitchboard: state => switchboard_id => {
    return devicesBySwitchboard(state, switchboard_id)
  },

  circuitsByDevice: state => device_id => {
    return circuitsByDevice(state, device_id)
  },

  isSupplyDevice: state => device => {
    return isSupplyDevice(device)
  },

  switchboardSupplyDevice: state => switchboard_id => {
    return switchboardSupplyDevice(state, switchboard_id)
  }
}

/**
 * Returns the device supplying the switchboard specified by switchboard_id
 * Returns false if no supply device is set
 *
 * @param state
 * @param switchboard_id
 */
function switchboardSupplyDevice(state, switchboard_id) {
  const circuit = state.circuits.find(circuit => {
    return circuit.switchboard_id == switchboard_id && isSupplyDevice(circuit)
  })
  if (circuit) {
    return state.devices.find(device => device.id == circuit.devices[0])
  }
  return false
}

/**
 * Returns the switchboard feeding the switchboard specified by switchboard_id
 * Returns false if no switchboard is found
 *
 * @param state
 * @param switchboard_id
 */
function fedBySwitchboard(state, switchboard_id) {
  const connectedCircuits = state.circuits.filter(
    circuit => circuit.connected_switchboard == switchboard_id
  )
  if (connectedCircuits.length == 0) return false
  const fedBySwitchboard_id = connectedCircuits[0].switchboard_id
  return state.switchboards.find(
    switchboard => switchboard.id == fedBySwitchboard_id
  )
}

/**
 * Returns an array of switchboards being fed by the switchboard
 * specified by switchboard_id
 *
 * Returns an empty array if none is found
 *
 * @param state
 * @param switchboard_id
 */
function feedingSwitchboards(state, switchboard_id) {
  const connectedCircuits = state.circuits.filter(
    circuit =>
      isSupplyingDevice(circuit) && circuit.switchboard_id == switchboard_id
  )
  const feedingSwitchboardIds = new Set()
  connectedCircuits.forEach(circuit =>
    feedingSwitchboardIds.add(circuit.connected_switchboard)
  )
  const feedingSwitchboards = state.switchboards.filter(switchboard =>
    feedingSwitchboardIds.has(switchboard.id)
  )
  return feedingSwitchboards
}

/**
 * Returns an array containing the devices attached to the switchboard
 * specified by switchboard_id
 *
 * Returns an empty array if switchboard has no attached devices
 *
 * @param state
 * @param switchboard_id
 */
function devicesBySwitchboard(state, switchboard_id) {
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
}

/**
 * Returns an array of the circuits attached to the device specified by device_id
 * Returns an empty array of no circuits are attached to the device
 *
 * @param state
 * @param device_id
 */
function circuitsByDevice(state, device_id) {
  const device = state.devices.find(device => device.id == device_id)

  const deviceCircuitsIds = device.circuits
  return state.circuits.filter(circuit =>
    deviceCircuitsIds.includes(circuit.id)
  )
}

/**
 * Returns an array of switchboards contained in the building
 * specified by building_id
 *
 * @param state
 * @param building_id
 */
function switchboardsByBuilding(state, building_id) {
  return state.switchboards.filter(
    switchboard => switchboard.building_id == building_id
  )
}

/**
 * Returns true if given device or circuit object is an
 * incoming supply device or circuit.
 *
 * Returns false otherwise
 *
 * @param deviceOrCircuit
 */
function isSupplyDevice(deviceOrCircuit) {
  const supplyTypes = [1, 3, 4] // DB Id's of Supply Load Types
  return supplyTypes.includes(deviceOrCircuit.load_type_id)
}

/**
 * Returns true id the given device or circuit is
 * an outgoing device/circuit supplying another switchboard
 *
 * @param deviceOrCircuit
 */
function isSupplyingDevice(deviceOrCircuit) {
  const supplingTypes = [2] // DB Id's of Supplying/Outgoing Load Types
  return supplingTypes.includes(deviceOrCircuit.load_type_id)
}

function sortByLoadType(a, b) {
  return a.load_type_id - b.load_type_id
}
