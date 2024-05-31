<script setup lang="ts">
import PlanetRow from "screens/Planets/PlanetRow.vue";
import TableHeader from "components/Table/TableHeader/TableHeader.vue";
import TableBody from "components/Table/TableBody/TableBody.vue";
import type { PropType } from "vue";
import type { MappedPlanet, MappedTableHeader } from "@/types";
import PlanetHeader from "screens/Planets/PlanetHeader.vue";
import CommonInputCheckbox from "components/Input/CommonInputCheckbox.vue";

defineEmits(["sort", "planetSelected", "allPlanetsSelected"]);

defineProps({
  planets: {
    type: Array as PropType<MappedPlanet[]>,
    required: true,
    default: () => [],
  },
  headers: {
    type: Array as PropType<MappedTableHeader[]>,
    required: true,
    default: () => [],
  },
  allPlanetsSelected: {
    type: Boolean,
    required: true,
    default: false,
  },
});
</script>

<template>
  <div v-if="planets.length > 0" class="planetsTable__container">
    <table>
      <TableHeader>
        <td class="planetsTable__selectAll">
          <CommonInputCheckbox
            name=""
            label=""
            :checked="allPlanetsSelected"
            @change="$emit('allPlanetsSelected')"
          />
        </td>
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
          @planet-selected="$emit('planetSelected', $event)"
        />
      </TableBody>
    </table>
  </div>
  <div v-else>No results to show</div>
</template>

<style scoped lang="postcss">
.planetsTable__container {
  max-height: 400px;
  overflow: auto;
  border: 1px solid black;
  min-height: 100px;

  @media only screen and (max-width: 760px) {
    height: auto;
    overflow: auto;
    border: none;
    /* max-height: fit-content; */
  }
}

.planetsTable__selectAll {
  width: 30px;
  padding: 5px 10px;
}
</style>
