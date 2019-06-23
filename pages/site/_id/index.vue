<template>
  <div>
    <RefreshButton :refreshing="refreshing" @click="refreshSiteConfig()" />
    <v-container fluid class="px-2 ma-0">
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
              <BuildingForm
                :site="site"
                :button-text="`Add Building to ${site.name}`"
              />
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex>
          <BuildingTabs :site="site" :buildings="buildings" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BuildingTabs from '@/components/building/BuildingTabs.vue'
import BuildingForm from '@/components/building/BuildingForm.vue'
import RefreshButton from '@/components/core/RefreshButton'

export default {
  head() {
    return {
      title: this.site.name
    }
  },
  components: {
    BuildingTabs,
    BuildingForm,
    RefreshButton
  },
  data: () => ({
    refreshing: false
  }),
  computed: {
    ...mapGetters({
      site: 'site/site',
      buildings: 'site/buildings'
    })
  },
  async fetch({ store, params }) {
    if (params.id != store.state.site.site.id) {
      await store.dispatch('site/fetchSiteConfig', params.id)
    }
  },
  methods: {
    async refreshSiteConfig() {
      this.refreshing = true
      await this.$store.dispatch('site/fetchSiteConfig', this.site.id)
      this.refreshing = false
    }
  }
}
</script>
