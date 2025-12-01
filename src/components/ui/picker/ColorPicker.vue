<template>
  <div class="picker">
    <label v-if="label" :for="name" class="picker__label">{{ label }}</label>

    <n-color-picker
      :value="modelValue"
      :modes="['hexa']"
      @update:value="handleUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue"

interface Props {
  label?: string
  modelValue?: string
}

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void
}>()

const props = defineProps<Props>()

const handleUpdate = (color: string) => {
  emit("update:modelValue", color)
}
</script>

<style lang="scss">
.picker {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  &__label {
    font-size: 16px;
    color: #0d1117;
  }
}
.n-color-picker{
  height: 47px;
}
.n-color-picker-trigger{
  border-radius: 20px !important;
}
.n-color-picker-trigger__fill{
  height: 47px;
  border-radius: 20px !important;
}
.n-color-picker-trigger__fill > div{
  border-radius: 20px !important;
}
</style>
