<template>
  <v-app id="installer">
    <div v-if="!loggedIn">
      <Login />
    </div>
    <div v-if="loggedIn">
      <Toolbar />
      <v-content>
        <nuxt />
      </v-content>
    </div>
  </v-app>
</template>

<script>
import Toolbar from '@/components/core/Toolbar.vue'
import Login from '@/components/core/Login.vue'
import { mapGetters } from 'vuex'

export default {
  head() {
    return {
      titleTemplate: '%s - Numen Installer',
      title: 'Login',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Web app for installing and configuring Numen'
        }
      ]
    }
  },
  components: {
    Toolbar,
    Login
  },
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedIn',
      hasRole: 'user/hasRole'
    })
  }
}
</script>
