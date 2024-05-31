<script setup lang="ts">
import { usePlanetsStore } from "store/main.ts";
import TablePagination from "screens/Planets/TablePagination.vue";
import PlanetsFilters from "screens/Planets/Filters/PlanetsFilters.vue";
import PlanetsTable from "screens/Planets/PlanetsTable.vue";
import PlanetsLimit from "screens/Planets/Filters/PlanetsLimit.vue";

const planetsStore = usePlanetsStore();
</script>

<template>
  <div class="screenPlanets__container">
    <div class="screenPlanets__header">
      <h2 class="screenPlanets__title">Star Wars Planets</h2>

      <PlanetsFilters
        :climate-options="planetsStore.climateOptions"
        :filters="planetsStore.filtersState.filters"
        :expanded-filtering="planetsStore.filtersState.expandedFiltering"
        :hide-unknown-results="planetsStore.filtersState.hideUnknownResults"
        @filter-planets="planetsStore.filterPlanets"
        @change-filter="planetsStore.changeFilter"
        @clear-filters="planetsStore.clearFilters"
        @toggle-expanded-filters="planetsStore.toggleExpandedFilters"
        @toggle-filtering-unknown-results="
          planetsStore.toggleFilteringUnknownResults
        "
      />

      <PlanetsLimit
        :limit="planetsStore.pagination.limit"
        :planets-population="planetsStore.planetsPopulation"
        @change-limit="planetsStore.changeLimit($event.target.value)"
      />
    </div>

    <PlanetsTable
      :planets="planetsStore.planets"
      :headers="planetsStore.tableHeaders"
      :all-planets-selected="planetsStore.allPlanetsSelected"
      @sort="planetsStore.changeSorting"
      @planet-selected="planetsStore.selectPlanet"
      @all-planets-selected="planetsStore.toggleSelectAllPlanets"
    />

    <TablePagination
      :pagination="planetsStore.pagination"
      @change-page="planetsStore.changePage($event)"
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
