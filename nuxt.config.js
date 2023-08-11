import { resolve } from "path";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  target: "static",
  srcDir: "src/",
  alias: {
    "@": resolve(__dirname, "src"),
  },
  app: {
    // head
    head: {
      title: "天二科技企業入口網站",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "天二科技企業入口網站",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  // css
  // css: ["~/styles/styles.scss"],
  plugins: ["~/plugins/my-plugins.js"],

  modules: ["@invictus.codes/nuxt-vuetify"],
  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      // @TODO: list all vuetify options
    },

    moduleOptions: {},
  },
});
