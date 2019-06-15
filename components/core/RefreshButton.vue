<template>
  <v-container fluid class="pa-0 ma-0">
    <v-layout>
      <v-flex xs12 class="text-xs-right">
        <v-btn
          flat
          icon
          color="primary"
          :loading="refreshing"
          @click="$emit('click', true)"
        >
          <v-icon>cached</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    refreshing: {
      type: Boolean,
      default: false
    }
  }
}
</script>
