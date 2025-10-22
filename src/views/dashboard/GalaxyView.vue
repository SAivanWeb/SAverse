<template>
  <MainWrapper>
    <MainTitle title="123" />
  </MainWrapper>
</template>

<script setup lang="ts">
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import { ref, onMounted } from "vue";
import {useRoute} from "vue-router";

const route = useRoute();

const galaxyId = ref<string | null>(null);

async function fetchGalaxy(): Promise<void> {

}

onMounted(() => {
  const id = route.params.id
  galaxyId.value = Array.isArray(id) ? id[0] : id ?? null
  if (galaxyId.value) {
    fetchGalaxy();
  }
});
</script>

<style lang="scss" scoped>

</style>
