export default function({ isServer, store, req }) {
  if (isServer && !req) return

  if (isServer) {
    // Token can only be in a Cookie, if not, we cannot auto authenticate
  } else {
    // We are on the client, try to get token from local storage
  }
}
