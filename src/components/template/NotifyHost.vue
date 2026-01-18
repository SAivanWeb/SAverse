<template></template>

<script setup lang="ts">
import { watch } from "vue";
import { useMessage } from "naive-ui";
import { useLoadingStore } from "@/store/useLoadingStore";

const messageApi = useMessage();
const store = useLoadingStore();

watch(
  () => [store.message.type, store.message.message] as const,
  ([type, text]) => {
    if (!text) return;

    const options = { duration: 3000 };

    if (type === "success") messageApi.success(text, options);
    else if (type === "error") messageApi.error(text, options);
    else if (type === "warning") messageApi.warning(text, options);
    else messageApi.info(text, options);

    store.clearMessage();
  }
);
</script>
