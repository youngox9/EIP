<template>
  <div class="loading" :class="isLoading ? 'active' : ''"></div>
  <v-app>
    <v-navigation-drawer expand-on-hover rail>
      <v-list>
        <v-list-item
          :prepend-avatar="pic"
          title="User"
          subtitle="user@gmailcom"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-folder"
          title="my profile"
          value="myfiles"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <div class="layout">
      <v-btn
        class="float-theme"
        :icon="
          theme.global.name === 'dark'
            ? 'mdi-lightbulb-night'
            : 'mdi-lightbulb-night-outline'
        "
        size="x-small"
        @click="toggle()"
      ></v-btn>

      <slot />
    </div>
  </v-app>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, computed, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

import { useState } from "@/utils";
import axios from "@/axios";
import { useTheme } from "vuetify";
import pic from "@/assets/profile.png";

import { useDark, useToggle, useResizeObserver } from "@vueuse/core";

const props = defineProps(["auth", "showSider"]);
const { t } = useI18n();
const store = useStore();
const router = useRouter();

const theme = useTheme("light");

const isDark = useDark();
const toggleDark = useToggle(isDark);
const isLoading = computed(() => store?.state?.global?.isLoading);

function toggle() {
  toggleDark();
  // theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>
