<template>
  <div>
    <v-card
      v-for="circuit in circuits"
      :key="circuit.id"
      class="ml-3"
      color="green lighten-4"
    >
      <v-card-title class="subheading font-weight-bold">
        {{ circuit.name }}
        <span v-if="$store.state.techMode" class="caption font-weight-thin">
          &nbsp;(ID: {{ circuit.id }})
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
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    circuits: Array
  }
}
</script>
