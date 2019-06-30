export default async function({ store }) {
  if (process.client && store.getters['user/loggedIn']) {
    await store.dispatch('types/fetchAll')
  }
}
