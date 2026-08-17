<template>
  <ModalWrapper @hide-modal="emit('hide-modal')">
    <template #header>
      <h3 class="modal__title">
        Подтверждение
      </h3>
    </template>
    <template #body>
      <div class="modal__delete">
        <h4 class="modal__delete-text">Подтвердить удаление?</h4>
        <div class="modal__delete-btns">
          <MainButton title="Нет" color="black" size="large" @click="emit('hide-modal')"/>
          <MainButton title="Да" color="black" size="large" @click="emit('delete')"/>
        </div>
      </div>
    </template>
  </ModalWrapper>
</template>

<script setup lang="ts">
import ModalWrapper from "@/components/template/ModalWrapper.vue";
import MainButton from "@/components/ui/button/MainButton.vue";

const emit = defineEmits<{
  (e: 'hide-modal'): void
  (e: 'delete'): void
}>()

</script>

<style scoped lang="scss">

</style>