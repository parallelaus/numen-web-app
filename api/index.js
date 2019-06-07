/**
 * Generic API access wrapper
 * This allows access to any resource throught the standard
 * RESTful CRUD methods.
 *
 * Any non-standard methods will be created in separate API wrappers
 *
 */
export default $axios => resource => ({
  index() {
    return $axios.$get(`${process.env.API_URL}/${resource}`)
  },
  show(id) {
    return $axios.$get(`${resource}/${id}`)
  },
  create(payload) {
    return $axios.$post(`${resource}`, payload)
  },
  update(id, payload) {
    return $axios.$put(`${resource}/${id}`, payload)
  },
  delete(id) {
    return $axios.$delete(`${resource}/${id}`)
  }
})
