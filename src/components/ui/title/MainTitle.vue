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
  font-size: clamp(1.5rem, 4vw, 2.5rem);
}
</style>