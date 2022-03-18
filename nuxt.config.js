export default {
  ssr: true,

  server: {
    port: 5000, // default: 3000
    host: "127.0.0.1" // default: localhost
  },

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/nuxt-ssr/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    'swiper/swiper-bundle.css',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/cloudbase" },
    { src: "~/plugins/swipe", ssr: true },
    { src: '~/plugins/ant-design-vue.js' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    prefix: '/',
    proxy: true
  },
  proxy: {
    '/express-starter/': {
      target: 'https://cloudbase-test-0gol5huy820a6898-1305842996.ap-shanghai.app.tcloudbase.com/express-starter', //API服务器的地址
      pathRewrite: {
        '^/express-starter': ''
      }
    },
    '/pay/': {
      target: 'https://api.mch.weixin.qq.com/pay',
      pathRewrite: {
        '^/pay': ''
      }
    }
  },
  router: {
    base: "/nuxt-ssr"
  },
  /*
   ** Build configuration
   */
  build: {
    publicPath: "/nuxt-ssr/_nuxt/",
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
