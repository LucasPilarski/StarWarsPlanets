<script setup lang="ts">
import {onMounted} from "vue";
import {usePlanetsStore} from "store/planets.ts";

const planetsStore = usePlanetsStore()

onMounted(() => {
  planetsStore.fetchPlanets()
})
</script>

<template>
  <h2>Star Wars Planets</h2>
  <table>
    <thead>
      <tr>
        <td>Name</td>
        <td>Population</td>
        <td>Rotation period</td>
        <td>Climate</td>
        <td>Gravity</td>
        <td>Created</td>
        <td>Url</td>
      </tr>
    </thead>
    <tr v-for="planet in planetsStore.planets" :key="planet.name">
      <td>{{planet.name}}</td>
      <td>{{planet.population}}</td>
      <td>{{planet.rotation_period}}</td>
      <td>{{planet.climate}}</td>
      <td>{{planet.gravity}}</td>
      <td>{{planet.created}}</td>
      <td>
        <a :href=planet.url target="_blank">Link</a>
      </td>
    </tr>
  </table>
</template>

<style scoped></style>
