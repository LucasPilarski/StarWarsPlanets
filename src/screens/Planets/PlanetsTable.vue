<script setup lang="ts">
import PlanetRow from "screens/Planets/PlanetRow.vue";
import TableHeader from "components/Table/TableHeader/TableHeader.vue";
import TableBody from "components/Table/TableBody/TableBody.vue";
import type { PropType } from "vue";
import type { MappedTableHeader, Planet } from "@/types";
import PlanetHeader from "screens/Planets/PlanetHeader.vue";

defineEmits(["sort"]);

defineProps({
  planets: {
    type: Array as PropType<Planet[]>,
    required: true,
    default: () => [],
  },
  headers: {
    type: Array as PropType<MappedTableHeader[]>,
    required: true,
    default: () => [],
  },
});
</script>

<template>
  <table v-if="planets.length > 0">
    <TableHeader>
      <PlanetHeader
        v-for="header in headers"
        :key="header.value"
        :header="header"
        @sort="$emit('sort', $event)"
      />
    </TableHeader>
    <TableBody>
      <PlanetRow
        v-for="planet in planets"
        :key="planet.name"
        :planet="planet"
      />
    </TableBody>
  </table>
  <div v-else>No results to show</div>
</template>

<style scoped></style>
