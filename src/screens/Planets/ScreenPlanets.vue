<script setup lang="ts">
import { usePlanetsStore } from "store/planets.ts";
import TablePagination from "screens/Planets/TablePagination.vue";
import PlanetsFilters from "screens/Planets/PlanetsFilters.vue";
import PlanetsTable from "screens/Planets/PlanetsTable.vue";

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

  <PlanetsTable :planets="planetsStore.planets" />
</template>

<style scoped></style>
