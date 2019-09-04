<template>
  <div>
    <div class="text-xs-right">
      <v-btn
        small
        color="primary"
        outline
        :loading="loadingSites"
        @click="reloadSites"
      >
        <v-icon small>
          cached
        </v-icon>
        &nbsp;&nbsp;&nbsp;Reload Sites
      </v-btn>
    </div>

    <v-container grid-list-md>
      <v-layout column>
        <SiteCard v-for="site in sites" :key="site.id" :site="site" />
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import SiteCard from '@/components/site/SiteCard.vue'
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: 'Sites'
    }
  },
  components: {
    SiteCard
  },
  data: () => ({
    loadingSites: false
  }),
  computed: {
    ...mapState({
      sites: state => state.site.sites
    })
  },
  async fetch({ store }) {
    await store.dispatch('site/fetchSites')
  },
  methods: {
    async reloadSites() {
      this.loadingSites = true
      this.$store.commit('site/CLEAR_SITES')
      await this.$store.dispatch('site/fetchSites')
      this.loadingSites = false
    }
  }
}
</script>
