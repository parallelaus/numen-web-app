<template>
  <div>
    <RefreshButton :refreshing="refreshing" @click="refreshSites()" />
    <v-container grid-list-md>
      <v-layout column>
        <SiteCard v-for="site in sites" :key="site.id" :site="site" />
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import SiteCard from '@/components/site/SiteCard.vue'
import RefreshButton from '@/components/core/RefreshButton'
import { mapGetters } from 'vuex'

export default {
  head() {
    return {
      title: 'Sites'
    }
  },
  components: {
    SiteCard,
    RefreshButton
  },
  data: () => ({
    refreshing: false
  }),
  computed: {
    ...mapGetters({
      sites: 'site/sites'
    })
  },
  async fetch({ store }) {
    if (store.state.site.sites == 0) {
      await store.dispatch('site/fetchSites')
    }
  },
  methods: {
    async refreshSites() {
      this.refreshing = true
      await this.$store.dispatch('site/fetchSites')
      this.refreshing = false
    }
  }
}
</script>
