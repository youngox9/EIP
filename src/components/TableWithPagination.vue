<template>
  <div
    :style="{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      width: '100%',
      marginBottom: '12px',
    }"
  >
    <el-pagination
      v-if="list && list?.length && showPagination"
      background
      v-model:currentPage="pageConfig.page"
      v-model:page-size="pageConfig.pageSize"
      :page-count="pageConfig.total"
      :page-sizes="PAGE_SIZES"
      layout="sizes, prev, pager, next"
      @size-change="
        (val) => {
          onPageChange({ page: 1, pageSize: val });
        }
      "
      @current-change="
        (val) => {
          onPageChange({ page: val });
        }
      "
    />
    <div v-else />
    <el-space :style="{ justifyContent: 'flex-end' }">
      <slot name="controls"></slot>
    </el-space>
  </div>

  <slot />

  <el-pagination
    v-if="list && list?.length && showPagination"
    :style="{ justifyContent: 'flex-end', marginTop: '12px' }"
    background
    v-model:currentPage="pageConfig.page"
    v-model:page-size="pageConfig.pageSize"
    :page-count="pageConfig.total"
    :page-sizes="PAGE_SIZES"
    layout="sizes, prev, pager, next"
    @size-change="
      (val) => {
        onPageChange({ page: 1, pageSize: val });
      }
    "
    @current-change="
      (val) => {
        onPageChange({ page: val });
      }
    "
  />
</template>

<script setup>
import { defineExpose, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useState } from "@/utils";

const INITIAL_PAGECONFIG = { page: 1, total: 1, pageSize: 10 };
const PAGE_SIZES = [10, 100, 200, 300, 1000];

const props = defineProps({
  list: { type: Array, required: false },
  onChange: { type: Function, require: true },
  showPagination: { type: Boolean, require: false, default: true },
});

const { t } = useI18n();

const [pageConfig, setPageConfig] = useState(INITIAL_PAGECONFIG);

async function onPageChange(config) {
  const newConfig = { ...pageConfig.value, ...config };
  setPageConfig(newConfig);
  // console.log(">>>>", newConfig, ">>> old:", pageConfig.value);
  await nextTick();
  props.onChange(newConfig);
}

defineExpose({
  pageConfig,
  setPageConfig: (config) => {
    setPageConfig({ ...pageConfig.value, ...config });
  },
});
</script>
