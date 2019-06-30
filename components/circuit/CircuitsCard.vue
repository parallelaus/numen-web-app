<template>
  <div>
    <v-card
      v-for="circuit in circuits"
      :key="circuit.id"
      class="mr-3"
      color="green lighten-4"
    >
      <v-card-title class="subheading font-weight-bold">
        {{ phaseColour(circuit.phase_id).label }}
        <span v-if="$store.state.techMode" class="caption font-weight-thin">
          &nbsp;(Circuit ID: {{ circuit.id }})
        </span>
      </v-card-title>
      <v-card-text class="caption">
        <span v-if="circuit.cable_size">
          <span class="font-weight-bold">Cable:</span>
          {{ circuit.cable_size }} mm
        </span>
        <span>
          <span class="font-weight-bold">Breaker:</span>
          {{ circuit.breaker_size }} A
        </span>
      </v-card-text>
    </v-card>
    <v-card v-if="canAddCircuitsToDevice(device)" class="mr-3" flat>
      <v-card-text class="text-xs-center">
        <v-btn color="primary" outline>
          Add Circuit to {{ device.name }}
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    circuits: {
      type: Array,
      default: undefined
    },
    device: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      phaseColour: 'site/phaseColour'
    })
  },
  methods: {
    canAddCircuitsToDevice(device) {
      // Single phase loads
      if (device['3ph_load'] == 0 && device.circuits.length >= 1) {
        return false
      }

      // Three phase supply
      if (
        device['3ph_load'] == 1 &&
        device.load_type_id < 100 &&
        device.circuits.length >= 4
      ) {
        return false
      }

      // Three phase loads
      if (
        device['3ph_load'] == 1 &&
        device.load_type_id >= 100 &&
        device.circuits.length >= 3
      ) {
        return false
      }

      return true
    }
  }
}
</script>
