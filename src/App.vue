<script setup lang="ts">
import { onMounted } from "vue";
import { usePlanetsStore } from "store/planets.ts";

const planetsStore = usePlanetsStore();
onMounted(() => {
  planetsStore.loadPlanets();
});
</script>

<template>
  <main class="main__container">
    <RouterView />
  </main>
</template>

<style>
.main__container {
  height: var(--app-height);
  padding: 10px 5px;
}
</style>
