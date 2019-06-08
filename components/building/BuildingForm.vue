<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" outline small v-on="on">
        Add Building
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add a new building to {{ site.name }}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                v-model="building.name"
                label="Building Name*"
                required
              />
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="building.address"
                :value="site.address"
                label="Address*"
                required
                rows="3"
                auto-grow
              />
            </v-flex>
            <v-flex xs12>
              <v-select
                v-model="building.building_type_id"
                :items="buildingTypes"
                item-text="label"
                item-value="id"
                label="Building Type*"
                required
              />
            </v-flex>
          </v-layout>
        </v-container>
        <span caption class="font-weight-light grey--text">
          *indicates required field
        </span>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" flat @click="deleteBuilding">
          Delete
        </v-btn>
        <v-spacer />
        <v-btn color="primary" flat @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="primary" flat @click="addUpdateBuilding">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    site: Object
  },
  data: () => ({
    dialog: false,
    building: {
      name: '',
      address: '',
      building_type_id: null
    }
  }),
  validations: {
    building: {
      name: { required },
      address: { required },
      building_type_id: { required }
    }
  },
  computed: {
    ...mapState({
      buildingTypes: state => state.types.building_types
    })
  },
  methods: {
    async addUpdateBuilding() {
      this.$v.$touch()
      if (!this.$v.$invalif) {
        console.log('Submit Building')
      } else {
        console.log('Form invalid')
      }
    },
    async deleteBuilding() {
      console.log('Delete Building' + this.building.id)
    }
  }
}
</script>
