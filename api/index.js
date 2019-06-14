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
    return $axios.$get(`${process.env.API_URL}/${resource}/${id}`)
  },
  create(data) {
    const payload = data
    return $axios.$post(`${process.env.API_URL}/${resource}`, payload)
  },
  update(data) {
    const id = data.id
    delete data.id

    const resourceName = resource.split('/')[1]
    const payload = {}
    payload[`${resourceName}`] = data

    return $axios.$put(`${process.env.API_URL}/${resource}/${id}`, payload)
  },
  delete(id) {
    return $axios.$delete(`${process.env.API_URL}/${resource}/${id}`)
  },

  /**
   * Adds the given child resource to the current parent resource
   *
   * @param id - Parent resource ID
   * @param childType - Child resource type e.g. building
   * @param data - Child resource data
   */
  addChild(id, childType, data) {
    const payload = {
      [childType]: data
    }
    return $axios.$post(
      `${process.env.API_URL}/${resource}/${id}/${childType}`,
      payload
    )
  }
})
