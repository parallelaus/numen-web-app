<template>
  <v-footer app class="pa-0" dark>
    <v-btn
      v-if="requestAccess('techMode.access')"
      flat
      icon
      x-small
      @click="toggleTechMode"
    >
      <v-icon :class="techModeClass" small class="blue--text">
        build
      </v-icon>
    </v-btn>
    <v-spacer />
    <div class="grey--text text--darken-1 caption pr-2">
      &copy; Ecocentric Energy {{ new Date().getFullYear() }}
    </div>
  </v-footer>
</template>

<script>
import AccessControl from '@/mixins/access-control'

export default {
  mixins: [AccessControl],
  computed: {
    techModeClass() {
      return {
        'grey--text text--darken-3': !this.$store.state.techMode
      }
    }
  },
  methods: {
    toggleTechMode() {
      this.$store.commit('TOGGLE_TECH_MODE')
    }
  }
}
</script>
