<template>
  <v-flex>
    <v-expansion-panel>
      <v-expansion-panel-content
        v-for="switchboard in switchboards"
        :key="switchboard.id"
      >
        <div slot="header">
          <span class="subheading font-weight-bold text-uppercase">
            {{ switchboard.name }}
            <span v-if="$store.state.techMode" class="caption font-weight-thin">
              &nbsp;(ID: {{ switchboard.id }})
            </span>
          </span>
          <p v-if="switchboard.location" class="caption pa-0 ma-0">
            <span class="font-weight-bold">Location: </span>
            <span>{{ switchboard.location }}</span>
          </p>
          <p v-if="switchboard.description" class="caption pa-0 ma-0">
            <span class="font-weight-bold">Description: </span>
            <span>{{ switchboard.description }}</span>
          </p>
        </div>
        <div class="">
          <v-layout row wrap>
            <v-flex xs6 pl-2>
              <DeviceCircuitsForm :switchboard="switchboard" />
            </v-flex>
            <v-flex xs6 class="text-xs-right">
              <ConfirmDelete
                :button-text="`Delete ${switchboard.name}`"
                :activator-button-loading="deleting"
                @confirm="deleteSwitchboard(switchboard.id)"
              />
              <SwitchboardForm
                :building="building"
                :edit-switchboard="switchboard"
                :button-text="`Edit ${switchboard.name}`"
                :header-text="`Edit ${switchboard.name}`"
              />
            </v-flex>
          </v-layout>
        </div>
        <v-container fluid grid-list-md pa-0 pb-3>
          <v-layout column>
            <v-flex
              v-for="(device, idx) in devices(switchboard.id)"
              :key="device.id"
              xs12
            >
              <v-layout row>
                <v-flex xs4 d-flex>
                  <DeviceCard :device="device" />
                </v-flex>
                <v-flex xs8 d-flex>
                  <CircuitsCard
                    :circuits="circuits(device.id)"
                    :device="device"
                  />
                </v-flex>
              </v-layout>

              <v-divider
                v-if="idx + 1 < devices(switchboard.id).length"
                :key="idx"
                class="mt-1"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-flex>
</template>

<script>
import { mapGetters } from 'vuex'
import CircuitsCard from '@/components/circuit/CircuitsCard.vue'
import DeviceCard from '@/components/device/DeviceCard.vue'
import SwitchboardForm from '@/components/switchboard/SwitchboardForm'
import ConfirmDelete from '@/components/core/Confirm'
import DeviceCircuitsForm from '@/components/device/DeviceCircuitsForm'

export default {
  components: {
    CircuitsCard,
    DeviceCard,
    SwitchboardForm,
    ConfirmDelete,
    DeviceCircuitsForm
  },
  props: {
    building: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    deleting: false
  }),
  computed: {
    switchboards() {
      return this.switchboardsByBuilding(this.building.id)
    },
    ...mapGetters({
      switchboardsByBuilding: 'site/switchboardsByBuilding',
      devicesBySwitchboard: 'site/devicesBySwitchboard',
      circuitsByDevice: 'site/circuitsByDevice'
    })
  },
  methods: {
    circuits(device_id) {
      return this.circuitsByDevice(device_id)
    },
    devices(switchboard_id) {
      return this.devicesBySwitchboard(switchboard_id)
    },
    async deleteSwitchboard(switchboard_id) {
      this.deleting = true
      await this.$store.dispatch('site/deleteEntity', {
        type: 'switchboard',
        id: switchboard_id
      })
      this.deleting = false
    },

    editSwitchboard(id) {
      console.log('Edit switchboard: ' + id)
    }
  }
}
</script>
