<template>
  <div>
    <v-sheet color="grey lighten-3">
      <v-tabs
        id="building-tabs"
        fixed-tabs
        slider-color="primary"
        color="transparent"
      >
        <v-tab v-for="building in buildings" :key="building.id">
          {{ building.name }}
          <span
            v-if="$store.state.techMode"
            class="caption font-weight-thin text-capitalize"
          >
            &nbsp;(Building ID: {{ building.id }})
          </span>
        </v-tab>
        <v-tab-item
          v-for="building in buildings"
          :key="building.id"
          class="mt-3"
        >
          <v-layout row wrap>
            <v-flex xs6>
              <SwitchboardForm
                :building="building"
                :button-text="`Add Switchboard to ${building.name}`"
                :header-text="`Add Switchboard to ${building.name}`"
              />
            </v-flex>
            <v-flex xs6 class="text-xs-right">
              <ConfirmDelete
                :button-text="`Delete ${building.name}`"
                :activator-button-loading="deleting"
                @confirm="deleteBuilding(building.id)"
              />
              <BuildingForm
                :site="site"
                :edit-building="building"
                :button-text="`Edit ${building.name}`"
                :header-text="`Edit ${building.name}`"
              />
            </v-flex>
            <v-flex class="px-2 pb-2">
              <BuildingElectrical :building="building" />
            </v-flex>
          </v-layout>
        </v-tab-item>
      </v-tabs>
    </v-sheet>
  </div>
</template>

<script>
import BuildingElectrical from '@/components/building/BuildingElectrical'
import SwitchboardForm from '@/components/switchboard/SwitchboardForm'
import BuildingForm from '@/components/building/BuildingForm.vue'
import ConfirmDelete from '@/components/core/Confirm'

export default {
  components: {
    BuildingElectrical,
    SwitchboardForm,
    BuildingForm,
    ConfirmDelete
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    site: {
      type: Object,
      required: true
    },
    buildings: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    deleting: false,
    confirmDelete: false
  }),
  methods: {
    async deleteBuilding(building_id) {
      this.deleting = true
      await this.$store.dispatch('site/deleteEntity', {
        type: 'building',
        id: building_id
      })
      this.deleting = false
    }
  }
}
</script>
