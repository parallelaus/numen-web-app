import pluralize from 'pluralize'
import {
  setItemInArray,
  getItemFromArray,
  getItem,
  setItem
} from '@/utils/local-storage'

export const state = () => ({
  view: 'electrical', // indicated if electrical or numen view is selected
  sites: [],
  site: {},
  buildings: [],
  switchboards: [],
  circuits: [],
  devices: [],
  collectors: [],
  country: {},
  phase_colours: [],
  areas: [],
  collectors_ports: []
})

export const mutations = {
  SET_SITES(state, sites) {
    state.sites = sites
    setItem('sites', sites)
  },

  SET_SITE_CONFIG(state, config) {
    state.site = config.site
    setItemInArray('site_map', state.site.id, config)

    if (config.buildings) state.buildings = config.buildings
    if (config.switchboards) state.switchboards = config.switchboards
    if (config.circuits) state.circuits = config.circuits
    if (config.devices) state.devices = config.devices
    if (config.collectors) state.collectors = config.collectors
    if (config.country) state.country = config.country
    if (config.phase_colours) state.phase_colours = config.phase_colours
    if (config.areas) state.areas = config.areas

    // Create Collector/Port/Circuit map
    // Data is currently drawn from circuits
    state.collectors_ports = []
    if (config.circuits) {
      config.circuits.forEach(circuit => {
        if (circuit.collector_serial_number && circuit.port) {
          state.collectors_ports.push({
            collector: circuit.collector_serial_number,
            port: circuit.port,
            circuit: circuit.id
          })
        }
      })
    }
  },
  // TODO: Update local storage when entities are updated
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
  },
  SET_VIEW(state, view) {
    const views = ['electrical', 'numen']
    if (views.includes(view)) {
      state.view = view
    }
  },
  DISCONNECT_CIRCUIT(state, circuit_id) {
    const idx = state.collectors_ports.findIndex(
      item => item.circuit == circuit_id
    )
    state.collectors_ports.splice(idx, 1)
  },
  CONNECT_CIRCUIT(state, connection) {
    state.collectors_ports.push(connection)
  }
}

export const actions = {
  async fetchSites({ commit }) {
    let sites = {
      sites: getItem('sites')
    }
    if (!sites.sites) {
      sites = await this.$site.index()
    }
    commit('SET_SITES', sites.sites)
  },

  async fetchSiteConfig({ commit }, id) {
    let siteConfig = getItemFromArray('site_map', id)
    if (!siteConfig) {
      siteConfig = await this.$siteConfig.fetch(id)
    }
    commit('SET_SITE_CONFIG', siteConfig)
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
   * Updates entity
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
   * Deletes the given entity
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

  /**
   * Add a device and circuits to a switchboard
   *
   * @param data - form data from DeviceCircuitsForm
   */
  async addDeviceCircuits({ commit }, data) {
    const circuit = {
      name: data.input.name,
      description: data.input.description,
      location: data.input.location,
      load_type_id: data.input.load_type_id,
      connected_switchboard: data.input.connected_switchboard,
      no_cores: data.input.no_cores,
      breaker_size: data.input.breaker_size,
      cable_size: data.input.cable_size,
      ct_number: data.input.ct_cable_number,
      chassis_no: 0
    }

    if (data.input.three_phase) {
      circuit['3ph_load'] = 1
      circuit.balanced_load = 1
    } else {
      circuit['3ph_load'] = 0
      circuit.balanced_load = 1
    }
    if (data.input.phase) {
      circuit.phase_id = data.input.phase
    } else {
      circuit.phase_id = 1
    }

    const response = await this.$switchboard.addChild(
      data.switchboard_id,
      'circuit',
      circuit
    )
    console.log(response)
  },

  /**
   * Adds a collector to an existing building
   *
   * @param param0
   * @param data
   */
  async addBuildingCollector({ commit }, data) {
    console.log(
      'adding collector ' +
        data.collector.serial_number +
        ' to building ' +
        data.buildingId
    )
  },

  /**
   * Connects circuit to a collector port
   *
   * @param { collector, port, circuit } connection
   */
  async connectCircuitToCollectorPort({ commit }, connection) {
    // TODO: Connect circuit API call
    commit('CONNECT_CIRCUIT', connection)
  },

  /**
   * Disconnects circuit from a collector port
   *
   * @param data
   */
  async disconnectCircuitFromCollectorPort({ commit }, circuit_id) {
    // TODO: Disconnect circuit API call
    commit('DISCONNECT_CIRCUIT', circuit_id)
  }
}

export const getters = {
  siteById: state => site_id => {
    return state.sites.find(site => site.id == site_id)
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

  collectorsByBuilding: state => building_id => {
    return collectorsByBuilding(state, building_id)
  },

  circuitsByCollector: state => serial_number => {
    return circuitsByCollector(state, serial_number)
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
  },

  buildingAreas: state => building_id => {
    return buildingAreas(state, building_id)
  },

  phaseColour: state => phase => {
    return state.phase_colours.find(colour => colour.phase == phase)
  }
}

/**
 * Returns the areas in the building specified by building_id
 * Returns an empty array if no areas defined for this building
 *
 * @param state
 * @param building_id
 */
function buildingAreas(state, building_id) {
  return state.areas.filter(area => area.building_id == building_id)
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
 * Returns a Map object of all the circuits currently attached to the collector
 * specified by serial_number.
 *
 * @param state
 * @param serial_number
 */
function circuitsByCollector(state, serial_number) {
  const portMap = new Map()
  state.collectors_ports.forEach(collector_port => {
    if (collector_port.collector == serial_number) {
      const circuit = state.circuits.find(
        circuit => circuit.id == collector_port.circuit
      )
      portMap.set(collector_port.port, circuit)
    }
  })
  return portMap
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
 * Returns an array of collectors contained in the building
 * specified by building_id
 *
 * @param state
 * @param building_id
 */
function collectorsByBuilding(state, building_id) {
  return state.collectors.filter(
    collector => collector.building_id == building_id
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
