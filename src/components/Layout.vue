<template>
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
    <v-theme-provider>
      <v-layout>
        <!-- <v-btn class="float-theme">
          <el-icon @click="toggleTheme"><Moon /></el-icon>
        </v-btn> -->

        <v-btn
          class="float-theme"
          :icon="
            theme.global.name === 'dark'
              ? 'mdi-lightbulb-night'
              : 'mdi-lightbulb-night-outline'
          "
          size="x-small"
          @click="toggleTheme"
        ></v-btn>

        <slot />
      </v-layout>
    </v-theme-provider>
  </v-app>
  <div class="container">
    <div class="content"></div>
  </div>
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

const props = defineProps(["auth", "showSider"]);
const { t } = useI18n();
const store = useStore();
const router = useRouter();

const theme = useTheme("dark");

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>
