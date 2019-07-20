<template>
  <v-container fluid grid-list-md>
    <v-layout column>
      <v-flex>
        <SiteChips />
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs6>
        <RandomChart />
      </v-flex>
      <v-flex xs6>
        <RandomBarChart />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SiteChips from '@/components/site/SiteChips'
import RandomChart from '@/components/charts/RandomLineChart'
import RandomBarChart from '@/components/charts/RandomBarChart'

export default {
  head() {
    return {
      title: 'Dashboard'
    }
  },
  components: {
    SiteChips,
    RandomChart,
    RandomBarChart
  },
  async fetch({ store }) {
    await store.dispatch('site/fetchSites')
  }
}
</script>
