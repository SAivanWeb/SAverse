<template>
  <div class="input">
    <label v-if="label" :for="name" class="input__label">{{ label }}</label>
    <input
      class="input__field"
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :type="type"
      :value="modelValue"
      @input="onInput"
    >
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  id: string;
  name: string;
  placeholder: string;
  type: string;
  modelValue?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style lang="scss" scoped>
.input{
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  &__label{
    font-size: 16px;
    color: #0D1117;
  }

  &__field{
    font-size: 16px;
    color: #0D1117;
    padding: 12px 24px;
    background-color: #fff;
    border: 2px solid #0D1117;
    border-radius: 20px;

    &::placeholder{
      color: rgba(13, 17, 23, 0.7);
    }
  }
}
</style>