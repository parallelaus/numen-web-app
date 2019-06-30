<template>
  <v-container>
    <v-layout column>
      <v-flex xs12>
        <span>Dashboard will go here</span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    reviews: 413,
    value: 4.5
  }),
  mounted() {
    // Load the all system options
    // this.$store.dispatch('types/fetchAll')
  }
}
</script>
