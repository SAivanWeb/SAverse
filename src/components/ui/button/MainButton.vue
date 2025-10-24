<template>
  <button class="button" :class="classes" @click="emit('click')">
    {{title}}
  </button>
</template>

<script setup lang="ts">
import {computed} from 'vue'
const emit = defineEmits<{
  (e: 'click'): void
}>()

interface Props {
  title: string
  color?: string
  size?: string
}

const props = defineProps<Props>();

const classes = computed(() => {
  const classes = [];
  if (props.color) {
    classes.push(`button_${props.color}`);
  }
  if (props.size) {
    classes.push(`button_${props.size}`);
  }
  return classes;
})
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

  &_black{
    background-color: #0D1117;
    color: #F5F5F5;

    &:hover{
      box-shadow: none;
    }
  }

  &_large{
    padding: 14px 24px;
    width: 100%;
  }
}
</style>