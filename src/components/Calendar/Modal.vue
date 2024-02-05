<template>
  <el-dialog
    :draggable="true"
    width="600px"
    :title="modalConfig.mode === 'add' ? '新增 會議室' : '編輯 會議室'"
    @before-close="onClose"
    :v-bind="$attrs"
  >
    <el-form :model="form" :rules="rules" ref="formEl" label-width="120px">
      <el-row>
        <!-- 報工項次  -->

        <!-- "id": 1,
  "title": "2023",
  "start": "2023-04-01",
  "end": "2023-04-01",
  "all_day": 0,
  "url": "/test",
  "description": "2023",
  "user_id": "2019021101" -->
        <el-col :span="24">
          <el-form-item :label="$t('title')" prop="title">
            <el-input type="title" v-model="form.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="$t('all_day')" prop="all_day">
            <el-checkbox v-model="form.all_day" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="$t('dateRange')" prop="dateRange">
            <el-date-picker
              v-model="form.dateRange"
              :type="form.all_day ? 'daterange' : 'datetimerange'"
              :format="DATETIME_FORMAT"
              range-separator="至"
              start-placeholder="開始時間"
              end-placeholder="結束時間"
            />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item :label="$t('description')" prop="description">
            <el-input v-model="form.description" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onClose">{{ $t("cancel") }}</el-button>
        <el-button type="primary" @click="submitform"
          >{{ $t("submit") }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { useStore } from "vuex";
import {
  ref,
  unref,
  computed,
  reactive,
  watch,
  toRefs,
  onMounted,
  useAttrs,
} from "vue";
import { ElNotification, ClickOutside as vClickOutside } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import moment from "moment";
import axios from "@/axios";
import { VALIDATIONS, useState } from "@/utils";

import { useVModel } from "@vueuse/core";

const INITIAL_FORMDATA = {
  dateRange: "",
  all_day: false,
};

const props = defineProps(["data", "modalConfig"]);
const emit = defineEmits();
const attrs = useAttrs();
// const { data } = props;
const { t } = useI18n();
const store = useStore();
const router = useRouter();

const [form, setForm] = useState(INITIAL_FORMDATA);
// const [infoList, setInfoList] = useState([]);

const modalConfig = useVModel(props, "modalConfig", emit);

const rules = reactive({
  start: VALIDATIONS.isEmpty(),
  title: VALIDATIONS.isEmpty(),
  //   description: VALIDATIONS.isEmpty(),
  dateRange: VALIDATIONS.dateRange(),
});

const formEl = ref(null);

const ENT = computed(() => store?.state?.global?.ENT || "");

const DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

watch(
  () => props?.modalConfig?.isOpen,
  (val, prev) => {
    if (val && props?.modalConfig?.data) {
      if (props?.modalConfig?.data) {
        const record = props?.modalConfig?.data || {};
        const { start, end } = record;
        const dateRange = [start, end];
        setForm({ ...record, dateRange });
      }
    } else {
      setForm(INITIAL_FORMDATA);
    }
  },
  { deep: true }
);

const profile = computed(() => {
  return store?.state?.global?.profile || {};
});

watch(
  () => form?.value?.dateRange,
  (val, prev) => {
    const s = val?.[0];
    const e = val?.[1];
    const start = moment(s).format(DATETIME_FORMAT);
    const end = moment(e).format(DATETIME_FORMAT);
    form.value.start = start;
    form.value.end = end;
  },
  { deep: true }
);

watch(
  () => form?.value?.all_day,
  (val, prev) => {
    if (val) {
      const { start, end } = form?.value || {};
      form.value.dateRange = [];
      const s1 = moment(start).startOf("day").format(DATETIME_FORMAT);
      const e1 = moment(end).endOf("day").format(DATETIME_FORMAT);
      form.value.start = s1;
      form.value.end = e1;
    }
  },
  { deep: true }
);

function onClose() {
  modalConfig.value.isOpen = false;
  props?.onClose();
}

async function submitform() {
  const formObj = formEl?.value;

  if (formObj) {
    await formObj.validate((valid, fields) => {
      console.log("formObj >>>>>>", valid, fields);
      if (valid) {
        if (props?.modalConfig?.mode === "add") {
          onPost();
        } else {
          onPut();
        }
      } else {
        console.log("error submit!!");
      }
    });
  }
}

async function onPost() {
  store.commit("global/setIsLoading", true);
  try {
    const data = {
      ENT: ENT.value,
      user_id: profile.value?.username,
      ...form.value,
    };
    const res = await axios({
      url: "/calendar/events",
      method: "POST",
      data,
    });
    modalConfig.value.isOpen = false;
    props.onClose();
  } catch (e) {
    console.log(e);
  }
  store.commit("global/setIsLoading", false);
}

async function onPut() {
  store.commit("global/setIsLoading", true);
  try {
    const data = {
      ENT: ENT.value,
      user_id: profile.value?.username,
      ...form.value,
    };
    const res = await axios({
      url: `/calendar/events/${form.value.id}`,
      method: "PUT",
      data,
    });
    modalConfig.value.isOpen = false;
    props.onClose();
  } catch (e) {
    console.log(e);
  }
  store.commit("global/setIsLoading", false);
}
</script>
