/**
 * Stats API wrapper
 * Wrapper for statistics API
 *
 */
export default $axios => ({
  site(id, params) {
    return $axios.$get(`${process.env.DATA_URL}/stats/site/${id}`, { params })
  }
})
