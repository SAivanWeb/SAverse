<template>
  <n-config-provider>
    <n-message-provider>
      <transition name="content-fade">
        <div v-show="!showPreloader" key="content">
          <HeaderBar @show-auth="showAuthModal = true"/>
          <div class="main">
            <router-view  @show-galaxy="openGalaxyModal" @show-planet="showPlanetModal = true" @show-auth="showAuthModal = true"/>
          </div>

          <AuthModal v-if="showAuthModal" @hide-modal="closeModal"/>
          <GalaxyModal
            v-if="showGalaxyModal"
            :edit="galaxyEditMode"
            :galaxy="selectedGalaxy || undefined"
            @hide-modal="closeModal"
          />
          <PlanetModal v-if="showPlanetModal" @hide-modal="closeModal"/>
        </div>
      </transition>

      <transition name="fade">
        <div v-show="showPreloader" key="preloader">
          <Preloader :active="showPreloader" />
        </div>
      </transition>
      <BackgroundAnimation class="main__background" :faster="showPreloader"/>
      <NotifyHost/>
    </n-message-provider>
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
import {Galaxy} from "@/api/modules/types/galaxy";
import NotifyHost from "@/components/template/NotifyHost.vue";

const loadingStore = useLoadingStore();
const { loading } = storeToRefs(loadingStore);

const showPreloader = ref<boolean>(false);
const showAuthModal = ref<boolean>(false);
const showGalaxyModal = ref<boolean>(false);
const showPlanetModal = ref<boolean>(false);
const galaxyEditMode = ref<boolean>(false);
const selectedGalaxy = ref<Galaxy | null>(null);

const closeModal = () => {
  showAuthModal.value = false;
  showGalaxyModal.value = false;
  showPlanetModal.value = false;
  galaxyEditMode.value = false;
  selectedGalaxy.value = null;
};

const openGalaxyModal = (galaxy?: Galaxy) => {
  if (galaxy) {
    selectedGalaxy.value = galaxy;
    galaxyEditMode.value = true;
  } else {
    selectedGalaxy.value = null;
    galaxyEditMode.value = false;
  }
  showGalaxyModal.value = true;
};

const MIN_PRELOADER_MS = 2000;
let hideTimer: ReturnType<typeof setTimeout> | null = null;
let shownAt = 0;

watch(loading, (newVal) => {
  if (newVal) {
    if (hideTimer !== null) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
    if (!showPreloader.value) {
      shownAt = Date.now();
      showPreloader.value = true;
    }
  } else {
    const remaining = Math.max(0, MIN_PRELOADER_MS - (Date.now() - shownAt));
    hideTimer = setTimeout(() => {
      showPreloader.value = false;
      hideTimer = null;
    }, remaining);
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
    position: fixed;
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

/* контент должен прятаться мгновенно (без "просвечивания" новой
   страницы под полупрозрачным старым контентом), но может плавно
   появляться обратно после того, как прелоадер скрылся */
.content-fade-enter-active {
  transition: opacity 0.3s ease;
}
.content-fade-leave-active {
  transition: none;
}
.content-fade-enter-from,
.content-fade-leave-to {
  opacity: 0;
}
</style>