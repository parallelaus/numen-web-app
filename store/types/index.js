export const state = () => ({
  load_categories: [],
  load_types: [],
  building_types: [],
  ct_types: []
})

export const mutations = {
  SET_LOAD_CATEGORIES(state, categories) {
    state.load_categories = categories.sort(orderBy)
  },
  SET_LOAD_TYPES(state, types) {
    state.load_types = types.sort(orderBy)
  },
  SET_BUILDING_TYPES(state, types) {
    state.building_types = types
  },
  SET_CT_TYPES(state, types) {
    state.ct_types = types
  }
}

export const actions = {
  async fetchAll({ commit }) {
    const load = await this.$types.fetchLoadCategoriesAndTypes()
    commit('SET_LOAD_CATEGORIES', load.load_categories)
    commit('SET_LOAD_TYPES', load.load_types)

    const building = await this.$types.fetchBuildingTypes()
    commit('SET_BUILDING_TYPES', building.building_types)

    const cts = await this.$types.fetchCtTypes()
    commit('SET_CT_TYPES', cts.ct_types)
  }
}

export const getters = {
  loadType: state => id => {
    return state.load_types.find(type => type.id == id)
  },
  loadCategory: state => id => {
    return state.load_categories.find(cat => cat.id == id)
  },

  /**
   * Return the load categories assigned to the required section
   *
   * Available sections are:
   *  - incoming_supplies
   *  - outgoing_supplies
   *  - chassis_supplies
   *  - devices (default)
   *  - generation
   *  - storage
   *
   */
  sectionCategories: state => section => {
    let categories = []

    // Select categories and types according to requested section
    switch (section) {
      case 'chassis_supplies':
        categories = state.load_categories.filter(category => category.id == 1)
      default:
        // default: devices
        categories = state.load_categories.filter(category => category.id > 100)
    }

    return categories
  }
}

function orderBy(a, b) {
  return a.order_by - b.order_by
}
