import Vue from 'vue'
import { Line, Bar, Pie } from 'vue-chartjs'

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

Vue.component('PieChart', {
  extends: Pie,
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options)
  }
})
