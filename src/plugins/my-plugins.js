import ElementPlus from "element-plus";
import * as ElementIcons from "@element-plus/icons-vue";
import i18n from "@/i18n";

import * as FaIcons from "oh-vue-icons/icons/fa";
import * as MdIcons from "oh-vue-icons/icons/md";
import * as CoIcons from "oh-vue-icons/icons/co";
import * as BiIcons from "oh-vue-icons/icons/bi";
import * as RiIcons from "oh-vue-icons/icons/ri";

import { createVuetify } from "vuetify";

import { OhVueIcon, addIcons } from "oh-vue-icons";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// plugins/my-plugin.js
export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp;
  //   const app = createApp({});
  app.use(i18n);
  //   app.use(ElementPlus);
  Object.entries({ ...ElementIcons }).forEach(([name, component]) =>
    app.component(name, component)
  );

  const ohIcons = Object.values({
    ...FaIcons,
    ...MdIcons,
    ...CoIcons,
    ...BiIcons,
    ...RiIcons,
  });
  addIcons(...ohIcons);

  // const vuetify = createVuetify({
  //   ssr: true,
  //   components,
  //   directives,
  // });
  // //
  // app.use(vuetify);

  return {};
});
