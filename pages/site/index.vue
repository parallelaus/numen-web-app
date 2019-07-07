<template>
  <div>
    <v-container grid-list-md>
      <v-layout column>
        <SiteCard v-for="site in sites" :key="site.id" :site="site" />
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import SiteCard from '@/components/site/SiteCard.vue'
import { mapGetters } from 'vuex'

export default {
  head() {
    return {
      title: 'Sites'
    }
  },
  components: {
    SiteCard
  },
  computed: {
    ...mapGetters({
      sites: 'site/sites'
    })
  },
  async fetch({ store }) {
    await store.dispatch('site/fetchSites')
  }
}
</script>
