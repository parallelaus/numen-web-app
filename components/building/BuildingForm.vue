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
                  v-model="building.name"
                  :rules="textRequired"
                  label="Building Name*"
                />
              </v-flex>
              <v-flex>
                <v-textarea
                  v-model="building.description"
                  label="Description"
                  auto-grow
                />
              </v-flex>
              <v-flex>
                <v-textarea
                  v-model="building.address"
                  label="Address*"
                  :rules="textRequired"
                  auto-grow
                />
              </v-flex>
              <v-flex>
                <v-select
                  v-model="building.building_type_id"
                  :rules="selectRequired"
                  validate-on-blur
                  :items="buildingTypes"
                  item-text="label"
                  item-value="id"
                  label="Building Type*"
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
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          flat
          :loading="saving"
          @click="addUpdateBuilding"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    site: {
      type: Object,
      required: true
    },
    editBuilding: {
      type: Object,
      required: false,
      default: undefined
    },
    headerText: {
      type: String,
      default: 'Add Building'
    },
    buttonText: {
      type: String,
      default: 'Add Building'
    }
  },
  data: () => ({
    dialog: false,
    dataHeaderText: 'Add Building',
    dataButtonText: 'Add Building',
    building: {
      id: undefined,
      name: '',
      address: '',
      description: '',
      building_type_id: null
    },
    textRequired: [v => v.length > 0 || 'Field is required'],
    selectRequired: [v => v > 0 || 'Please select an option'],
    saving: false
  }),
  computed: {
    ...mapState({
      buildingTypes: state => state.types.building_types
    })
  },
  watch: {
    dialog: function(dialog) {
      if (!dialog) {
        this.building = {
          id: undefined,
          name: '',
          address: '',
          description: '',
          building_type_id: null
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
      if (this.editBuilding) {
        // Edit Mode
        // Copy the editBuilding object into the building object
        this.building = JSON.parse(JSON.stringify(this.editBuilding))
      } else {
        // Smart defaults
        this.building.address = this.site.address
      }
    },
    async addUpdateBuilding() {
      if (this.$refs.form.validate()) {
        this.saving = true
        if (this.building.id) {
          await this.$store.dispatch('site/updateBuilding', this.building)
        } else {
          await this.$store.dispatch('site/addBuilding', this.building)
        }
        this.saving = false
        this.dialog = false
      }
    },
    async deleteBuilding() {
      console.log('Delete Building' + this.building.id)
      this.dialog = false
    }
  }
}
</script>
