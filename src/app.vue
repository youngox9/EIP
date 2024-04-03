<template>
  <div class="loading" :class="isLoading ? 'active' : ''"></div>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import $ from "jquery";

const props = defineProps([]);
const { t } = useI18n();
const store = useStore();

const isLoading = computed(() => store?.state?.global?.isLoading);

onMounted(() => {});

onUnmounted(() => {});
</script>
