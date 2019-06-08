<template>
  <v-flex xs12>
    <nuxt-link :to="'/site/' + site.id" tag="div">
      <v-hover>
        <v-card>
          <v-card-title>
            <p class="caption pa-0 ma-0">
              <span class="title font-weight-bold">{{ site.name }}</span>
              <span
                v-if="$store.state.techMode"
                class="caption font-weight-thin"
              >
                &nbsp;(ID: {{ site.id }})
              </span>
            </p>
          </v-card-title>
        </v-card>
      </v-hover>
    </nuxt-link>
  </v-flex>
</template>

<script>
export default {
  name: 'SiteCard',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    site: Object
  }
}
</script>
