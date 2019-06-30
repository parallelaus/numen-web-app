export default {
  methods: {
    /**
     * Returns true is a user has the requested right and false otherwise
     * E.g. siteConfig.view, siteData.export etc.
     *
     * @param {right
     */
    requestAccess(right) {
      const arrRight = right.split('.')
      return this.$store.state.user.access[arrRight[0]][arrRight[1]]
    }
  }
}
