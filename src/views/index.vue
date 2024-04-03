<template>
  <Layout>
    <v-main class="home-page">
      <v-parallax class="kv" :src="kvSrc">
        <h1>{{ $t("eip_title") }}</h1>
      </v-parallax>
      <el-tabs v-model="tabIndex" type="border-card">
        <el-tab-pane label="快速入口" name="1">
          <el-row :gutter="12">
            <el-col :sm="24">
              <!-- 網站地圖 -->
              <el-card class="home-card">
                <template #header>
                  <div class="card-header">
                    <span>網站地圖</span>
                  </div>
                </template>
                <el-row :gutter="12">
                  <el-col :sm="8" v-for="link in links">
                    <el-button
                      tag="a"
                      type="primary"
                      class="site-link"
                      :href="link.value"
                      target="_blank"
                      size="large"
                      style="margin-bottom: 12px"
                    >
                      {{ $t(link.label) }}
                    </el-button>
                  </el-col>
                </el-row>
              </el-card>
              <!-- 資安宣導 -->
              <el-card class="home-card">
                <template #header>
                  <div class="card-header">
                    <span>公布欄</span>
                  </div>
                </template>
                <ol class="billboard-list">
                  <li>4月11日溫室氣體盤查外部見證稽核</li>
                  <li>包裝分箱：3月20日至5月30日，共計49天。</li>
                  <li>FORCAST系統：5月31日至6月28日，共計20天。</li>
                  <li>庫存查詢包含備料訂單修改</li>
                  <li>儀校系統開發：待安排</li>
                  <li>研發工單雜收作業：待安排</li>
                  <li>MA曝光模式系統識別：待安排</li>
                  <li>測包電性良率串連：待安排</li>
                  <li>測包點收排程儲位管理</li>
                </ol>
              </el-card>
              <!-- 資安宣導 -->
              <el-card class="home-card">
                <template #header>
                  <div class="card-header">
                    <span>資安宣導</span>
                  </div>
                </template>
                <ol class="billboard-list">
                  <li>
                    1.資訊分享的注意事項：小心分享個人和公司的敏感資訊，尤其是在社交媒體上。
                  </li>
                  <li>
                    2.小心電子郵件附件和連結：不要隨意點擊來路不明的電子郵件中的連結或附件，以防止惡意軟體的侵入。
                  </li>
                  <li>
                    3.備份重要資料：定期備份重要文件和資料，以防資料丟失或遭受勒索軟體攻擊。
                  </li>
                  <li>
                    4.網路安全教育：定期進行網路安全教育和訓練，提高員工對於釣魚攻擊、惡意軟體等威脅的識別能力。
                  </li>
                  <li>
                    5.注意公共Wi-Fi的安全：在使用公共Wi-Fi時，避免進行敏感交易，如網上銀行或輸入信用卡資料等。
                  </li>
                </ol>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="分機列表" name="2">
          <iframe
            :src="`${pdfURL}#zoom=FitH&toolbar=1`"
            style="width: 100%; height: 800px"
          />
        </el-tab-pane>
        <el-tab-pane label="會議室" name="3">
          <Calendar />
        </el-tab-pane>
      </el-tabs>
    </v-main>
  </Layout>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

import { useI18n } from "vue-i18n";
import { useLocalStorage } from "@vueuse/core";
import axios from "@/axios";
import Calendar from "@/components/Calendar";

import kvSrc from "@/assets/kv1.jpg";

const pdfURL = ref("http://192.168.0.157:3081/ext/extension_list");

const BTN_LIST = [
  { label: "SFC", value: "http://192.168.0.194:8088/" },
  { label: "ETS", value: "http://192.168.0.157:8082/" },
  { label: "ORD", value: "http://192.168.0.157:8083/" },
  { label: "ADMIN", value: "http://192.168.0.157:8084/" },
  { label: "WORKFLOW", value: "http://192.168.0.157:8085/" },
  { label: "T100", value: "https://192.168.0.25/T100_go.html" },
  { label: "鼎新BPM", value: "http://bpm.everohms.com:8086/NaNaWeb" },
  { label: "WEBMAIL", value: "http://192.168.0.3/webmail" },
  { label: "舊內網", value: "http://192.168.0.221:8088/" },
];

const props = defineProps([]);
const { t } = useI18n();
const store = useStore();
const links = ref(BTN_LIST);

import { useTheme } from "vuetify";
import router from "@/router";

const tabIndex = useLocalStorage("tabIndex", "1");

onMounted(() => {});
</script>
