<template>
  <v-card>
    <v-card-title>
      Random Line Chart
    </v-card-title>

    <v-card-text>
      <line-chart :data="data" :options="options" />
    </v-card-text>
    <v-card-actions>
      <button @click="fillData()">
        Randomize
      </button>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => {
    return {
      options: {}
    }
  },
  computed: {
    data() {
      const data = {
        labels: [
          '00:00',
          '01:00',
          '02:00',
          '03:00',
          '04:00',
          '05:00',
          '06:00',
          '07:00'
        ],
        datasets: [
          {
            label: 'Current A',
            backgroundColor: 'rgba(0, 255, 0, 0.3)',
            lineTention: 0,
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          },
          {
            label: 'Power kW',
            backgroundColor: 'rgba(0, 0, 255, 0.3)',
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          }
        ]
      }
      return data
    }
  },
  methods: {
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
