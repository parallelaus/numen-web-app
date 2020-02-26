<template>
  <v-layout row>
    <v-flex xs11 pa-0>
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
        @change="selectSite()"
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
    <v-flex xs1 pa-0>
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
import { mapState } from 'vuex'
import { setItem, getItem } from '@/utils/local-storage'

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
  mounted() {
    this.selectedSites = getItem('dashboard_sites') // get selected sites from local storage
    if (this.selectedSites == null) {
      this.$emit('update', [])
    } else {
      const sites = JSON.parse(JSON.stringify(this.selectedSites))
      this.$emit('update', sites)
    }
  },
  methods: {
    updateDashboard() {
      setItem('dashboard_sites', this.selectedSites)
      const sites = JSON.parse(JSON.stringify(this.selectedSites))
      this.$emit('update', sites)
      this.requiresUpdate = false
    },
    deselectSite(item) {
      this.selectedSites.splice(this.selectedSites.indexOf(item), 1)
      this.selectedSites = [...this.selectedSites]
      this.requiresUpdate = true
    },
    selectSite() {
      this.requiresUpdate = true
    }
  }
}
</script>
