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
                <v-card-actions>
                  <v-spacer />
                  <v-btn small flat color="primary">
                    Update
                  </v-btn>
                </v-card-actions>
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
                            dropCircuit($event, collector, port)
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
                            hover
                            draggable
                            @dragstart="
                              pickUpEntity($event, getPortCircuit(port), 'move')
                            "
                          >
                            <v-card-text primary-title class="pa-0">
                              <v-container fluid pa-1>
                                <v-layout row-wrap>
                                  <v-flex xs1 align-self-center>
                                    <span>
                                      <v-icon>drag_indicator</v-icon>
                                    </span>
                                  </v-flex>
                                  <v-flex xs10>
                                    <span>
                                      <span
                                        class="subheading font-weight-medium ma-0 pa-0"
                                      >
                                        {{ getPortCircuit(port).name }} -
                                        {{
                                          phaseColour(
                                            getPortCircuit(port).phase_id
                                          ).label
                                        }}
                                      </span>
                                      <span
                                        v-if="$store.state.techMode"
                                        class="caption font-weight-thin"
                                      >
                                        &nbsp;(Circuit ID:
                                        {{ getPortCircuit(port).id }})
                                      </span>

                                      <!-- <span class="caption font-weight-thin pl-4">
                                        {{ getPortCircuit(port).location }}
                                      </span> -->
                                      <br />
                                      <span
                                        v-if="!getPortCircuit(port).ct_number"
                                        class="pl-2"
                                      >
                                        <span
                                          class="caption font-weight-medium"
                                        >
                                          CT:
                                        </span>
                                        <span class="caption font-weight-thin">
                                          {{ getPortCircuit(port).ct_type_id }}A
                                        </span>
                                      </span>
                                      <span
                                        v-if="getPortCircuit(port).ct_number"
                                        class="pl-2"
                                      >
                                        <span
                                          class="caption font-weight-medium"
                                        >
                                          CT:
                                        </span>
                                        <span class="caption font-weight-thin">
                                          {{ getPortCircuit(port).ct_number }}
                                          ({{
                                            getPortCircuit(port).ct_type_id
                                          }}A)
                                        </span>
                                      </span>
                                      <span
                                        v-if="getPortCircuit(port).breaker_size"
                                        class="pl-2"
                                      >
                                        <span
                                          class="caption font-weight-medium"
                                        >
                                          Breaker Size:
                                        </span>
                                        <span class="caption font-weight-thin">
                                          {{
                                            getPortCircuit(port).breaker_size
                                          }}A
                                        </span>
                                      </span>
                                      <span
                                        v-if="getPortCircuit(port).cable_size"
                                        class="pl-2"
                                      >
                                        <span
                                          class="caption font-weight-medium"
                                        >
                                          Cable:
                                        </span>
                                        <span class="caption font-weight-thin">
                                          {{ getPortCircuit(port).cable_size }}
                                        </span>
                                      </span>
                                    </span>
                                  </v-flex>
                                  <v-flex xs1 class="text-xs-right">
                                    <v-btn
                                      ma-0
                                      small
                                      icon
                                      @click="
                                        disconnectCircuit(
                                          getPortCircuit(port).id
                                        )
                                      "
                                    >
                                      <v-icon color="grey darken-2">
                                        delete_outline
                                      </v-icon>
                                    </v-btn>
                                  </v-flex>
                                </v-layout>
                              </v-container>
                            </v-card-text>
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
        <v-dialog v-model="confirmDropDialog" max-width="350">
          <v-card>
            <v-card-title class="headline">
              {{ confirmHeaderText }}
            </v-card-title>
            <v-card-text v-if="confirmMessageText">
              {{ confirmMessageText }}
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="error"
                flat
                small
                :loading="confirmLoading"
                @click="confirmDrop"
              >
                {{ confirmButtonText }}
              </v-btn>
              <v-spacer />
              <v-btn
                color="primary"
                flat
                small
                @click="confirmDropDialog = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
  data: () => ({
    confirmDropDialog: false,
    confirmHeaderText: 'Are you sure?',
    confirmMessageText: 'You are about to move circuit 1 to collector 4 port 7',
    confirmButtonText: 'Move Circuit',
    confirmLoading: false,
    dropCircuitData: {}
  }),
  computed: {
    ...mapGetters({
      circuitsByCollector: 'site/circuitsByCollector',
      phaseColour: 'site/phaseColour'
    })
  },
  methods: {
    pickUpEntity(e, entity, action) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('entity', JSON.stringify(entity))
      e.dataTransfer.setData('action', action)
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
    async confirmDrop() {
      this.confirmLoading = true
      switch (this.dropCircuitData.action) {
        case 'move':
          await this.$store.dispatch('site/moveCircuitToCollectorPort', {
            collector: this.dropCircuitData.collector.serial_number,
            port: this.dropCircuitData.port,
            circuit: this.dropCircuitData.circuit.id
          })
          break
        case 'connect':
          await this.$store.dispatch('site/connectCircuitToCollectorPort', {
            collector: this.dropCircuitData.collector.serial_number,
            port: this.dropCircuitData.port,
            circuit: this.dropCircuitData.circuit.id
          })
          break
      }
      this.confirmLoading = false
      this.confirmDropDialog = false
    },
    dropCircuit(e, collector, port) {
      const circuit = JSON.parse(e.dataTransfer.getData('entity'))
      const action = e.dataTransfer.getData('action')

      this.dropCircuitData = {
        action,
        circuit,
        collector,
        port
      }

      switch (this.dropCircuitData.action) {
        case 'move':
          this.confirmMessageText =
            'Move ' +
            circuit.name +
            ' - ' +
            this.phaseColour(circuit.phase_id).label +
            ' to Collector ' +
            collector.name +
            ' Port ' +
            port
          this.confirmDropDialog = true
          break
        case 'connect':
          this.confirmMessageText =
            'Connect ' +
            circuit.name +
            ' - ' +
            this.phaseColour(circuit.phase_id).label +
            ' to Collector ' +
            collector.name +
            ' Port ' +
            port
          this.confirmDrop() // user not asked to confirm connecting a circuit, conrifm called directly
          break
      }
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
