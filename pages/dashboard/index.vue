<template>
  <v-container fluid grid-list-xs>
    <v-layout column>
      <v-flex>
        <SiteChips @update="updateSites($event)" />
      </v-flex>
      <v-flex>
        <SiteConsumptionChart
          :data="consumptionChartData"
          :loading="siteStatsLoading"
        />
      </v-flex>
      <v-flex>
        <RankingsChart :data="rankingChartData" :loading="siteStatsLoading" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SiteChips from '@/components/site/SiteChips'
import SiteConsumptionChart from '@/components/charts/SiteConsumption'
import storeToConsumptionChartData from '@/components/charts/SiteConsumption/utils'
import RankingsChart from '@/components/charts/Rankings'
import { storeDataToRankingData } from '@/components/charts/Rankings/utils'

export default {
  head() {
    return {
      title: 'Dashboard'
    }
  },
  components: {
    SiteChips,
    SiteConsumptionChart,
    RankingsChart
  },
  data() {
    return {
      siteStatsLoading: true
    }
  },
  computed: {
    rankingChartData() {
      const now = new Date()
      const date =
        now.getUTCFullYear() +
        '-' +
        (now.getUTCMonth() + 1).toString().padStart(2, '0')

      return storeDataToRankingData(this.$store, date)
    },
    consumptionChartData() {
      return storeToConsumptionChartData(this.$store.state.stats.sites)
    }
  },
  async fetch({ store }) {
    await store.dispatch('site/fetchSites')
  },
  methods: {
    async updateSites(sites) {
      console.log('Update dashboard for selected site(s)')
      this.siteStatsLoading = true
      const params = {
        period: '1m',
        from: '2019-01'
      }
      await this.$store.dispatch('stats/fetchSiteStats', { sites, params })
      this.sites = sites
      this.siteStatsLoading = false
    }
  }
}
</script>
