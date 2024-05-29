<script setup lang="ts">
import PlanetRow from "screens/Planets/PlanetRow.vue";
import TableHeader from "components/Table/TableHeader/TableHeader.vue";
import TableBody from "components/Table/TableBody/TableBody.vue";
import type { PropType } from "vue";
import type { Planet } from "@/types";

defineProps({
  planets: {
    type: Array as PropType<Planet[]>,
    required: true,
    default: () => [],
  },
});
</script>

<template>
  <table>
    <TableHeader>
      <td>Name</td>
      <td>Population</td>
      <td>Rotation period</td>
      <td>Climate</td>
      <td>Gravity</td>
      <td>Created</td>
      <td>Url</td>
    </TableHeader>
    <TableBody>
      <PlanetRow
        v-for="planet in planets"
        :planet="planet"
        :key="planet.name"
      />
    </TableBody>
  </table>
</template>

<style scoped></style>
