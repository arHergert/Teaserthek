export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'de'
    },
    title: 'Teaserthek',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Erlebe den ersten Eindruck eines unbekannten Films wie im Kino. Schaue Trailer für neue oder bereits erschienene Filme!'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico?' }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~plugins/vuetify.js', '~plugins/youtube.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseUrl: 'https://ibisapi.herokuapp.com/api/movies/'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  server: {
    port: process.env.PORT || 8000
  },
  target: 'static',
  router: {
    base: '/Teaserthek/'
  },

  publicRuntimeConfig: {
    TMDB_SEARCH_URL: 'https://api.themoviedb.org/3/',
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    LETTERBOXD_URL: 'https://letterboxd.com/film/',
    IMDB_URL: 'https://www.imdb.com/title/'
  }
}
