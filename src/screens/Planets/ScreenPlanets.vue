<script setup lang="ts">
import { usePlanetsStore } from "store/planets.ts";
import TablePagination from "screens/Planets/TablePagination.vue";
import TableHeader from "components/Table/TableHeader/TableHeader.vue";
import TableBody from "components/Table/TableBody/TableBody.vue";
import PlanetsFilters from "screens/Planets/PlanetsFilters.vue";
import PlanetRow from "screens/Planets/PlanetRow.vue";

const planetsStore = usePlanetsStore();

const changePage = (newPage: number) => {
  planetsStore.changePage(newPage);
};
</script>

<template>
  <h2>Star Wars Planets</h2>

  <PlanetsFilters
    :climateOptions="planetsStore.climateOptions"
    :filters="planetsStore.filters"
    @filterPlanets="planetsStore.filterPlanets"
    @updateFilter="planetsStore.updateFilter"
    @clearFilters="planetsStore.clearFilters"
  />

  <TablePagination
    :pagination="planetsStore.pagination"
    @change-page="changePage"
    @changeLimit="planetsStore.changeLimit"
  />

  <div>
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
            v-for="planet in planetsStore.planets"
            :planet="planet"
            :key="planet.name"
        />
      </TableBody>
    </table>
  </div>
</template>

<style scoped></style>
