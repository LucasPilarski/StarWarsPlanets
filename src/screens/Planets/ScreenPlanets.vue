<script setup lang="ts">
import { usePlanetsStore } from "store/planets.ts";
import TablePagination from "screens/Planets/TablePagination.vue";
import PlanetsFilters from "screens/Planets/PlanetsFilters.vue";
import PlanetsTable from "screens/Planets/PlanetsTable.vue";

const planetsStore = usePlanetsStore();
</script>

<template>
  <div class="screenPlanets_container">
    <h2>Star Wars Planets</h2>

    <PlanetsFilters
      :climate-options="planetsStore.planetsState.climateOptions"
      :filters="planetsStore.planetsState.filters"
      :expanded-filtering="planetsStore.planetsState.expandedFiltering"
      @filter-planets="planetsStore.filterPlanets"
      @change-filter="planetsStore.changeFilter"
      @clear-filters="planetsStore.clearFilters"
      @toggle-advanced-filters="planetsStore.toggleAdvancedFilters"
    />

    <TablePagination
      :pagination="planetsStore.pagination"
      @change-page="planetsStore.changePage($event)"
      @change-limit="planetsStore.changeLimit"
    />

    <PlanetsTable
      :planets="planetsStore.planets"
      :headers="planetsStore.tableHeaders"
      :all-planets-selected="planetsStore.allPlanetsSelected"
      @sort="planetsStore.changeSorting"
      @planet-selected="planetsStore.selectPlanet"
      @all-planets-selected="planetsStore.toggleSelectAllPlanets"
    />

    <p v-if="planetsStore.planetsPopulation > 0">
      Selected planets population is {{ planetsStore.planetsPopulation }}
    </p>
  </div>
</template>

<style scoped></style>
