module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "CoCADa",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Nuxt.js + Vuetify.js project"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ]
  },
  plugins: ["~/plugins/vuetify.js"],
  css: ["~/assets/style/app.styl"],
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** axios
  */
  modules: [
    "@nuxtjs/axios"
    /* '@nuxtjs/auth' */
  ],
  axios: {
    // proxyHeaders: false
    baseURL: "http://192.168.1.101:3010/api"
  },
  /*auth: {
    redirect: {
      login: '/login',
      home: '/',
    },
    endpoints: {
      login: { url: 'Users/login', method: 'post' },
      logout: { url: 'Users/logout', method: 'post' },
      user: false
    },
    strategies: {
      local: {
      }
    } 
  },*/
  router: {
    /* middleware: ['auth'] */
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: ["~/plugins/vuetify.js"],
    extractCSS: true
    /*
    ** Run ESLint on save
    */
    /*extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }*/
  }
}
