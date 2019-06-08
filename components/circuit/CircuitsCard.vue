<template>
  <v-card flat>
    <v-card-text>
      <v-list two-line subheader>
        <template v-for="(circuit, idx) in circuits">
          <v-list-tile :key="circuit.id" avatar ripple>
            <v-list-tile-content>
              <v-list-tile-title class="subheading font-weight-bold">
                {{ circuit.name }}
                <span
                  v-if="$store.state.techMode"
                  class="caption font-weight-thin"
                >
                  &nbsp;(ID: {{ circuit.id }})
                </span>
              </v-list-tile-title>
              <v-list-tile-sub-title v-if="circuit.cable_size">
                <span class="font-weight-bold">Cable:</span>
                {{ circuit.cable_size }} mm
              </v-list-tile-sub-title>
              <v-list-tile-sub-title>
                <span class="font-weight-bold">Breaker:</span>
                {{ circuit.breaker_size }} A
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-list-tile-action-text>
                <v-btn flat small color="primary">
                  Update
                </v-btn>
              </v-list-tile-action-text>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider v-if="idx + 1 < circuits.length" :key="idx" />
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    circuits: Array
  }
}
</script>
