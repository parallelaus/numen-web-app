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
      <Footer />
    </div>
  </v-app>
</template>

<script>
import Toolbar from '@/components/core/Toolbar'
import Login from '@/components/core/Login'
import Footer from '@/components/core/Footer'
import { mapGetters } from 'vuex'

export default {
  head() {
    return {
      titleTemplate: '%s - NUMEN',
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
    Login,
    Footer
  },
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedIn'
    })
  }
}
</script>
