<template>
  <v-app id="installer">
    <div v-if="noRole">
      <Login />
    </div>
    <div v-if="hasRole('installer')">
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
      noRole: 'user/noRole',
      hasRole: 'user/hasRole'
    })
  }
}
</script>
