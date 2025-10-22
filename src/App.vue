<template>
  <n-config-provider>
    <div>
      <HeaderBar/>
      <div class="main">
        <router-view/>
      </div>
    </div>
    <BackgroundAnimation class="main__background"/>
  </n-config-provider>
</template>

<script setup lang="ts">
import HeaderBar from "@/components/template/HeaderBar.vue";
import BackgroundAnimation from "@/components/template/BackgroundAnimation.vue";
</script>

<style scoped lang="scss">
.main{
  font-family: 'Roboto';
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;

  &__background{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>