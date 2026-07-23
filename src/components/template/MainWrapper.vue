<template>
  <div class="main-wrapper" :class="{ 'main-wrapper_with-back': backTo }">
    <Back v-if="backTo" class="main-wrapper__back" @click="goBack"/>
    <slot/>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import Back from "@/assets/icons/back.vue";

interface Props {
  backTo?: string;
}

const props = defineProps<Props>();
const router = useRouter();

function goBack() {
  if (props.backTo) router.push(props.backTo);
}
</script>

<style lang="scss" scoped>
.main-wrapper{
  width: 100%;
  height: calc(100vh - 4rem);
  padding: 2rem 0 64px 0;
  position: relative;

  @media (max-width: 900px) {
    padding: 1rem 0 64px 0;
  }

  &__back{
    position: absolute;
    top: 4px;
    left: 0;
    width: 22px;
    height: 22px;
    color: #fff;
    cursor: pointer;

    &:hover {
      filter:
        drop-shadow(0 0 12px rgba(255, 255, 255, 0.55))
        drop-shadow(0 0 25px rgba(255, 255, 255, 0.2));
    }
  }
}
</style>