<template>
  <v-card height="540px">
    <v-card-title class="subheading font-weight-bold">
      Site Consumption
    </v-card-title>
    <v-card-text v-if="!loading">
      <bar-chart :data="data" :options="options" />
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
import { formatNumber, formatTooltip } from '../utils'

export default {
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              id: 'consumption',
              type: 'linear',
              position: 'left',
              scaleLabel: {
                display: true,
                labelString: 'Power Consumption (kWh)'
              },
              ticks: {
                callback: value => formatNumber(value)
              }
            },
            {
              id: 'max_demand',
              type: 'linear',
              position: 'right',
              scaleLabel: {
                display: true,
                labelString: 'Maximum Power Demand (kVA)'
              }
            }
          ]
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) =>
              formatTooltip(tooltipItem, data, 'kWh')
          }
        },
        onClick: function(event, item) {
          console.log(event)
          console.log(item)
        }
      }
    }
  }
}
</script>
