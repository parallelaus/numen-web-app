<template>
  <v-container fluid pa-0>
    <v-layout row wrap>
      <v-flex xs8 class="scroll-list">
        <div v-for="collector in collectors" :key="collector.serial_number">
          <CollectorCard :collector="collector" />
        </div>
      </v-flex>
      <v-flex xs4 pl-2 class="scroll-list">
        <CircuitsSelect :building="building" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import CollectorCard from '@/components/collector/CollectorCard'
import CircuitsSelect from '@/components/circuit/CircuitsSelect'

export default {
  components: {
    CollectorCard,
    CircuitsSelect
  },
  props: {
    building: {
      type: Object,
      required: true
    }
  },
  computed: {
    collectors() {
      return this.collectorsByBuilding(this.building.id)
    },
    ...mapGetters({
      collectorsByBuilding: 'site/collectorsByBuilding'
    })
  }
}
</script>

<style scoped>
.scroll-list {
  height: 91vh;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
}
</style>
