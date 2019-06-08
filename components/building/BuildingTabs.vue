<template>
  <v-tabs id="building-tabs" fixed-tabs slider-color="primary">
    <v-tab v-for="building in buildings" :key="building.id">
      {{ building.name }}
      <span v-if="$store.state.techMode" class="caption font-weight-thin">
        &nbsp;(ID: {{ building.id }})
      </span>
    </v-tab>
    <v-tab-item v-for="building in buildings" :key="building.id">
      <v-layout column>
        <v-flex xs12>
          <BuildingElectrical :building="building" />
        </v-flex>
        <v-flex xs12 text-xs-right>
          <v-btn small outline color="error">
            Delete {{ building.name }}
          </v-btn>
        </v-flex>
      </v-layout>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import BuildingElectrical from '@/components/building/BuildingElectrical.vue'

export default {
  components: {
    BuildingElectrical
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    buildings: Array
  }
}
</script>
