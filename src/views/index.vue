<template>
  <Layout>
    <v-main style="padding: 16px 16px 16px 100px">
      <el-row :gutter="12">
        <el-col :sm="24">
          <v-parallax class="kv" :src="kvSrc">
            <h1>{{ $t("eip_title") }}</h1>
          </v-parallax>
        </el-col>
        <el-col :sm="8" :style="{ marginBottom: '12px' }">
          <v-card
            width="100%"
            :style="{ marginBottom: '24px', height: '100%' }"
          >
            <template v-slot:title>{{ $t("site_map_title") }}</template>
            <template v-slot:text>
              <el-row :gutter="12">
                <el-col :sm="8" v-for="link in links">
                  <v-btn
                    class="site-link"
                    :href="link.value"
                    link
                    target="_blank"
                    variant="outlined"
                    style="margin-bottom: 12px"
                  >
                    {{ $t(link.label) }}
                  </v-btn>
                </el-col>
              </el-row>
            </template>
          </v-card>
        </el-col>
        <el-col :sm="16" :style="{ marginBottom: '12px' }">
          <v-card
            width="100%"
            :style="{ marginBottom: '24px', height: '100%' }"
          >
            <template v-slot:title>公布欄</template>
            <template v-slot:text>
              <ul>
                <li>1. MA片阻分選：12月1日至1月31日，共計43天。</li>
                <li>2. MA散料放大投單MOQ：3月1日至3月30日，共計21天。</li>
                <li>3. AOI資料上傳分析：1月10日至2月28日，共計30天。</li>
                <li>4. 產能利用率：12月25日至1月10日，共計12天。</li>
                <li>5. 包裝分箱：3月1日至5月30日，共計62天。</li>
                <li>6. 入庫檢查是否點收 1月5日至1月31日。</li>
              </ul>
            </template>
          </v-card>
        </el-col>
        <el-col :sm="8">
          <v-date-picker></v-date-picker>
        </el-col>
        <el-col :sm="24">
          <v-card width="100%">
            <template v-slot:title>分機列表</template>
            <template v-slot:text>
              <iframe
                :src="`${pdfURL}#zoom=FitH&toolbar=1`"
                style="width: 100%; height: 800px"
              />
            </template>
          </v-card>
        </el-col>
      </el-row>
    </v-main>
  </Layout>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

import { useI18n } from "vue-i18n";
import axios from "@/axios";

import kvSrc from "@/assets/kv1.jpg";

const pdfURL = ref("http://192.168.0.157:3081/ext/extension_list");

const BTN_LIST = [
  { label: "SFC", value: "http://192.168.0.194:8088/" },
  { label: "ETS", value: "http://192.168.0.157:8082/" },
  { label: "ORD", value: "http://192.168.0.157:8083/" },
  { label: "ADMIN", value: "http://192.168.0.157:8084/" },
  { label: "WORKFLOW", value: "http://192.168.0.157:8085/" },
  { label: "T100", value: "https://192.168.0.25/T100_go.html" },
  { label: "鼎新BPM", value: "http://192.168.0.157:8086/NaNaWeb/" },
  { label: "WEBMAIL", value: "http://192.168.0.3/webmail" },
  { label: "舊內網", value: "http://192.168.0.221:8088/" },
];

const props = defineProps([]);
const { t } = useI18n();
const store = useStore();
const links = ref(BTN_LIST);

import { useTheme } from "vuetify";

onMounted(() => {});
</script>
