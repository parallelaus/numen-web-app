<template>
  <v-card color="yellow lighten-4">
    <v-card-title class="subheading font-weight-bold">
      {{ switchboard.name }}
      <span v-if="$store.state.techMode" class="caption font-weight-thin">
        &nbsp;(ID: {{ switchboard.id }})
      </span>
      <span class="caption">{{ switchboard.description }}</span>
    </v-card-title>
    <v-card-actions>
      <v-spacer />
      <v-btn flat color="primary">
        Update
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    switchboard: Object
  }
}
</script>
