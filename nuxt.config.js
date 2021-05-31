// eslint-disable-next-line nuxt/no-cjs-in-config
const pkg = require('./package')
// eslint-disable-next-line nuxt/no-cjs-in-config
module.exports = {
  head: {
    title: 'Базапродуктов',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500|Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp',
      },
    ],
  },
  env: {
    mock: process.env.VUE_APP_MOCK_SERVER,
    dev: process.env.APP_ENV === 'devel',
  },
  router: {},
  // serverMiddleware: ['~/middleware/serverRedirect'],
  plugins: [
    '~/plugins/axios-accessor.ts',
    '~/plugins/nuxt-accessor.ts',
    '~/plugins/v-mask.ts',
    { src: '~plugins/vue-carousel.ts', ssr: false },
    // '~plugins/interceptors',
  ],
  modules: ['@nuxtjs/axios', '@nuxtjs/device', 'portal-vue/nuxt'],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  css: ['~/assets/scss/globals.scss'],
  styleResources: {
    scss: ['~/assets/scss/variables.scss'],
  },
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    '@nuxtjs/style-resources',
  ],
  build: {
    extractCSS: false,
    indicator: false,
  },
  server: {
    port: 8111,
    host: '0.0.0.0',
    timing: false,
  },
}
