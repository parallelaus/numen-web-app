<template>
  <div>
    <v-container grid-list-xs fluid pa-0>
      <v-layout row wrap>
        <v-flex xs11 pl-3 pt-3>
          <span>
            <span class="display-1 font-weight-bold">{{ site.name }}</span>
            <span v-if="$store.state.techMode" class="caption font-weight-thin">
              &nbsp;(ID: {{ site.id }})
            </span>
            <p class="ma-0">{{ site.address }}</p>
          </span>
        </v-flex>
        <v-flex xs1 pt-0 />
      </v-layout>
    </v-container>
    <v-container fluid pa-0 px-2>
      <v-layout column>
        <v-flex>
          <v-layout pa-0 mt-3>
            <v-flex xs6 pt-1 pl-2>
              <v-btn-toggle v-model="view" class="transparent">
                <v-btn flat small value="site">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Site&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </v-btn>
                <v-btn flat small value="electrical">
                  Electrical
                </v-btn>
                <v-btn flat small value="numen">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Numen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </v-btn>
              </v-btn-toggle>
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
import { mapState } from 'vuex'
import BuildingTabs from '@/components/building/BuildingTabs.vue'
import BuildingForm from '@/components/building/BuildingForm.vue'

export default {
  middleware: 'load-types',
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
    view: {
      get() {
        return this.$store.state.site.view
      },
      set(view) {
        this.$store.commit('site/SET_VIEW', view)
      }
    },
    // ...mapGetters({
    //   site: 'site/site',
    //   buildings: 'site/buildings'
    // })
    ...mapState({
      site: state => state.site.site,
      buildings: state => state.site.buildings
    })
  },
  async fetch({ store, params }) {
    await store.dispatch('site/fetchSiteConfig', params.id)
  },
  methods: {
    selectView(view) {
      this.$store.commit('site/SET_VIEW', view)
    }
  }
}
</script>

<style scoped>
.v-btn--active {
  color: #0d47a1 !important;
}
</style>
