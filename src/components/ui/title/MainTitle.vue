<template>
  <h2 class="page-title">{{ title }}</h2>
</template>

<script lang="ts" setup>
interface Props {
  title: string
}

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.page-title{
  font-size: 32px;
}
</style>