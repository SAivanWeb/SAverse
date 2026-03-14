<template>
  <div class="main-wrapper">
    <slot/>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.main-wrapper{
  width: 100%;
  height: calc(100vh - 4rem);
  padding: 2rem 0 64px 0;
  
  @media (max-width: 900px) {
    padding: 1rem 0 64px 0;
  }
}
</style>