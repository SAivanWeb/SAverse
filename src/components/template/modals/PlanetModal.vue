<template>
  <ModalWrapper @hide-modal="emit('hide-modal')">
    <template #header>
      <h3 class="modal__title">
        Создать планету
      </h3>
    </template>
    <template #body>
      <div class="modal__form">
        <MainInput v-model="galaxyData.name" id="name" name="name" placeholder="Введите название" type="text" label="Название"/>
        <ColorPicker v-model:modelValue="galaxyData.color" label="Цвет планеты"/>
      </div>
      <div class="modal__button-group">
        <MainButton title="Создать" color="black" size="large"/>
      </div>
    </template>
  </ModalWrapper>
</template>

<script setup lang="ts">
import ModalWrapper from "@/components/template/ModalWrapper.vue";
import MainInput from "@/components/ui/input/MainInput.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import {ref} from "vue";
import {GalaxyData} from "@/types/interfaces";
import ColorPicker from "@/components/ui/picker/ColorPicker.vue";

const emit = defineEmits<{
  (e: 'hide-modal'): void
}>()

const galaxyData = ref<GalaxyData>({
  name: "",
  color: ""
})
</script>

<style scoped lang="scss">

</style>