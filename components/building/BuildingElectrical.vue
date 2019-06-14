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
            <span class="ml-5">
              <v-icon color="primary" small>edit</v-icon>
            </span>
          </span>
          <p class="caption">
            {{ switchboard.description }}
          </p>
        </div>
        <div class="text-xs-right mr-2">
          <v-menu offset-y>
            <v-btn slot="activator" color="primary" outline small>
              Add Device to {{ switchboard.name }}
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

export default {
  components: {
    CircuitsCard,
    DeviceCard
  },
  props: {
    building: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    addDeviceOptions: [
      { type: '3ph_load', title: 'Three Phase Load - Balanced' },
      { type: '3ph_load', title: 'Three Phase Load - Unbalanced' },
      { type: '1ph_load', title: 'Single Phase Load' },
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
