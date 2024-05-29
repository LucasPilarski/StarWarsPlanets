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
    <td class="planetRow__select">
      <input
        type="checkbox"
        :checked="planet.isSelected"
        @change="$emit('planetSelected', planet.id)"
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
.planetRow__container {
  height: 50px;
}

.planetRow__container td {
  padding: 5px 10px;
}

.planetRow__select {
  width: 30px;
}

.planetRow__name {
  width: 120px;
}

.planetRow__population {
  width: 120px;
}

.planetRow__rotationPeriod {
  width: 100px;
}

.planetRow__climate {
  width: 100px;
}

.planetRow__gravity {
  width: 100px;
}

.planetRow__created {
  width: 100px;
}

.planetRow__link {
  width: 50px;
}
</style>
