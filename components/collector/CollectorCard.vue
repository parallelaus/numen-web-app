<template>
  <v-container fluid grid-list-xs pa-0>
    <v-layout row wrap>
      <v-flex xs12>
        <v-container fluid pa-0 pb-2>
          <v-layout row wrap>
            <v-flex xs4 sm3 d-flex>
              <v-card class="green lighten-3">
                <v-card-title>
                  <p>
                    {{ collector.name }}
                  </p>
                  <p>
                    {{ collector.serial_number }}
                  </p>
                </v-card-title>
              </v-card>
            </v-flex>
            <v-flex xs8 sm9>
              <v-container pa-0>
                <v-layout row wrap>
                  <v-flex v-for="port in 9" :key="port" xs12>
                    <v-container pa-0>
                      <v-layout row wrap>
                        <v-flex xs2 sm1 d-flex>
                          <v-card class="blue lighten-3">
                            <v-card-title>
                              {{ port }}
                            </v-card-title>
                          </v-card>
                        </v-flex>
                        <v-flex
                          v-if="!getPortCircuit(port)"
                          xs10
                          sm11
                          @drop="
                            connectCircuit(
                              $event,
                              collector.serial_number,
                              port
                            )
                            circuitDragOut($event)
                          "
                          @dragover.prevent="circuitDragOver($event)"
                          @dragenter.prevent
                          @dragleave.prevent="circuitDragOut($event)"
                        >
                          <v-card flat class="grey lighten-2">
                            <v-card-title class="grey--text">
                              Drag Circuit here to attach to Collector Port
                            </v-card-title>
                          </v-card>
                        </v-flex>
                        <v-flex v-if="getPortCircuit(port)" xs10 sm11 d-flex>
                          <v-card
                            v-if="getPortCircuit(port)"
                            class="blue lighten-4"
                          >
                            <v-container fluid pa-1>
                              <v-layout row-wrap>
                                <v-flex xs11>
                                  <v-card-title class="pa-0">
                                    {{ getPortCircuit(port).name }}
                                  </v-card-title>
                                </v-flex>
                                <v-flex xs1>
                                  <v-btn
                                    ma-0
                                    small
                                    icon
                                    @click="
                                      disconnectCircuit(getPortCircuit(port).id)
                                    "
                                  >
                                    <v-icon>link_off</v-icon>
                                  </v-btn>
                                </v-flex>
                              </v-layout>
                            </v-container>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    collector: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      circuitsByCollector: 'site/circuitsByCollector'
    })
  },
  methods: {
    hoverOverCircuit(collector, port) {
      return this.dragOverCircuit.collector == collector &&
        this.dragOverCircuit.port == port
        ? 'drag-over-circuit'
        : ''
    },

    getPortCircuit(port) {
      return this.circuitsByCollector(this.collector.serial_number).get(port)
    },
    async disconnectCircuit(circuit_id) {
      await this.$store.dispatch(
        'site/disconnectCircuitFromCollectorPort',
        circuit_id
      )
    },
    async connectCircuit(e, collector, port) {
      const circuit_id = e.dataTransfer.getData('circuit_id')
      console.log(' Dropping circuit ' + circuit_id)
      await this.$store.dispatch('site/connectCircuitToCollectorPort', {
        collector,
        port,
        circuit: circuit_id
      })
    },
    circuitDragOver(e) {
      e.toElement.classList.add('drag-over-circuit')
    },
    circuitDragOut(e) {
      e.toElement.classList.remove('drag-over-circuit')
    }
  }
}
</script>

<style scoped>
.drag-over-circuit {
  height: 52px;
  border-style: dashed;
  border-width: 3px;
  border-color: darkgray;
}
</style>
