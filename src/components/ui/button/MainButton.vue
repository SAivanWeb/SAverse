<template>
  <button class="button">
    {{title}}
  </button>
</template>

<script setup lang="ts">
interface Props {
  title: string
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.button{
  width: fit-content;
  background-color: #F5F5F5;
  color: #0D1117;
  padding: 8px 24px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    box-shadow: 0 0 12px 3px rgba(255, 255, 255, 0.55),
    0 0 25px 8px rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 767px) {
    &:hover {
      box-shadow: none;
    }
  }
}
</style>