import Vue from 'vue'
import { Line, Bar } from 'vue-chartjs'

Vue.component('LineChart', {
  extends: Line,
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options)
  }
})

Vue.component('BarChart', {
  extends: Bar,
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options)
  }
})
