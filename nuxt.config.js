export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  server: {
    hort: "0.0.0.0",
    port: 3200, 
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'orders-products',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel:"stylesheet",
        href:"https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@assets/css/app.css',
    '@assets/css/animations.css',
    '@assets/css/registration.css',

  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],
  
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/i18n'
  ],
  i18n: {
    langDir: "~/locales/",
    defaultLocale: "en",
    strategy: 'no_prefix',
    locales: [
      { code: "en", file: "en.json", iso: "en" },
      { code: "ua", file: "ua.json", iso: "ukr" },
      { code: "ru", file: "ru.json", iso: "rus" },
    ],
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  layout: 'default',
  pageTransition: {
    name: 'fade',
    mode: 'out-in'
  },
}
