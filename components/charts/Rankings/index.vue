<template>
  <v-card height="540px">
    <v-card-title class="subheading font-weight-bold">
      {{ title }}
    </v-card-title>
    <v-card-text v-if="!loading">
      <v-layout row>
        <v-flex xs4>
          <pie-chart :data="doughnutData" :options="options" />
        </v-flex>
        <v-flex pl-4>
          <v-data-table
            :headers="tableHeaders"
            :items="tableData"
            class="elevation-1"
            hide-actions
          >
            <template v-slot:items="props">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-right">
                {{ props.item.consumption_kwh }}
              </td>
              <td class="text-xs-right">
                {{ props.item.consumption_percent }}
              </td>
              <td class="text-xs-right">
                {{ props.item.carbs }}
              </td>
              <td class="text-xs-right">
                {{ props.item.protein }}
              </td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-sheet v-if="loading" class="d-flex" color="grey lighten-2" height="100%">
      <v-layout align-center justify-center fill-height>
        <v-flex xs1>
          <v-progress-circular
            :size="40"
            :width="3"
            color="primary"
            indeterminate
          />
        </v-flex>
      </v-layout>
    </v-sheet>
  </v-card>
</template>

<script>
import { doughnutData, tableData } from './utils'
import { formatPieTooltip } from '../utils'

export default {
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: true
    },
    data: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 60,
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              return formatPieTooltip(tooltipItem, data, 'kWh')
            }
          }
        }
      },

      tableHeaders: [
        {
          text: 'Site',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Consumption (kWh)', value: 'consumption_kwh', align: 'right' },
        { text: '%', value: 'consumption_percent', align: 'right' }
        // { text: 'Cost ($)', value: 'cost', align: 'right' },
        // { text: '%', value: 'cost_percentage', align: 'right' }
      ]
    }
  },
  computed: {
    doughnutData() {
      return doughnutData(this.data, 'consumption_kwh')
    },
    tableData() {
      return tableData(this.data)
    }
  }
}
</script>
