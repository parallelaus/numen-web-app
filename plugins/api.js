import genericApiGenerator from '@/api'
import authApi from '@/api/auth'
import siteApi from '@/api/site'
import types from '@/api/types'

/**
 * Injects $axios into the various API wrappers and then injects these
 * into the app and thus makes them available throughout the app.
 *
 * Example usage:
 * Store actions:
 * const response = await this.$site.index()
 *
 *
 */
export default (ctx, inject) => {
  // Generic API
  const createApiResource = genericApiGenerator(ctx.$axios)
  inject('site', createApiResource('meta/site'))
  inject('building', createApiResource('meta/building'))
  inject('switchboard', createApiResource('meta/switchboard'))
  inject('circuit', createApiResource('meta/circuit'))
  inject('device', createApiResource('mate/device'))

  // Auth API
  inject('auth', authApi(ctx.$axios))

  // Site Config API
  inject('siteConfig', siteApi(ctx.$axios))

  // System types and categories
  inject('types', types(ctx.$axios))
}
