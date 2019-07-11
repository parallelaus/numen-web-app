<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-btn
      slot="activator"
      color="primary"
      outline
      small
      class="ma-0 mb-1"
      @click="initDialog()"
    >
      Add Collector to {{ building.name }}
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Add Collector to {{ building.name }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container grid-list-md>
            <v-layout column>
              <v-flex xs12>
                <v-text-field
                  v-model="collector.serial_number"
                  label="Collector Serial Number*"
                  :rules="textRequired"
                />
              </v-flex>
              <v-flex>
                <v-text-field
                  v-model="collector.name"
                  label="Collector Label*"
                  :rules="textRequired"
                />
              </v-flex>
              <v-flex>
                <v-text-field v-model="collector.location" label="Location" />
              </v-flex>
              <v-flex>
                <v-select
                  v-model="collector.switchboard_id"
                  :items="getSwitchboardOptions(building.id)"
                  item-text="name"
                  item-value="id"
                  label="Associated Switchboard"
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
          @click="addUpdateCollector"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    building: {
      type: Object,
      required: true
    },

    editCollector: {
      type: Object,
      required: false,
      default: undefined
    }
  },
  data: () => ({
    dialog: false,
    saving: false,

    collector: {
      serial_number: '',
      name: '',
      location: '',
      switchboard: undefined
    },
    textRequired: [v => v.length > 0 || 'Field is required']
  }),
  computed: {
    ...mapGetters({
      switchboardsByBuilding: 'site/switchboardsByBuilding'
    })
  },
  methods: {
    initDialog() {
      //   this.dataHeaderText = this.headerText
      this.$refs.form.resetValidation()
      //   if (this.editCollector) {
      //     // Edit Mode
      //     this.switchboard = JSON.parse(JSON.stringify(this.editSwitchboard))
      //   } else {
      //     // smart defaults
      this.collector = {
        serial_number: '',
        name: '',
        location: '',
        switchboard: undefined
      }
      //   }
    },

    getSwitchboardOptions(building_id, includeUnspecified = true) {
      const options = this.switchboardsByBuilding(building_id)
      if (includeUnspecified) {
        const unspecified = {
          id: undefined,
          name: 'Multiple or Unspecified'
        }
        return [unspecified, ...options]
      }
      return options
    },

    async addUpdateCollector() {
      if (this.$refs.form.validate()) {
        this.saving = true
        await this.$store.dispatch('site/addBuildingCollector', {
          buildingId: this.building.id,
          collector: this.collector
        })
        this.saving = false
      }
    }
  }
}
</script>
