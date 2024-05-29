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
    <td class="planetRow__name">{{ planet.name }}</td>
    <td class="planetRow__population">{{ planet.population }}</td>
    <td class="planetRow__rotationPeriod">{{ planet.rotation_period }}</td>
    <td class="planetRow__climate">{{ planet.climate }}</td>
    <td class="planetRow__gravity">{{ planet.gravity }}</td>
    <td class="planetRow__created">{{ planet.created.split("T")[0] }}</td>
    <td class="planetRow__link">
      <a :href="planet.url" target="_blank">Link</a>
    </td>
  </tr>
</template>

<style scoped>
.planetRow__container td {
  padding: 5px 10px;
}
</style>
