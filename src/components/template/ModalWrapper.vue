<template>
  <div class="modal__layout">
    <div class="modal">
      <div class="modal__close" @click="emit('hide-modal')">
        <img src="@/assets/icons/close.svg">
      </div>
      <div class="modal__container">
        <div class="modal__header">
          <slot name="header"/>
        </div>
        <div class="modal__body">
          <slot name="body"/>
        </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'hide-modal'): void
}>()
</script>

<style lang="scss">
.modal{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url("@/assets/icons/moon.svg");
  background-size: cover;
  width: 600px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;

  &__layout{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
  }

  &__close{
    position: absolute;
    top: 0;
    right: 110px;
    width: 36px;
    height: 36px;
    cursor: pointer;
  }

  &__container{
    width: 100%;
    max-width: 390px;
    height: 70%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 0 12px;
  }

  &__header{
    display: flex;
    justify-content: center;
  }

  &__body{
    height: fit-content;
    margin: auto 0;
  }

  &__title{
    font-size: 28px;
    color: #0D1117;
  }

  &__form{
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__button-group{
    width: 100%;
    margin-top: 24px;
  }

  &__additional{
    margin-top: 24px;
    & p{
      width: fit-content;
      margin-left: auto;
      font-size: 16px;
      color: #0D1117;
    }

    & span{
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>