<template>
  <div>
    <v-tabs id="building-tabs" fixed-tabs slider-color="primary">
      <v-tab v-for="building in buildings" :key="building.id">
        {{ building.name }}
        <span v-if="$store.state.techMode" class="caption font-weight-thin">
          &nbsp;(ID: {{ building.id }})
        </span>
      </v-tab>
      <v-tab-item v-for="building in buildings" :key="building.id">
        <v-layout column>
          <v-flex xs12 class="text-xs-right">
            <SwitchboardForm :building="building" />
          </v-flex>
          <v-flex>
            <BuildingElectrical :building="building" />
          </v-flex>
          <v-flex text-xs-right>
            <v-btn
              small
              outline
              color="primary"
              @click="editBuilding(building)"
            >
              Edit {{ building.name }}
            </v-btn>
            <ConfirmDelete
              :button-text="`Delete ${building.name}`"
              :activator-button-loading="deleting"
              @confirm="deleteBuilding(building.id)"
            />
          </v-flex>
        </v-layout>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import BuildingElectrical from '@/components/building/BuildingElectrical'
import SwitchboardForm from '@/components/switchboard/SwitchboardForm'
import ConfirmDelete from '@/components/core/Confirm'

export default {
  components: {
    BuildingElectrical,
    SwitchboardForm,
    ConfirmDelete
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    buildings: Array
  },
  data: () => ({
    deleting: false,
    confirmDelete: false
  }),
  methods: {
    async deleteBuilding(building_id) {
      this.deleting = true
      await this.$store.dispatch('site/deleteBuilding', building_id)
      this.deleting = false
    },
    editBuilding(building) {
      console.log('Edit ' + building.name)
    }
  }
}
</script>
