<template>
  <v-card color="blue lighten-4" class="text-xs-left" flat>
    <v-card-title class="subheading font-weight-bold">
      <div width="100%">
        {{ device.name }}
      </div>
      <span v-if="$store.state.techMode" class="caption font-weight-thin">
        &nbsp;(ID: {{ device.id }})
      </span>
      <p v-if="device.description" class="caption pa-0 ma-0">
        {{ device.description }}
      </p>
    </v-card-title>
    <v-card-text>
      <p v-if="device.area_id" class="caption pa-0 pt-2 ma-0">
        <span class="caption font-weight-bold">Location: </span>
        <span>Basement</span>
        <span v-if="$store.state.techMode" class="caption font-weight-thin">
          &nbsp;(area: {{ device.area_id }})
        </span>
      </p>
      <p class="pa-0 ma-0">
        <span class="caption font-weight-bold">Load Type: </span>
        <span class="caption">{{ loadType(device.load_type_id).label }}</span>
        <span v-if="$store.state.techMode" class="caption font-weight-thin">
          &nbsp;(load_type_id: {{ device.load_type_id }})
        </span>
      </p>
      <p class="pa-0 ma-0">
        <span class="caption font-weight-bold">Load Category: </span>
        <span class="caption">{{
          loadCategory(loadType(device.load_type_id).load_category_id).label
        }}</span>
        <span v-if="$store.state.techMode" class="caption font-weight-thin">
          &nbsp;(load_category_id:
          {{ loadType(device.load_type_id).load_category_id }})
        </span>
      </p>
      <p class="pa-0 ma-0">
        <span class="caption font-weight-bold">Supply: </span>
        <span class="caption">{{ supplyType }}</span>
        <span v-if="$store.state.techMode" class="caption font-weight-thin">
          &nbsp;(3ph_load: {{ device['3ph_load'] }})
        </span>
      </p>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn small flat color="primary">
        Update
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    device: Object
  },
  computed: {
    supplyType() {
      return this.device['3ph_load'] == 1 ? 'Three Phase' : 'Single Phase'
    },
    ...mapGetters({
      loadTypeById: 'types/loadType',
      loadCategoryById: 'types/loadCategory'
    })
  },
  methods: {
    loadType(id) {
      return this.loadTypeById(id)
    },
    loadCategory(id) {
      return this.loadCategoryById(id)
    }
  }
}
</script>
