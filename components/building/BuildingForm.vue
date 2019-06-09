<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-btn slot="activator" color="primary" outline small>
      Add Building to {{ site.name }}
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Add a new building to {{ site.name }}</span>
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
                  rows="2"
                  auto-grow
                />
              </v-flex>

              <v-flex>
                <v-textarea
                  v-model="building.address"
                  label="Address*"
                  :rules="textRequired"
                  rows="3"
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
        <v-btn color="error" flat @click="deleteBuilding">
          Delete Building
        </v-btn>
        <v-spacer />
        <v-btn color="primary" flat @click="dialog = false">
          Close
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
    // eslint-disable-next-line vue/require-default-prop
    site: Object,
    editBuildingId: {
      type: Number,
      required: false,
      default: null
    }
  },
  data: () => ({
    dialog: false,
    building: {
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
  methods: {
    async addUpdateBuilding() {
      if (this.$refs.form.validate()) {
        this.saving = true
        await this.$store.dispatch('site/addBuilding', this.building)
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
