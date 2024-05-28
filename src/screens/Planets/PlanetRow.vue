<script setup lang="ts">
import type { PropType } from "vue";
import type { MappedPlanet } from "@/types";

defineProps({
  planet: {
    type: Object as PropType<MappedPlanet>,
    required: true,
    default: {},
  },
});
</script>

<template>
  <tr>
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

<style scoped></style>
