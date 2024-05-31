<script setup lang="ts">
import { onMounted } from "vue";
import { usePlanetsStore } from "store/main.ts";

const planetsStore = usePlanetsStore();
onMounted(async () => {
  await planetsStore.loadPlanets();
});
</script>

<template>
  <main class="main__container">
    <RouterView />
  </main>
</template>

<style scoped lang="postcss">
.main__container {
  padding: 10px 5px;
  overflow: hidden;
}
</style>
