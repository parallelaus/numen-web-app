<template>
  <div>
    <v-navigation-drawer
      id="nav-drawer"
      v-model="drawer"
      width="210"
      clipped
      app
      hide-overlay
    >
      <v-list>
        <v-list-tile
          v-for="link in userLinks"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-tile-action>
            <v-icon small color="primary">
              {{ link.icon }}
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="title font-weight-medium primary--text">
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
        <v-btn icon router to="/" @click="logout">
          <v-icon>
            exit_to_app
          </v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import AccessControl from '@/mixins/access-control'

export default {
  mixins: [AccessControl],
  data: () => ({
    drawer: null,
    links: [
      {
        icon: 'dashboard',
        text: 'Dashboard',
        route: '/dashboard',
        access: 'siteData.view'
      },
      // {
      //   icon: 'save',
      //   text: 'Data',
      //   route: '/',
      //   access: 'siteData.view'
      // },
      {
        icon: 'location_city',
        text: 'Installations',
        route: '/site',
        access: 'siteConfig.view'
      }
    ]
  }),
  computed: {
    userLinks() {
      return this.links.filter(link => this.requestAccess(link.access))
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>
