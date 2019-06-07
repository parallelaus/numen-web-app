/**
 * API wrapper for various system type and category options e.g. load_category, building_type etc
 * Wrapper for non-standard site configuration API calls
 *
 */
export default $axios => ({
  fetchLoadCategoriesAndTypes() {
    return $axios.$get(
      `${process.env.API_URL}/meta/load_types?with=load_category`
    )
  },
  fetchBuildingTypes() {
    return $axios.$get(
      `${process.env.API_URL}/meta/building_types?sort=order_by`
    )
  }
})
