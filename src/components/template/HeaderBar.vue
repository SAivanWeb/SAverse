<template>
  <div class="header">
    <div class="header__container">
      <div class="header__logo"></div>
      <div class="header__menu">
        <MainButton title="Вход"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MainButton from "@/components/ui/button/MainButton.vue";

</script>

<style lang="scss" scoped>
.header {
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
  }
}
</style>