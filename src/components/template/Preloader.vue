<template>
  <div class="preloader">
    <div
      class="preloader__container"
      :class="active ? 'in' : 'out'"
    >
      <div class="preloader__icon-trail"></div>
      <Rocket class="preloader__icon"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Rocket from "@/assets/icons/rocket.vue";

defineProps<{
  active: boolean
}>();
</script>

<style lang="scss" scoped>
.preloader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &__container {
    position: absolute;
    top: 50%;
    left: 0;
    display: flex;
    align-items: center;
    will-change: transform, opacity;
  }

  &__container.in {
    animation: rocket-in-desktop 1.2s ease-out forwards;
    @media (max-width: 900px) {
      animation: rocket-in-mobile 1.2s ease-out forwards;
    }
    
  }

  &__container.out {
    animation: rocket-out 1s ease-in forwards;
  }

  &__icon {
    width: 100px;
    height: 100px;
    transform: rotate(45deg);
  }

  &__icon-trail {
    transform: translateX(-20px) rotate(90deg);
    width: 20px;
    height: 200px;
    border-radius: 50%;
    background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.9) 0%,
        rgba(255, 255, 255, 0.4) 40%,
        rgba(255, 255, 255, 0) 100%
    );
    filter: blur(4px);
    opacity: 0.9;
    will-change: filter, opacity, transform;
    animation: flame-flicker 0.25s infinite alternate;
  }
}

@keyframes rocket-in-desktop {
  0% {
    opacity: 0;
    transform: translateY(-50%) translateX(-200px) scale(0.8);
  }
  60% {
    opacity: 1;
    transform: translateY(-50%) translateX(55vw) scale(1.05);
  }
  100% {
    opacity: 1;
    transform: translateY(-50%) translateX(50vw) scale(1);
  }
}

@keyframes rocket-in-mobile {
  0% {
    opacity: 0;
    transform: translateY(-50%) translateX(-200px) scale(0.8);
  }
  60% {
    opacity: 1;
    transform: translateY(-50%) translateX(40vw) scale(1.05);
  }
  100% {
    opacity: 1;
    transform: translateY(-50%) translateX(35vw) scale(1);
  }
}

@keyframes rocket-out {
  0% {
    opacity: 1;
    transform: translateY(-50%) translateX(50vw) scale(1);
  }
  30% {
    transform: translateY(-50%) translateX(50vw) scale(1.1);
  }
  100% {
    opacity: 0;
    transform: translateY(-50%) translateX(120vw) scale(0.8);
  }
}

@keyframes flame-flicker {
  0% {
    transform: translateX(-20px) rotate(90deg) scaleY(1);
    opacity: 0.8;
    filter: blur(3px);
  }
  100% {
    transform: translateX(-20px) rotate(90deg) scaleY(1.1);
    opacity: 1;
    filter: blur(5px);
  }
}
</style>
