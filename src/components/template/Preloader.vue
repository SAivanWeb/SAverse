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
    left: -200px;
    display: flex;
    align-items: center;
    transform: translateY(-50%);
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
    animation: flame-flicker 0.25s infinite alternate;
  }
}

@keyframes rocket-in-desktop {
  0% {
    left: -200px;
    opacity: 0;
    transform: translateY(-50%) scale(0.8);
  }
  60% {
    left: 55%;
    opacity: 1;
    transform: translateY(-50%) scale(1.05);
  }
  100% {
    left: 50%;
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
}

@keyframes rocket-in-mobile {
  0% {
    left: -200px;
    opacity: 0;
    transform: translateY(-50%) scale(0.8);
  }
  60% {
    left: 40%;
    opacity: 1;
    transform: translateY(-50%) scale(1.05);
  }
  100% {
    left: 35%;
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
}


@keyframes rocket-out {
  0% {
    left: 50%;
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
  30% {
    transform: translateY(-50%) scale(1.1);
  }
  100% {
    left: 120%;
    opacity: 0;
    transform: translateY(-50%) scale(0.8);
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
