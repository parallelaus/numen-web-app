import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'

export default {
  mode: 'universal',

  head: {
    title: 'Numen Installer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/64_favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  loading: {
    color: '#BDBDBD',
    height: '3px',
    duration: 6000
  },

  css: ['~/assets/style/app.styl'],

  plugins: ['@/plugins/vuetify', '@/plugins/api'],

  modules: ['@nuxtjs/axios', '@nuxtjs/dotenv'],

  axios: {},

  env: {
    OAUTH_CLIENT_ID: '23498274567239',
    OAUTH_CLIENT_SECRET: '461fd78e-8eb8-4eb2-a6aa-ae3ee69ea01c'
  },

  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    }
  }
}
