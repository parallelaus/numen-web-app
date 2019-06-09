<template>
  <v-container fluid>
    <v-layout column>
      <v-flex xs12>
        <v-layout row align-end>
          <v-flex xs6>
            <span>
              <span class="display-1 font-weight-bold">{{ site.name }}</span>
              <span
                v-if="$store.state.techMode"
                class="caption font-weight-thin"
              >
                &nbsp;(ID: {{ site.id }})
              </span>
              <p>{{ site.address }}</p>
            </span>
          </v-flex>
          <v-flex xs6 text-xs-right>
            <BuildingForm :site="site" />
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex>
        <BuildingTabs :buildings="buildings" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import BuildingTabs from '@/components/building/BuildingTabs.vue'
import BuildingForm from '@/components/building/BuildingForm.vue'

export default {
  head() {
    return {
      title: this.site.name
    }
  },
  components: {
    BuildingTabs,
    BuildingForm
  },
  computed: {
    site() {
      return this.fetchSite(this.$route.params.id)
    },
    ...mapGetters({
      fetchSite: 'site/site',
      buildings: 'site/buildings'
    })
  },
  async fetch({ store, params }) {
    await store.dispatch('site/fetchSiteConfig', params.id)
  }
}
</script>
