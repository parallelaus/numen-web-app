<template>
  <v-layout row>
    <v-flex xs11>
      <v-combobox
        v-model="selectedSites"
        :items="sites"
        item-text="name"
        item-value="id"
        label="Select Sites to display on the Dashboard"
        chips
        clearable
        solo
        multiple
        @change="requiresUpdate = true"
      >
        <template v-slot:selection="data">
          <v-chip
            close
            outline
            color="primary"
            :selected="data.selected"
            @input="deselectSite(data.item)"
          >
            {{ data.item.name }}
          </v-chip>
        </template>
      </v-combobox>
    </v-flex>
    <v-flex xs1>
      <v-btn
        color="primary"
        icon
        :disabled="!requiresUpdate"
        @click="updateDashboard()"
      >
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {
      requiresUpdate: false,
      selectedSites: []
    }
  },

  computed: {
    ...mapState({
      sites: state => state.site.sites
    })
  },

  methods: {
    updateDashboard() {
      console.log('updating dashboard')
      console.log(this.selectedSites)
      this.requiresUpdate = false
    },
    deselectSite(item) {
      this.selectedSites.splice(this.selectedSites.indexOf(item), 1)
      this.selectedSites = [...this.selectedSites]
      this.requiresUpdate = true
    }
  }
}
</script>
