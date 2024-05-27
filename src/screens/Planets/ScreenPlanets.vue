<script setup lang="ts">
import { type FilterFields, usePlanetsStore } from "store/planets.ts";
import TablePagination from "screens/Planets/TablePagination.vue";
import TableHeader from "components/Table/TableHeader/TableHeader.vue";
import TableBody from "components/Table/TableBody/TableBody.vue";

const planetsStore = usePlanetsStore();

const updateFilter = (event: KeyboardEvent, field: FilterFields) => {
  if (event.target) {
    planetsStore.updateFilter(field, event.target.value);
  }
};

const changePage = (newPage: number) => {
  planetsStore.changePage(newPage);
};
</script>

<template>
  <h2>Star Wars Planets</h2>

  <div>
    <label>
      Name
      <input type="text" @keyup="updateFilter($event, 'name')" />
    </label>

    <button @click="planetsStore.fetchPlanets()">Filter results</button>
  </div>

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
      <tr v-for="planet in planetsStore.planets" :key="planet.name">
        <td>{{ planet.name }}</td>
        <td>{{ planet.population }}</td>
        <td>{{ planet.rotation_period }}</td>
        <td>{{ planet.climate }}</td>
        <td>{{ planet.gravity }}</td>
        <td>{{ planet.created }}</td>
        <td>
          <a :href="planet.url" target="_blank">Link</a>
        </td>
      </tr>
    </TableBody>
  </table>

  <TablePagination
    :current-page="planetsStore.pagination.currentPage"
    :last-page="planetsStore.pagination.lastPage"
    @change-page="changePage"
  />
</template>

<style scoped></style>
