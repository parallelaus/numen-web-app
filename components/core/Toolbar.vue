<template>
  <div>
    <v-navigation-drawer
      id="nav-drawer"
      v-model="drawer"
      width="170"
      clipped
      app
      hide-overlay
    >
      <v-list>
        <v-list-tile
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="title font-weight-thin">
              {{ link.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark dense app clipped-left color="blue darken-4">
      <v-toolbar-side-icon
        class="hidden-lg-and-up"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title>
        <nuxt-link to="/">
          <img src="~/assets/images/numen-logo.svg" alt="Home" />
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn icon @click="logout">
          <v-icon>
            exit_to_app
          </v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    links: [
      {
        icon: 'places',
        text: 'Sites',
        route: '/site'
      }
    ]
  }),
  computed: {
    techModeClass() {
      return {
        'grey--text text--lighten-3': !this.$store.state.techMode
      }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
    },
    toggleTechMode() {
      this.$store.dispatch('toggleTechMode')
    }
  }
}
</script>
