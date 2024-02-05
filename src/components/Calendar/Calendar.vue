<!-- 專門處理所有地方的autocomplete -->
<template>
  <!-- <div style="display: flex; width: 100%; justify-content: flex-end">
    <el-button type="primary" @click="onOpen()">
      預約
      <el-icon class="el-icon--right">
        <Plus />
      </el-icon>
    </el-button>
  </div> -->

  <el-table :data="events" :style="{ marginTop: '20px' }">
    <el-table-column
      v-for="fieldKey in columns"
      :prop="fieldKey"
      :label="$t(fieldKey)"
      align="left"
      v-bind="columnsSetting[fieldKey]"
    />
    <!-- <el-table-column label="操作" align="center" fixed="right">
      <template #default="scope">
        <el-space style="width: 100%; justify-content: flex-end">
          <el-button
            size="small"
            plain
            type="primary"
            icon="Edit"
            circle
            @click="onEdit(scope.row)"
          ></el-button>
          <el-button
            size="small"
            plain
            type="danger"
            icon="Delete"
            circle
            @click="onDelete(scope.row)"
          ></el-button>
        </el-space>
      </template>
    </el-table-column> -->
  </el-table>

  <!-- <vue-cal
    class="vuecal--green-theme"
    locale="zh-cn"
    :disable-views="['years', 'year']"
    active-view="month"
    :events="events"
    style="width: 100%"
    xsmall
  >
  </vue-cal> -->

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

const emit = defineEmits();

const props = defineProps([]);
// const attrs = useAttrs();

const { t } = useI18n();

const selectedDate = ref(moment().format("YYYY-MM-DD HH:mm"));

const events = ref([]);
const modalConfig = ref({ isOpen: false, mode: "edit" });
const store = useStore();

const profile = computed(() => {
  return store?.state?.global?.profile || {};
});

onMounted(() => {
  getList();
});

onUnmounted(() => {});

// watch(
//   () => props?.modalValue,
//   () => {
//     // console.log(props);
//   },
//   { deep: true }
// );

const ENT = computed(() => store?.state?.global?.ENT || "");

const columnsSetting = computed(() => {
  return {
    // id: {
    //   width: 40,
    // },
    title: {
      width: 150,
      align: "left",
      fixed: "left",
    },
    user_id: {
      width: 150,
    },
    start: { width: 150, align: "left" },
    end: { width: 150, align: "left" },
    description: {
      // width: 300,
    },
  };
});

const columns = computed(() => {
  return Object.keys(columnsSetting?.value || []);
});

function onOpen() {
  modalConfig.value = { ...modalConfig.value, isOpen: true, mode: "add" };
}

async function getList() {
  try {
    const res = await axios({
      url: `/calendar/events`,
      method: "GET",
      showError: true,
    });
    const newEvents = res?.data.map((o) => {
      const startData = moment(o.start).format("YYYY-MM-DD HH:mm");
      const endData = moment(startData).endOf("day").format("YYYY-MM-DD HH:mm");
      console.log(startData, endData);
      return {
        ...o,
        start: startData,
        end: endData,

        // title: "Need to go shopping",
        // icon: "shopping_cart", // Custom attribute.
        // content: "Click to see my shopping list",
        // contentFull:
        //   "My shopping list is rather long:<br><ul><li>Avocados</li><li>Tomatoes</li><li>Potatoes</li><li>Mangoes</li></ul>", // Custom attribute.
        // class: "leisure",
      };
    });
    events.value = newEvents || [];

    const firstDate = new Date(res?.data?.[0]?.start);
    selectedDate.value = firstDate;
    console.log(res?.data);
  } catch (e) {
    console.log(e);
  }
}

async function onEdit(record) {
  modalConfig.value = { ...modalConfig, isOpen: true, data: record };
}

async function onDelete(record) {
  store.commit("global/setIsLoading", true);
  try {
    const res = await axios({
      url: `/calendar/events/${record.id}`,
      method: "DELETE",
      params: {
        id: record.id,
      },
    });
    await getList();
  } catch (e) {
    console.log(e);
  }
  store.commit("global/setIsLoading", false);
}

defineExpose({});
</script>

<style lang="scss">
.vuecal__cell {
  min-height: 60px;
}
</style>
