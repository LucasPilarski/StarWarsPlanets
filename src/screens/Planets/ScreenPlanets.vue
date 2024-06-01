<script setup lang="ts">
import { useMainStore } from "store/main.ts";
import TablePagination from "screens/Planets/TablePagination.vue";
import PlanetsFilters from "screens/Planets/Filters/PlanetsFilters.vue";
import PlanetsTable from "screens/Planets/PlanetsTable.vue";
import PlanetsLimit from "screens/Planets/Filters/PlanetsLimit.vue";
import PlanetsSorting from "screens/Planets/PlanetsSorting.vue";

const mainStore = useMainStore();
</script>

<template>
  <div class="screenPlanets__container">
    <div class="screenPlanets__header">
      <h2 class="screenPlanets__title">Star Wars Planets</h2>

      <PlanetsFilters
        :climate-options="mainStore.dictionaries.climateOptions"
        :filters-state="mainStore.filtersState"
        @filter-planets="mainStore.filterPlanets"
        @change-filter="mainStore.changeFilter"
        @clear-filters="mainStore.clearFilters"
        @toggle-expanded-filters="mainStore.toggleExpandedFilters"
        @toggle-filtering-unknown-results="
          mainStore.toggleFilteringUnknownResults
        "
      />

      <PlanetsLimit
        :limit="mainStore.pagination.limit"
        :planets-population="mainStore.planetsPopulation"
        @change-limit="mainStore.changeLimit($event.target.value)"
      />
    </div>

    <PlanetsSorting
      :sorting="mainStore.sortingState"
      :columns="mainStore.dictionaries.sortColumns"
      :directions="mainStore.dictionaries.sortDirections"
      @change-sorting="mainStore.changeSorting"
    />

    <PlanetsTable
      :planets="mainStore.planets"
      :headers="mainStore.tableHeaders"
      :all-planets-selected="mainStore.allPlanetsSelected"
      @sort="mainStore.changeSorting"
      @planet-selected="mainStore.selectPlanet"
      @all-planets-selected="mainStore.toggleSelectAllPlanets"
    />

    <TablePagination
      :pagination="mainStore.pagination"
      @change-page="mainStore.changePage($event)"
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
