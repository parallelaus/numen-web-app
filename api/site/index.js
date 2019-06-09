/**
 * Site Config API wrapper
 * Wrapper for non-standard site configuration API calls
 *
 */
export default $axios => ({
  fetch(id) {
    return $axios.$get(`${process.env.API_URL}/config/site/${id}`)
  },
  addBuilding(site_id, building) {
    const data = {
      building: building
    }
    return $axios.$post(
      `${process.env.API_URL}/meta/site/${site_id}/building`,
      data
    )
  }
})
