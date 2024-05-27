import { defineStore } from "pinia";
import type {Planet} from "@/types";
import {computed, ref} from "vue";

export type PlanetsApiResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Planet[]
}

export type PlanetsState = {
  // Do I want to keep it that way just because api response key is results? Should it be planets?
  results: Planet[]
  count: number;
  next: string | null
  previous: string | null
}

export type UserState = {
  filter: string
  page: number
}

export const usePlanetsStore = defineStore("planets", () => {
 const planetsState = ref<PlanetsState>({
   results: [],
   count: 0,
   next: null,
   previous: null
 })

  const userState = ref<UserState>({
    filter: '',
    page: 0
  })

  const planets = computed(() => {
    return planetsState.value.results.map((planet => ({
      name: planet.name,
      population: planet.population,
      rotation_period: planet.rotation_period,
      climate: planet.climate,
      gravity: planet.gravity,
      created: planet.created.split('T')[0],
      url: planet.url,
    })))
  })

  const  fetchPlanets = () => {
    fetch(`https://swapi.dev/api/planets?search=${userState.value.filter}`)
      .then(response => response.json())
      .then((response: PlanetsApiResponse) => {
        planetsState.value = response
  })
  }

  return { fetchPlanets, planets }
});
