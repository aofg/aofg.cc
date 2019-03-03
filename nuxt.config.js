const axios = require("axios");

const parseArgs = require("minimist");

const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: "hostname",
    p: "port"
  },
  string: ["H"],
  unknown: parameter => false
});

const port =
  argv.port ||
  process.env.PORT ||
  process.env.npm_package_config_nuxt_port ||
  "3000";
const host =
  argv.hostname ||
  process.env.HOST ||
  process.env.npm_package_config_nuxt_host ||
  "localhost";

module.exports = {
  router: {
    middleware: "i18n"
  },
  plugins: [
    { src: "~/plugins/charts.plugin.ts", ssr: false },
    { src: "~/plugins/bem.plugin.ts" },
    { src: "~/plugins/i18n.plugin.ts" },
    { src: "~/plugins/async-computed.plugin.ts" }
  ],
  head: {
    title: "MAINCOIN EXPLORER",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "Nuxt.js project"
      },
      {
        name: "msapplication-TileColor",
        content: "#ffffff"
      },
      {
        name: "theme-color",
        content: "#ffffff"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      },
      {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      },
      {
        rel: "mask-icon",
        href: "/safari-pinned-tab.svg",
        color: "#bf944a"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  css: ["~/assets/scss/main.scss"],
  build: {
    babel: {
      plugins: ["dynamic-import-node"]
    }
  },
  modules: [
    "@nuxtjs/axios",
    "nuxt-buefy",
    "@nuxtjs/dotenv",
    "~/modules/typescript.js",
    [
      "nuxt-env",
      {
        keys: [
          // env: {
          //   baseUrl: process.env.BASE_URL || `http://${host}:${port}`,
          //   BACKEND_URL: process.env.BACKEND_URL || "https://api.maincoin.money"
          // },
          // 'TEST_ENV_VAR', // Basic usage—equivalent of { key: 'TEST_ENV_VAR' }
          // { key: 'OTHER_ENV_VAR', default: 'defaultValue' } // Specify a default value
          // { key: 'THIRD_ENV_VAR', secret: true } // Only inject the var server side
          // { key: 'ANOTHER_ENV_VAR', name: 'MY_ENV_VAR' } // Rename the variable
          { key: "BASE_URL", default: `http://${host}:${port}` },
          { key: "BACKEND_URL", default: `https://api.maincoin.money` }
        ]
      }
    ]
  ],
  axios: {}
};
