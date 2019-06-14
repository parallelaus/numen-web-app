export default {
  methods: {
    requestAccess(right) {
      const arrRight = right.split('.')
      return this.$store.state.user.access[arrRight[0]][arrRight[1]]
    }
  }
}
