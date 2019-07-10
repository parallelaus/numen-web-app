<template>
  <v-container fluid grid-list-sm pa-0>
    <v-layout row wrap>
      <v-flex xs12>
        <v-container fluid pa-0 pb-2>
          <v-layout row wrap>
            <v-flex xs4 sm3 d-flex>
              <v-card class="green lighten-3">
                <v-card-text>
                  <span class="headline font-weight-medium">
                    {{ collector.name }}
                  </span>
                  <br />
                  <span class="subheading">
                    {{ collector.serial_number }}
                  </span>
                </v-card-text>
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
                            <v-card-text
                              class="text-xs-center subheading font-weight-medium"
                            >
                              {{ port }}
                            </v-card-text>
                          </v-card>
                        </v-flex>
                        <v-flex
                          v-if="!getPortCircuit(port)"
                          xs10
                          sm11
                          d-flex
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
                          <v-card color="grey lighten-4" flat>
                            <v-card-title>
                              &nbsp;
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
                                  <v-card-text primary-title class="pa-0">
                                    <span
                                      class="subheading font-weight-medium ma-0 pa-0"
                                    >
                                      {{ getPortCircuit(port).name }} - {{
                                        phaseColour(
                                          getPortCircuit(port).phase_id
                                        ).label
                                      }}
                                    </span>
                                    <!-- <span class="caption font-weight-thin pl-4">
                                      {{ getPortCircuit(port).location }}
                                    </span> -->
                                    <br />
                                    <span v-if="!getPortCircuit(port).ct_number" class="pl-2">
                                      <span class="caption font-weight-medium">
                                        CT:
                                      </span>
                                      <span class="caption font-weight-thin">
                                        {{ getPortCircuit(port).ct_type_id }}A
                                      </span>
                                    </span>
                                    <span v-if="getPortCircuit(port).ct_number" class="pl-2">
                                      <span class="caption font-weight-medium">
                                        CT:
                                      </span>
                                      <span class="caption font-weight-thin">
                                        {{ getPortCircuit(port).ct_number }} ({{ getPortCircuit(port).ct_type_id }}A)
                                      </span>
                                    </span>
                                    <span v-if="getPortCircuit(port).breaker_size" class="pl-2">
                                      <span class="caption font-weight-medium">
                                        Breaker Size:
                                      </span>
                                      <span class="caption font-weight-thin">
                                        {{ getPortCircuit(port).breaker_size }}A
                                      </span>
                                    </span>
                                    <span v-if="getPortCircuit(port).cable_size" class="pl-2">
                                      <span class="caption font-weight-medium">
                                        Cable:
                                      </span>
                                      <span class="caption font-weight-thin">
                                        {{ getPortCircuit(port).cable_size }}
                                      </span>
                                    </span>
                                  </v-card-text>
                                </v-flex>
                                <v-flex xs1 class="text-xs-right">
                                  <v-btn
                                    ma-0
                                    small
                                    icon
                                    @click="
                                      disconnectCircuit(getPortCircuit(port).id)
                                    "
                                  >
                                    <v-icon color="grey darken-2">
                                      delete_outline
                                    </v-icon>
                                  </v-btn>
                                  </span></span>
                                  </v-card-text>
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
      circuitsByCollector: 'site/circuitsByCollector',
      phaseColour: 'site/phaseColour'
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
  height: 56px;
  border-style: dashed;
  border-width: 3px;
  border-color: darkgray;
}
</style>
