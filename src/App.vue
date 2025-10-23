<template>
  <n-config-provider>
    <transition name="fade">
      <div v-show="!showPreloader" key="content">
        <HeaderBar/>
        <div class="main">
          <router-view/>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-show="showPreloader" key="preloader">
        <Preloader :active="showPreloader" />
      </div>
    </transition>
    <BackgroundAnimation class="main__background" :faster="showPreloader"/>
  </n-config-provider>
</template>

<script setup lang="ts">
import HeaderBar from "@/components/template/HeaderBar.vue";
import BackgroundAnimation from "@/components/template/BackgroundAnimation.vue";
import Preloader from "@/components/template/Preloader.vue";

import {ref, onMounted} from "vue";

const showPreloader = ref<boolean>(false);

// onMounted(() => {
//   setTimeout(() => {
//     showPreloader.value = true;
//   }, 3000)
//
//   setTimeout(() => {
//     showPreloader.value = false;
//   }, 8000)
// })
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>