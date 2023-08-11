<template>
  <Layout :auth="false" :showSider="false">
    <v-parallax class="home-banner" :src="pic1">
      <div class="home-banner-wrapper">
        <div class="home-banner-inner">
          <img class="logo" src="@/assets/logo_w.png" />
          <h4 class="sub">歡迎進入企業入口網站</h4>
        </div>
      </div>
    </v-parallax>
    <v-row>
      <v-col v-for="item in list" cols="12" sm="4">
        <!-- <NuxtLink :to="item.url">
      
        </NuxtLink> -->
        <v-btn class="eip-btn" block variant="outlined">{{ item.label }}</v-btn>
      </v-col>
    </v-row>
  </Layout>
</template>
<script setup>
import { useStore } from "vuex";
import { ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

import pic1 from "@/assets/kv.jpg";
import axios from "@/axios";
import { AREA_OPTIONS, VALIDATIONS, useState } from "@/utils";

const BTN_LIST = [
  { label: "SFC", url: "http://192.168.0.194:8088/" },
  { label: "ETS", url: "http://192.168.0.157:8082/" },
  { label: "ORD", url: "http://192.168.0.157:8083/" },
  { label: "ADMIN", url: "http://192.168.0.157:8084/" },
  { label: "BPM", url: "http://192.168.0.157:8085/" },
  { label: "T100", url: "http://192.168.0.25/" },
  { label: "鼎新BPM", url: "http://bpm.everohms.com:8086/NaNaWeb/" },
  { label: "WEBMAIL", url: "http://192.168.0.3/webmail" },
];

const props = defineProps([]);
const emit = defineEmits([]);
//
const { t } = useI18n();
const store = useStore();
const router = useRouter();

const [list, setList] = useState(BTN_LIST);
</script>
