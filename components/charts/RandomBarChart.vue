<template>
  <v-card>
    <v-card-title>
      Random Bar Chart
    </v-card-title>
    <v-card-text>
      <bar-chart :data="data" :options="options" />
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
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
          {
            label: 'Consumption kWh',
            backgroundColor: 'lightblue',
            borderColor: 'blue',
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
            label: 'Cost $',
            backgroundColor: 'lightgreen',
            borderColor: 'green',
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
