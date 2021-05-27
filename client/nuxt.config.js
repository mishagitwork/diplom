export default {
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'PWA',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  router: {
    middleware: 'isNotAuth',
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['ant-design-vue/dist/antd.css'],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui',
    { src: '@/plugins/vue-qrcode-reader', mode: 'client' },
    { src: '@/plugins/vue-qrcode', mode: 'client' },
    // { src: '~plugins/vue-chartjs.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/moment'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
  ],
  styleResources: {
    scss: ['~/assets/styles/common.scss, ~/assets/styles/breakpoints.scss'],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },

  proxy: {
    '/api/': process.env['API_URL'] || 'http://localhost:4000/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    // workbox: {
    //   enable: false,
    // },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
