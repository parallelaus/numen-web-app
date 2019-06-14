<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-btn slot="activator" color="primary" outline small @click="initDialog()">
      {{ dataButtonText }}
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">{{ dataHeaderText }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container grid-list-md>
            <v-layout column>
              <v-flex xs12>
                <v-text-field
                  v-model="switchboard.name"
                  label="Switchboard Name*"
                  :rules="textRequired"
                />
              </v-flex>
              <v-flex>
                <v-textarea
                  v-model="switchboard.description"
                  label="Description"
                  auto-grow
                />
              </v-flex>
              <v-flex>
                <v-text-field
                  v-model="switchboard.location"
                  label="Location"
                  :rules="textRequired"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
        <span caption class="font-weight-light grey--text">
          *indicates required field
        </span>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" flat @click="dialog = false">
          Close
        </v-btn>
        <v-btn
          color="primary"
          flat
          :loading="saving"
          @click="addUpdateSwitchboard"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    building: {
      type: Object,
      required: true
    },
    editSwitchboard: {
      type: Object,
      required: false,
      default: undefined
    },
    headerText: {
      type: String,
      default: 'Add Switchboard'
    },
    buttonText: {
      type: String,
      default: 'Add Switchboard'
    }
  },
  data: () => ({
    dialog: false,
    saving: false,
    dataHeaderText: 'Add Switchboard',
    dataButtonText: 'Add Switchboard',

    switchboard: {
      id: undefined,
      name: '',
      description: '',
      location: ''
    },
    textRequired: [v => v.length > 0 || 'Field is required']
  }),
  watch: {
    dialog: function(dialog) {
      if (!dialog) {
        this.switchboard = {
          id: undefined,
          name: '',
          description: '',
          location: ''
        }
      }
    }
  },
  created() {
    this.dataButtonText = this.buttonText
  },
  methods: {
    initDialog() {
      this.dataHeaderText = this.headerText
      if (this.editSwitchboard) {
        // Edit Mode
        this.switchboard = JSON.parse(JSON.stringify(this.editSwitchboard))
      }
    },

    async addUpdateSwitchboard() {
      if (this.$refs.form.validate()) {
        this.saving = true
        if (this.switchboard.id) {
          await this.$store.dispatch('site/updateSwitchboard', this.building)
        } else {
          await this.$store.dispatch('site/addChildEntity', {
            parentType: 'building',
            parentId: this.building.id,
            childType: 'switchboard',
            child: this.switchboard
          })
        }
        this.saving = false
        this.dialog = false
      }
    }
  }
}
</script>
