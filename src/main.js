import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementPlus from "element-plus";
import * as ElementIcons from "@element-plus/icons-vue";

import Layout from "@/components/Layout.vue";

import i18n from "@/i18n";
import { logEnv } from "@/utils";
import "@/socket";

import TableWithPagination from "@/components/TableWithPagination.vue";
import Autocomplete from "@/components/Autocomplete.vue";
import DepDropdown from "@/components/DepDropdown.vue";
import DynamicField from "@/components/DynamicField.vue";
import * as FaIcons from "oh-vue-icons/icons/fa";
import * as MdIcons from "oh-vue-icons/icons/md";
import * as CoIcons from "oh-vue-icons/icons/co";
import * as BiIcons from "oh-vue-icons/icons/bi";
import * as RiIcons from "oh-vue-icons/icons/ri";
// import * as IoIcons from "oh-vue-icons/icons/io";

import { OhVueIcon, addIcons } from "oh-vue-icons";

import { vuetify } from "@/plugins";

import VueCal from "vue-cal";

import "@/styles/styles.scss";
import "vue-cal/dist/vuecal.css";

const ohIcons = Object.values({
  ...FaIcons,
  ...MdIcons,
  ...CoIcons,
  ...BiIcons,
  ...RiIcons,
});
addIcons(...ohIcons);

const app = createApp(App);
app.use(i18n);
app.use(router);

app.use(ElementPlus);
app.use(vuetify);
app.use(store);

app.component("v-icon", OhVueIcon);
app.component("VueCal", VueCal);

Object.entries({ ...ElementIcons }).forEach(([name, component]) =>
  app.component(name, component)
);

app.component("TableWithPagination", TableWithPagination);
app.component("Autocomplete", Autocomplete);
app.component("DepDropdown", DepDropdown);
app.component("DynamicField", DynamicField);

app.component("Layout", Layout);
app.mount("#app");

// log 當前環境

logEnv();
