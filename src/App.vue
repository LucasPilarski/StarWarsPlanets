<script setup lang="ts">
import { onMounted } from "vue";
import { useMainStore } from "store/main.ts";

const mainStore = useMainStore();
onMounted(async () => {
  await mainStore.loadPlanets();
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
