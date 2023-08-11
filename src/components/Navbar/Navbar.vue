<template>
  <div :class="`navbar ${isMenuOpen ? 'active' : ''}`">
    <div class="nav-head">
      <router-link class="logo" :to="'/ETST001'">
        <img class="pc" src="@/assets/logo_w.png" />
        <img class="m" src="@/assets/logo1_w.png" />
      </router-link>
      <div class="nav-right">
        <NavbarThemeButton />
        <NavbarGlobalButton />
        <NavbarProfileButton v-if="isLogin" />
        <NavbarMenuToggleButton />
      </div>
      <div id="portal-target" class="nav-head-title" />
    </div>
    <div class="nav-wrap">
      <div v-if="isLogin && showSider" class="nav nav-left" ref="navLeft">
        <div class="menu" v-if="navbarList.length" :style="{ width: '100%' }">
          <MenuItem v-for="item in navbarList" :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";

import { useStore } from "vuex";
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

import { AREA_OPTIONS, useState } from "@/utils";
import axios from "@/axios";

const props = defineProps(["auth"]);
const { t } = useI18n();
const store = useStore();
const router = useRouter();

const navbarList = computed(() => {
  return store?.state?.global?.navbarList || [];
});

const showSider = computed(() => {
  const pathname = router?.currentRoute?.value?.name;
  return pathname !== "login";
});

const showMenu = computed(() => {
  const pathname = router?.currentRoute?.value?.name !== "login";
  const accessToken = store?.state?.global?.profile?.accessToken;
  return pathname && accessToken;
});

const isMenuOpen = computed(() => {
  return store?.state?.global?.isMenuOpen || false;
});

const isLogin = computed(() => {
  return !!store?.state?.global?.profile?.accessToken || false;
});

function toggleMenu() {
  const isMenuOpen = store?.state?.global?.isMenuOpen || false;
  store.commit("global/setIsMenuOpen", !isMenuOpen);
}
</script>
