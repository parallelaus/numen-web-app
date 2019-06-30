export default async function({ store }) {
  if (store.getters['user/loggedIn']) {
    await store.dispatch('types/fetchAll')
  }
}
