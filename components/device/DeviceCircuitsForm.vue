<template>
  <div>
    <v-menu offset-y>
      <v-btn slot="activator" color="primary" outline small>
        Add Circuits to {{ switchboard.name }}
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="(item, index) in addDeviceOptions"
          :key="index"
          @click="initDialog(item)"
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-card-title class="subheading font-weight-bold">
          Add {{ addDeviceSelectedOption.title }}
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container grid-list-md>
              <v-layout column>
                <v-flex xs12>
                  <v-layout row>
                    <v-flex xs5 class="pa-0">
                      <v-radio-group v-model="formData.three_phase" row>
                        <v-radio label="Three Phase" value="true" />
                        <v-radio label="Single Phase" value="false" />
                      </v-radio-group>
                    </v-flex>
                    <v-flex xs5 class="pa-0">
                      <v-radio-group
                        v-if="formData.three_phase == 'false'"
                        v-model="formData.phase"
                        :rules="selectRequired"
                        row
                      >
                        <v-radio
                          v-for="phase in phaseColours"
                          :key="phase.phase"
                          :label="phase.label"
                          :value="phase.phase"
                        />
                      </v-radio-group>
                    </v-flex>
                    <v-flex xs2 class="pa-0">
                      <v-checkbox
                        v-model="formData.neutral"
                        label="plus Neutral"
                      />
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex>
                  <v-layout row>
                    <v-flex xs7>
                      <v-text-field
                        v-model="formData.name"
                        :rules="textRequired"
                        label="Name*"
                      />
                    </v-flex>
                    <v-flex v-if="showLocation" xs5>
                      <v-combobox
                        v-model="formData.location"
                        :items="areas"
                        label="Location"
                        hint="Select an existing location or enter a new one"
                      />
                    </v-flex>
                    <v-flex v-if="showFedBySwitchboard" xs5>
                      <v-select
                        v-model="formData.connected_switchboard"
                        :items="fedByOptions"
                        label="Fed By*"
                        :rules="selectRequired"
                        item-text="name"
                        item-value="id"
                      />
                    </v-flex>
                    <v-flex v-if="showFeedingSwitchboard" xs5>
                      <v-select
                        v-model="formData.connected_switchboard"
                        :items="feedingOptions"
                        label="Feeding*"
                        :rules="selectRequired"
                        item-text="name"
                        item-value="id"
                      />
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex v-if="showLoadType">
                  <v-autocomplete
                    v-model="formData.load_type_id"
                    label="Device Type*"
                    hint="Start typing the type of device then select one of the options. E.g. air"
                    :items="loadTypes"
                    item-text="label"
                    item-value="id"
                    :rules="selectRequired"
                  >
                    <div />
                  </v-autocomplete>
                </v-flex>
                <v-flex>
                  <v-textarea
                    v-model="formData.description"
                    label="Description"
                    rows="2"
                    auto-grow
                  />
                </v-flex>
                <v-flex>
                  <v-layout row>
                    <v-flex xs4>
                      <v-text-field
                        v-model="formData.breaker_size"
                        label="Breaker Size (A)"
                      />
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field
                        v-model="formData.cable_size"
                        label="Cable Size"
                      />
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field v-model="formData.no_cores" label="Cores" />
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex>
                  <v-layout row>
                    <v-flex xs4>
                      <v-text-field
                        v-model="formData.ct_cable_number"
                        label="CT Cable Number"
                      />
                    </v-flex>
                    <v-flex xs4>
                      <v-select
                        v-model="formData.ct_size"
                        :items="ctTypes"
                        label="CT Size"
                        item-text="label"
                        item-value="id"
                      />
                    </v-flex>
                  </v-layout>
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
            @click="addDeviceCircuits"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  props: {
    switchboard: {
      type: Object,
      required: true
    },
    fedBySwitchboard: {
      type: Object,
      required: false,
      default: undefined
    }
  },
  data: () => ({
    dialog: false,
    saving: false,
    dataHeaderText: 'Add Device',
    dataButtonText: 'Add Device',
    showLoadType: false,
    showLocation: false,
    showFedBySwitchboard: true,
    showFeedingSwitchboard: true,
    addDeviceSelectedOption: {},
    addDeviceOptions: [
      { type: 'load', title: 'Load' },
      { type: 'site_mains', title: 'Site Mains' },
      { type: 'building_mains', title: 'Building Mains' },
      { type: 'switchboard_mains', title: 'Switchboard Supply' },
      { type: 'sub_supply', title: 'Supply to other Switchboard' }
      // { type: 'chassis_supply', title: 'Supply to internal sub-board or chassis' }
    ],
    incomingSupplyOptions: [
      'site_mains',
      'building_mains',
      'switchboard_mains'
    ],
    outgoingSupplyOptions: ['sub_supply'],
    fedByOptions: [],
    feedingOptions: [],

    formData: {
      name: '',
      description: '',
      location: '',
      three_phase: 'true',
      phase: undefined,
      neutral: true,
      balanced_load: 'true',
      load_type_id: null,
      connected_switchboard: null,
      breaker_size: '',
      cable_size: '',
      cable_no_cores: 1,
      ct_cable_number: '',
      ct_size: 50
    },

    textRequired: [v => v.length > 0 || 'Field is required'],
    selectRequired: [
      v => (v != null && v != undefined) || 'Please select an option'
    ]
  }),
  computed: {
    areas() {
      const buildingAreas = this.buildingAreas(this.switchboard.building_id)
      const areas = []
      buildingAreas.forEach(area => areas.push(area.name))
      return areas
    },
    phaseColours() {
      const phases = [1, 2, 3]
      const colours = this.$store.state.site.phase_colours.filter(colour =>
        phases.includes(colour.phase)
      )
      return colours
    },
    supplyDevice() {
      const supplyDevice = this.supplyDevice(this.switchboard.id)
      return supplyDevice
    },
    loadTypes() {
      const categories = this.sectionCategories('devices')
      let options = []
      categories.forEach(category => {
        if (category.load_types) {
          options.push({ header: category.label })
          category.load_types.forEach(type_id => {
            const type = this.loadType(type_id)
            options.push({
              id: type.id,
              label: type.label,
              group: category.label
            })
          })
          options.push({ divider: true })
        }
      })
      return options
    },
    ...mapState({
      ctTypes: state => state.types.ct_types,
      switchboards: state => state.site.switchboards
    }),
    ...mapGetters({
      loadType: 'types/loadType',
      buildingAreas: 'site/buildingAreas',
      sectionCategories: 'types/sectionCategories',
      supplyDevice: 'site/switchboardSupplyDevice',
      switchboardsByBuilding: 'site/switchboardsByBuilding',
      feedingSwitchboards: 'site/feedingSwitchboards'
    })
  },
  beforeMount() {
    // remove supply options from Add Device Menu if switchboard already supplied
    if (this.supplyDevice(this.switchboard.id) || this.fedBySwitchboard) {
      this.incomingSupplyOptions.forEach(type => {
        const supplyIndex = this.addDeviceOptions.findIndex(
          item => item.type == type
        )
        if (supplyIndex) {
          this.addDeviceOptions.splice(supplyIndex, 1)
        }
      })
    }
    // remove outgoing supply option if no other switchbaords available
    const feedingOptions = this.filterConnectedSwitchboardOptions(
      this.switchboards,
      false
    )
    if (feedingOptions.length == 0) {
      this.outgoingSupplyOptions.forEach(type => {
        const supplyIndex = this.addDeviceOptions.findIndex(
          item => item.type == type
        )
        if (supplyIndex) {
          this.addDeviceOptions.splice(supplyIndex, 1)
        }
      })
    }
  },
  methods: {
    initDialog(option) {
      this.addDeviceSelectedOption = option

      // Add Only Form - reset validation and formData
      this.$refs.form.resetValidation()
      this.formData = {
        name: '',
        description: '',
        location: '',
        three_phase: 'true',
        phase: undefined,
        neutral: true,
        balanced_load: 'true',
        load_type_id: null,
        connected_switchboard: null,
        breaker_size: '',
        cable_size: '',
        no_cores: 1,
        ct_cable_number: '',
        ct_size: 50
      }

      // Setup smart defaults
      switch (option.type) {
        case 'site_mains':
          this.formData.load_type_id = 3
          this.formData.three_phase = 'true'
          this.formData.neutral = true
          this.formData.name = 'Mains'
          this.formData.location = this.switchboard.name

          this.showLoadType = false
          this.showLocation = false
          this.showFedBySwitchboard = false
          this.showFeedingSwitchboard = false

          break
        case 'building_mains':
          this.formData.load_type_id = 4
          this.formData.three_phase = 'true'
          this.formData.neutral = true
          this.formData.name = 'Mains'
          this.formData.location = this.switchboard.name

          this.showLoadType = false
          this.showLocation = false
          this.showFedBySwitchboard = true
          this.showFeedingSwitchboard = false

          this.fedByOptions = this.filterConnectedSwitchboardOptions(
            this.switchboards
          )

          break
        case 'switchboard_mains':
          this.formData.load_type_id = 1
          this.formData.three_phase = 'true'
          this.formData.neutral = true
          this.formData.name = 'Mains'
          this.formData.location = this.switchboard.name

          this.showLoadType = false
          this.showLocation = false
          this.showFedBySwitchboard = true
          this.showFeedingSwitchboard = false

          this.fedByOptions = this.filterConnectedSwitchboardOptions(
            this.switchboardsByBuilding(this.switchboard.building_id)
          )

          break
        case 'sub_supply':
          this.formData.load_type_id = 2
          this.formData.three_phase = 'true'
          this.formData.neutral = false
          this.formData.name = 'Mains'
          this.formData.location = this.switchboard.name

          this.showLoadType = false
          this.showLocation = false
          this.showFedBySwitchboard = false
          this.showFeedingSwitchboard = true

          this.feedingOptions = this.filterConnectedSwitchboardOptions(
            this.switchboards,
            false
          )

          break
        default:
          this.formData.load_type_id = null
          this.formData.three_phase = 'true'
          this.formData.neutral = false
          this.formData.name = ''
          this.formData.location = ''

          this.showLoadType = true
          this.showLocation = true
          this.showFedBySwitchboard = false
          this.showFeedingSwitchboard = false
      }

      this.dialog = true
    },
    getFedByOptions(option_type) {
      let switchboards = []
      if (option_type == 'switchboard_mains') {
        switchboards = this.switchboardsByBuilding(this.switchboard.building_id)
      } else {
        switchboards = this.switchboards
      }

      const feedingSwitchboards = this.feedingSwitchboards(this.switchboard.id)

      const fedByOptions = switchboards.filter(switchboard => {
        // remove current switchboard
        if (switchboard.id == this.switchboard.id) return false
        // remove switchboards being fed by current switchboard
        if (feedingSwitchboards.find(item => item.id == switchboard.id))
          return false
        return true
      })

      const unspecifiedOption = {
        id: 0,
        name: 'Unspecified'
      }
      return [unspecifiedOption, ...fedByOptions]
    },
    filterConnectedSwitchboardOptions(switchboards, includeUnspecified = true) {
      const feedingSwitchboards = this.feedingSwitchboards(this.switchboard.id)

      const fedByOptions = switchboards.filter(switchboard => {
        // remove current switchboard
        if (switchboard.id == this.switchboard.id) return false
        // remove switchboards being fed by current switchboard
        if (feedingSwitchboards.find(item => item.id == switchboard.id))
          return false
        return true
      })

      if (includeUnspecified) {
        const unspecifiedOption = {
          id: 0,
          name: 'Unspecified'
        }
        return [unspecifiedOption, ...fedByOptions]
      }
      return fedByOptions
    },
    async addDeviceCircuits() {
      if (this.$refs.form.validate()) {
        this.saving = true
        await this.$store.dispatch('site/addDeviceCircuits', {
          switchboard_id: this.switchboard.id,
          input: this.formData
        })
        this.saving = false
      }
    }
  }
}
</script>
