/**
 * API wrapper for various system type and category options e.g. load_category, building_type etc
 * Wrapper for non-standard site configuration API calls
 *
 */
export default $axios => ({
  fetchLoadCategoriesAndTypes() {
    return $axios.$get(
      `${process.env.API_URL}/meta/load_categories?with=load_types`
    )
  },
  fetchBuildingTypes() {
    return $axios.$get(
      `${process.env.API_URL}/meta/building_types?sort=order_by`
    )
  },
  fetchCtTypes() {
    return $axios.$get(`${process.env.API_URL}/config/ct_types`)
  }
})
