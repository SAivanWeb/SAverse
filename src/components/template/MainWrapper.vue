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
  height: calc(100vh - 59px);
  padding: 60px 0 0 0;
}
</style>