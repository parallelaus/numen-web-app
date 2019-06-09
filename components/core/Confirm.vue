<template>
  <v-dialog v-model="dialog" max-width="350">
    <v-btn
      slot="activator"
      :color="buttonColor"
      :loading="activatorButtonLoading"
      outline
      small
    >
      {{ buttonText }}
    </v-btn>

    <v-card>
      <v-card-title class="headline">
        {{ headerText }}
      </v-card-title>
      <v-card-text v-if="messageText">
        {{ messageText }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" flat small @click="confirm">
          {{ buttonText }}
        </v-btn>
        <v-spacer />
        <v-btn color="primary" flat small @click="dialog = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    headerText: {
      type: String,
      default: 'Are you sure?'
    },
    buttonText: {
      type: String,
      default: 'Delete'
    },
    buttonColor: {
      type: String,
      default: 'error'
    },
    messageText: {
      type: String,
      default: ''
    },
    activatorButtonLoading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    confirm() {
      this.$emit('confirm', true)
      this.dialog = false
    }
  }
}
</script>
