export const state = () => ({
  load_categories: [],
  load_types: [],
  building_types: []
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
  }
}

export const actions = {
  async fetchAll({ commit }) {
    const load = await this.$types.fetchLoadCategoriesAndTypes()
    commit('SET_LOAD_CATEGORIES', load.load_categories)
    commit('SET_LOAD_TYPES', load.load_types)

    const building = await this.$types.fetchBuildingTypes()
    commit('SET_BUILDING_TYPES', building.building_types)
  }
}

export const getters = {
  loadType: state => id => {
    return state.load_types.find(type => type.id == id)
  },
  loadCategory: state => id => {
    return state.load_categories.find(cat => cat.id == id)
  }
}

function orderBy(a, b) {
  return a.order_by - b.order_by
}
