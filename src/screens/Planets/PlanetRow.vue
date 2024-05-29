<script setup lang="ts">
import type { PropType } from "vue";
import type { MappedPlanet } from "@/types";

defineEmits(["planetSelected"]);

defineProps({
  planet: {
    type: Object as PropType<MappedPlanet>,
    required: true,
    default: () => ({}),
  },
});
</script>

<template>
  <tr class="planetRow__container">
    <td>
      <input
        type="checkbox"
        :checked="planet.isSelected"
        @change="$emit('planetSelected', planet.name)"
      />
    </td>
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
