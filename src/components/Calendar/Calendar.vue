<template>
  <el-row :gutter="12">
    <el-col :xs="24" :sm="4">
      <el-form-item :label="$t('room_no')" prop="room_no">
        <el-select v-model="form.room_no" @change="getList()">
          <el-option
            v-for="opt in room_no_options"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="4">
      <el-form-item :label="$t('start')" prop="start">
        <el-date-picker
          v-model="form.start"
          type="date"
          :style="{ width: '100%' }"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          @change="getList()"
        />
      </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="4">
      <el-form-item :label="$t('end')" prop="end">
        <el-date-picker
          v-model="form.end"
          type="date"
          :style="{ width: '100%' }"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
    </el-col>
    <el-col :xs="24" :sm="12">
      <div
        :style="{
          width: '100%',
          display: 'flex',
          'justify-content': 'flex-end',
        }"
      >
      <el-button type="primary" tag="a" :href="MEETING_URL" target="_blank" rel="noopener noreferrer">
        預約會議室
        <el-icon class="el-icon--right">
          <Link />
        </el-icon>
      </el-button>

      </div>
    </el-col>
  </el-row>
  <vue-cal
    :locale="zh"
    :disable-views="['years', 'year']"
    active-view="week"
    :events="events"
    style="width: 100%"
    xsmall
  >
  </vue-cal>

  <Modal
    v-model="modalConfig.isOpen"
    :modalConfig="modalConfig"
    :onClose="getList"
    v-bind="$props"
  />
</template>
<script setup>
import { useStore } from "vuex";

import axios from "@/axios";

import {
  ref,
  computed,
  watch,
  onMounted,
  onUnmounted,
  // defineEmits,
  useSlots,
  onUpdated,
} from "vue";

import { useI18n } from "vue-i18n";
import _ from "lodash";
import $ from "jquery";

import moment from "moment";

import Modal from "./Modal.vue";

const zh_locale = {
  weekDays: [
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
    "星期日",
  ],
  weekDaysShort: ["一", "二", "三", "四", "五", "六", "日"],
  months: [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ],
  years: "年",
  year: "本年",
  month: "月",
  week: "周",
  day: "日",
  today: "今日",
  noEvent: "暫無活動",
  allDay: "整天",
  deleteEvent: "刪除",
  createEvent: "新建活動",
  dateFormat: "YYYY MMMM D dddd",
};

const zh = ref(zh_locale);

const emit = defineEmits();

const props = defineProps([]);
// const attrs = useAttrs();

const { t } = useI18n();

const selectedDate = ref(moment().format("YYYY-MM-DD HH:mm"));

const all_events = ref([]);
const events = ref([]);
const modalConfig = ref({ isOpen: false, mode: "edit" });
const store = useStore();
const form = ref({});

const ROOM_LABEL_MAPPING = {
  101: "A棟1F會議室",
  102: "A棟2F(訓練教室)大會議室",
  103: "行政副總辦公室",
  104: "總經理辦公室",
  301: "C棟1F會議室",
  401: "D棟1F會議室",
};

const room_no_options = computed(() => {
  const temp = _.uniqBy(all_events?.value || [], "room_no").map((obj) => {
    const value = obj?.["room_no"];
    const label = ROOM_LABEL_MAPPING?.[value] || value;
    return {
      label,
      value,
    };
  });
  return temp;
});

const MEETING_URL = "http://192.168.0.157:8082/#/MEETING";

onMounted(async () => {
  // const all_events = await getList();
  all_events.value = await getList();
});

onUnmounted(() => {});

// watch(
//   () => props?.modalValue,
//   () => {
//     // console.log(props);
//   },
//   { deep: true }
// );

async function getList() {
  let newEvents = [];
  store.commit("global/setIsLoading", true);
  try {
    const res = await axios({
      url: `/calendar/events`,
      method: "GET",
      showError: true,
      params: {
        ...form.value,
      },
    });
    newEvents = res?.data.map((o) => {
      const startData = moment(o.start).format("YYYY-MM-DD HH:mm");
      const endData = moment(o.end).format("YYYY-MM-DD HH:mm");

      return {
        ...o,
        start: startData,
        end: endData,
        class: "room",
        title: ` ${o.title}<br>會議室:${o.room_no}<br>申請人:${o.user_name || ""}`,
      };
    });
    events.value = newEvents || [];

    const firstDate = new Date(res?.data?.[0]?.start);
    selectedDate.value = firstDate;
  } catch (e) {
    console.log(e);
  }
  store.commit("global/setIsLoading", false);
  return newEvents;
}

defineExpose({});
</script>

<style lang="scss">
.vuecal {
  text-align: center;
  border: 1px solid #ccc;

  .weekday-label {
    display: flex;
    flex-direction: column;
    justify-content: centerc;
    align-items: center;
    span {
      display: block;
    }
  }
  .vuecal__cell {
    min-height: 60px;
    height: auto;
    /* padding: 12px; */
  }

  .vuecal__header {
    background-color: var(--el-color-primary);
  }

  .vuecal__cell-events-count {
    width: 100%;
    border-radius: 0;
    line-height: 1.5;
    height: auto;
    background-color: var(--el-color-primary);
  }

  .vuecal__event {
    background-color: rgba(var(--el-color-primary-rgb), 0.5);
    color: white;
    /* padding: 12px; */
    line-height: 2;
    font-size: 12px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    /* transform: scale(0.95); */
  }
}
</style>
