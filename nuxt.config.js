import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'

export default {
  mode: 'universal',

  router: {
    middleware: 'auto-login'
  },

  head: {
    title: 'Numen',
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

  modules: [
    '@nuxtjs/axios',
    ['@nuxtjs/dotenv', { systemvars: true }],
    'cookie-universal-nuxt'
  ],

  plugins: [
    '@/plugins/axios',
    '@/plugins/vuetify',
    '@/plugins/api',
    '@plugins/vue-chart'
  ],

  axios: {},

  env: {
    OAUTH_CLIENT_ID: 'numen_web_app',
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
