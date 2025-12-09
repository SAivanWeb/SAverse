<template>
  <n-config-provider>
    <transition name="fade">
      <div v-show="!showPreloader" key="content">
        <HeaderBar @show-auth="showAuthModal = true"/>
        <div class="main">
          <router-view @show-galaxy="showGalaxyModal = true" @show-planet="showPlanetModal = true"/>
        </div>

        <AuthModal v-if="showAuthModal" @hide-modal="closeModal"/>
        <GalaxyModal v-if="showGalaxyModal" @hide-modal="closeModal"/>
        <PlanetModal v-if="showPlanetModal" @hide-modal="closeModal"/>
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
import AuthModal from "@/components/template/modals/AuthModal.vue";
import GalaxyModal from "@/components/template/modals/GalaxyModal.vue";
import PlanetModal from "@/components/template/modals/PlanetModal.vue";

import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useLoadingStore } from "@/store/useLoadingStore";

const loadingStore = useLoadingStore();
const { loading } = storeToRefs(loadingStore);

const showPreloader = ref<boolean>(false);
const showAuthModal = ref<boolean>(false);
const showGalaxyModal = ref<boolean>(false);
const showPlanetModal = ref<boolean>(false);

const closeModal = () => {
  showAuthModal.value = false;
  showGalaxyModal.value = false;
  showPlanetModal.value = false;
};

watch(loading, (newVal) => {
  if (newVal) {
    showPreloader.value = true;
  } else {
    setTimeout(() => {
      showPreloader.value = false;
    }, 1500);
  }
});
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