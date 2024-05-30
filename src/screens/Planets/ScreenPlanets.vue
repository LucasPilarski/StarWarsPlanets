<script setup lang="ts">
import { usePlanetsStore } from "store/planets.ts";
import TablePagination from "screens/Planets/TablePagination.vue";
import PlanetsFilters from "screens/Planets/PlanetsFilters.vue";
import PlanetsTable from "screens/Planets/PlanetsTable.vue";

const planetsStore = usePlanetsStore();
</script>

<template>
  <div class="screenPlanets__container">
    <div class="screenPlanets__header">
      <h2 class="screenPlanets__title">Star Wars Planets</h2>

      <PlanetsFilters
        :climate-options="planetsStore.planetsState.climateOptions"
        :filters="planetsStore.planetsState.filters"
        :expanded-filtering="planetsStore.planetsState.expandedFiltering"
        :hide-unknown-results="planetsStore.planetsState.hideUnknownResults"
        @filter-planets="planetsStore.filterPlanets"
        @change-filter="planetsStore.changeFilter"
        @clear-filters="planetsStore.clearFilters"
        @toggle-expanded-filters="planetsStore.toggleExpandedFilters"
        @toggle-filtering-unknown-results="
          planetsStore.toggleFilteringUnknownResults
        "
      />

      <TablePagination
        :pagination="planetsStore.pagination"
        @change-page="planetsStore.changePage($event)"
        @change-limit="planetsStore.changeLimit"
      />

      <p>Selected planets population is {{ planetsStore.planetsPopulation }}</p>
    </div>

    <PlanetsTable
      :planets="planetsStore.planets"
      :headers="planetsStore.tableHeaders"
      :all-planets-selected="planetsStore.allPlanetsSelected"
      @sort="planetsStore.changeSorting"
      @planet-selected="planetsStore.selectPlanet"
      @all-planets-selected="planetsStore.toggleSelectAllPlanets"
    />
  </div>
</template>

<style scoped lang="postcss">
.screenPlanets__title {
  margin: 0 0 1rem;
  font-size: 2rem;
  @media only screen and (max-width: 760px) {
    text-align: center;
    font-size: 2rem;
    margin: 0;
  }
}
</style>
