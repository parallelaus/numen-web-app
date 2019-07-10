<template>
  <v-list class="pa-0">
    <v-card v-if="switchboards.length == 0" flat color="transparent">
      <v-card-title>
        <v-icon color="green">
          check
        </v-icon>
        <span class="pl-2 green--text subheading font-weight-meduim">
          All circuits connected
        </span>
      </v-card-title>
    </v-card>

    <v-list-group
      v-for="switchboard in switchboards"
      :key="switchboard.id"
      class="pb-1 elevation-4"
    >
      <v-list-tile slot="activator">
        <v-list-tile-title>
          {{ switchboard.name }}
        </v-list-tile-title>
      </v-list-tile>
      <v-card
        v-for="device in devices(switchboard.id)"
        :key="device.id"
        class="ma-2 pr-1 pb-1"
        color="blue lighten-3"
        flat
        @dragstart.self="pickUpDevice($event, device.id)"
      >
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title primary-title class="pa-0 pt-1 pl-1">
              <div class="pa-0">
                <span class="subheading font-weight-bold pa-0">
                  {{ device.name }}
                </span>
                <p class="caption ma-0 pa-0 pl-2">
                  {{ device.location }}
                </p>
              </div>
            </v-card-title>
          </v-flex>
          <v-flex xs12>
            <v-layout row wrap align-center>
              <v-flex xs1>
                <span>
                  <!-- <v-icon>drag_indicator</v-icon> -->
                </span>
              </v-flex>
              <v-flex xs11>
                <v-card
                  v-for="circuit in circuits(device.id)"
                  :key="circuit.id"
                  color="blue lighten-4"
                  class="ma-1"
                  draggable
                  hover
                  @dragstart="pickUpCircuit($event, circuit.id)"
                >
                  <v-card-title class="pa-0 py-2">
                    <span>
                      <v-icon>drag_indicator</v-icon>
                    </span>
                    <span class="subheading font-weight-medium">
                      {{ phaseColour(circuit.phase_id).label }}
                    </span>
                    <span v-if="!circuit.ct_number" class="pl-2">
                      <span class="caption font-weight-medium">
                        CT:
                      </span>
                      <span class="caption font-weight-thin">
                        {{ circuit.ct_type_id }}A
                      </span>
                    </span>
                    <span v-if="circuit.ct_number" class="pl-2">
                      <span class="caption font-weight-medium">
                        CT:
                      </span>
                      <span class="caption font-weight-thin">
                        {{ circuit.ct_number }} ({{ circuit.ct_type_id }}A)
                      </span>
                    </span>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-list-group>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    building: {
      type: Object,
      required: true
    }
  },
  computed: {
    switchboards() {
      return this.switchboardsByBuilding(this.building.id).filter(
        switchboard => this.devices(switchboard.id).length > 0
      )
    },
    ...mapGetters({
      switchboardsByBuilding: 'site/switchboardsByBuilding',
      collectorsByBuilding: 'site/collectorsByBuilding',
      devicesBySwitchboard: 'site/devicesBySwitchboard',
      circuitsByDevice: 'site/circuitsByDevice',
      phaseColour: 'site/phaseColour'
    })
  },
  methods: {
    devices(switchboard_id) {
      return this.devicesBySwitchboard(switchboard_id).filter(
        device => this.circuits(device.id).length > 0
      )
    },
    circuits(device_id) {
      // get circuits already connected to a collector
      return this.circuitsByDevice(device_id).filter(circuit => {
        return !(
          this.$store.state.site.collectors_ports.findIndex(
            collectorPort => collectorPort.circuit == circuit.id
          ) + 1
        )
      })
    },
    pickUpCircuit(e, circuit_id) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('circuit_id', circuit_id)
    },
    pickUpDevice(e, device_id) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('device_id', device_id)
    }
  }
}
</script>
