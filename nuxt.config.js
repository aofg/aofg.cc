const parseArgs = require("minimist");
const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: "hostname",
    p: "port"
  },
  string: ["H"],
  unknown: parameter => false
});

process.env.WS_HOST = process.env.WS_HOST || "localhost";
process.env.WS_PORT = process.env.WS_PORT || "4000";
process.env.BACK_HOST = process.env.BACK_HOST || "localhost";
process.env.BACK_PORT = process.env.BACK_PORT || "4000";

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

const routerBase =
  process.env.DEPLOY_ENV === "GH_PAGES"
    ? {
        router: {
          base: "/deploeos/"
        }
      }
    : {};
module.exports = {
  // env: {
  //   baseUrl: process.env.BASE_URL || `http://${host}:${port}`
  // },
  plugins: [
    { src: "~/plugins/bem.plugin.ts" },
    { src: "~/plugins/async-computed.plugin.ts" },
    { src: "~/plugins/smooth-reflow.plugin.ts", ssr: false }
  ],
  head: {
    title: "DEPLOES for EOS Community. Made by Aler Denisov in Ducatur",
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
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
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
    extend: function(config) {
      const babelLoader = config.module.rules.find(
        rule => rule.loader === "babel-loader"
      );
      babelLoader.exclude = /node_modules\/(?![get-urls])/;
    },
    vendors: ["date-fns", "eosjs", "nes", "deep-equal"]
  },
  modules: ["@nuxtjs/axios", "~/modules/typescript.js", "@nuxtjs/dotenv"],
  axios: {},

  ...routerBase
};
