<template>
  <div class="select">
    <label v-if="label" :for="id" class="select__label">{{ label }}</label>
    <select
      class="select__field"
      :id="id"
      :value="modelValue"
      @change="onChange"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >{{ option.label }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
export interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  id: string;
  placeholder?: string;
  modelValue?: string;
  options: SelectOption[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};
</script>

<style lang="scss" scoped>
.select {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  &__label {
    font-size: 16px;
    color: #0D1117;
  }

  &__field {
    font-size: 16px;
    color: #0D1117;
    padding: 12px 24px;
    background-color: #fff;
    border: 2px solid #0D1117;
    border-radius: 20px;
    appearance: none;
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%230D1117' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 20px center;
    padding-right: 44px;

    &:focus {
      outline: none;
    }
  }
}
</style>
