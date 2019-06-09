<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-btn slot="activator" color="primary" outline small>
      Add Switchboard to {{ building.name }}
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Add switchboard to {{ building.name }}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout column>
            <v-flex xs12>
              <v-text-field
                v-model="switchboard.name"
                label="Switchboard Name*"
              />
            </v-flex>
            <v-flex>
              <v-textarea
                v-model="switchboard.description"
                label="Description"
                rows="2"
                auto-grow
              />
            </v-flex>
          </v-layout>
        </v-container>
        <span caption class="font-weight-light grey--text">
          *indicates required field
        </span>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" flat @click="deleteSwitchboard">
          Delete
        </v-btn>
        <v-spacer />
        <v-btn color="primary" flat @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="primary" flat @click="addUpdateSwitchboard">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    building: Object
  },
  data: () => ({
    dialog: false,
    switchboard: {
      name: '',
      description: '',
      location: ''
    }
  }),
  // computed: {
  //   ...mapState({
  //     buildingTypes: state => state.types.building_types
  //   })
  // },
  methods: {
    async addUpdateSwitchboard() {
      console.log('Submit Switchboard')
    },
    async deleteSwitchboard() {
      console.log('Delete Switchboard')
    }
  }
}
</script>
