/**
 * Numen Authentication API wrapper
 * Provides access to the OAuth 2.0 and other functions of the
 * Numen authentication API
 *
 */
export default $axios => ({
  token(credentials) {
    return $axios.$post(`${process.env.OAUTH_URL}/token`, {
      grant_type: 'password',
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      username: credentials.username,
      password: credentials.password
    })
  },
  roles() {
    return $axios.$get(`${process.env.API_URL}/config/roles`)
  }
})
