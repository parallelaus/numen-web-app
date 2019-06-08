<template>
  <v-container fluid grid-list-md>
    <v-layout>
      <v-flex xs12 pa-0 class="text-xs-right">
        <v-btn outline small color="primary">
          Add Switchboard
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex pa-0>
        <v-expansion-panel>
          <v-expansion-panel-content
            v-for="switchboard in switchboards"
            :key="switchboard.id"
          >
            <div slot="header">
              <p class="subheading font-weight-bold">
                {{ switchboard.name }}
                <span
                  v-if="$store.state.techMode"
                  class="caption font-weight-thin"
                >
                  &nbsp;(ID: {{ switchboard.id }})
                </span>
              </p>
              <p class="caption">
                {{ switchboard.description }}
              </p>
            </div>
            <div class="text-xs-right" pa-0>
              <v-menu offset-y>
                <v-btn slot="activator" color="primary" outline small>
                  Add Device
                </v-btn>
                <v-list>
                  <v-list-tile
                    v-for="(item, index) in addDeviceOptions"
                    :key="index"
                    @click="addDevice(item.type)"
                  >
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </div>
            <v-layout
              v-for="(device, idx) in devices(switchboard.id)"
              :key="device.id"
              column
            >
              <v-flex xs12>
                <v-layout row>
                  <v-flex xs8 d-flex>
                    <CircuitsCard :circuits="circuits(device.id)" />
                  </v-flex>
                  <v-flex xs4 d-flex>
                    <DeviceCard :device="device" />
                  </v-flex>
                </v-layout>
                <v-divider
                  v-if="idx + 1 < devices(switchboard.id).length"
                  :key="idx"
                />
              </v-flex>
            </v-layout>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import CircuitsCard from '@/components/circuit/CircuitsCard.vue'
import DeviceCard from '@/components/device/DeviceCard.vue'

export default {
  components: {
    CircuitsCard,
    DeviceCard
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    building: Object
  },
  data: () => ({
    addDeviceOptions: [
      { type: '3ph_load', title: 'Three Phase Device' },
      { type: '1ph_load', title: 'Single Phase Device' },
      { type: '3ph_incoming', title: 'Three Phase Supply - Incoming' },
      { type: '3ph_outgoing', title: 'Three Phase Supply - Outgoing' }
    ]
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
    addDevice(type) {
      console.log('Add device type=' + type)
    }
  }
}
</script>
