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
        href: "/fonts.css"
      }
    ],
    script: []
  },
  plugins: ["~/plugins/vuetify.js", "~/plugins/vue-signature.js"],
  css: ["~/assets/style/app.styl"],
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  modules: ["@nuxtjs/axios", "@nuxtjs/auth"],
  axios: {
    // proxyHeaders: false
    baseURL: "http://restapi:3010/api",
    browserBaseURL: "http://localhost:3010/api"
  },
  auth: {
    redirect: {
      login: "/user/login",
      home: "/"
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: "users/login", propertyName: "id" },
          logout: { url: "users/logout", method: "post" },
          user: { url: "users/me", method: "get", propertyName: "user" }
        },
        tokenRequired: true,
        tokenType: ""
      }
    }
  },
  router: {
    middleware: ["auth"]
  },
  /*
   ** Build configuration
   */
  build: {
    vendor: ["~/plugins/vuetify.js"],
    extractCSS: true,
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: "empty"
      }
      // ....
    }
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
