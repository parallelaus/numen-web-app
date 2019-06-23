/**
 * Site Config API wrapper
 * Wrapper for non-standard site configuration API calls
 *
 */
export default $axios => ({
  fetch(id) {
    return $axios.$get(`${process.env.API_URL}/config/site/${id}`)
  }
})
