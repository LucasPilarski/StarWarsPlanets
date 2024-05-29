<script setup lang="ts">
import type { PropType } from "vue";
import type { Planet } from "@/types";

defineProps({
  planet: {
    type: Object as PropType<Planet>,
    required: true,
    default: () => ({}),
  },
});
</script>

<template>
  <tr class="planetRow__container">
    <td>{{ planet.name }}</td>
    <td>{{ planet.population }}</td>
    <td>{{ planet.rotation_period }}</td>
    <td>{{ planet.climate }}</td>
    <td>{{ planet.gravity }}</td>
    <td>{{ planet.created.split("T")[0] }}</td>
    <td>
      <a :href="planet.url" target="_blank">Link</a>
    </td>
  </tr>
</template>

<style scoped>
.planetRow__container td {
  padding: 5px 10px;
}
</style>
