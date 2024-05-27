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
  list: Planet[]
  filters: Record<FilterFields, string>
  sort: string
  limit: number
  page: number
}

export type FilterFields = 'name' | 'population' | 'rotation_period' | 'climate' | 'gravity';

export type UserState = {
  filters: Record<FilterFields, string>
  page: number
}

export const usePlanetsStore = defineStore("planets", () => {
 const planetsState = ref<PlanetsState>({
     list: [],
     filters: {
         name: '',
         population: '',
         rotation_period: '',
         climate: '',
         gravity: '',
     },
     sort: '',
     limit: 10,
     page: 1
 })

  const planets = computed(() => planetsState.value.list.slice((planetsState.value.page - 1) * planetsState.value.limit, planetsState.value.page * planetsState.value.limit)
      .map((planet => ({
      name: planet.name,
      population: planet.population,
      rotation_period: planet.rotation_period,
      climate: planet.climate,
      gravity: planet.gravity,
      created: planet.created.split('T')[0],
      url: planet.url,
    })))
  )

    const pagination = computed(() => ({
        currentPage: planetsState.value.page,
        lastPage: Math.ceil(planetsState.value.list.length / planetsState.value.limit)
    }))

    const loadPlanets = (url?: string) => {
        fetch(url ?? `https://swapi.dev/api/planets`)
            .then(response => response.json())
            .then((response: PlanetsApiResponse) => {
                planetsState.value.list = planetsState.value.list.concat(response.results)
                if (response.next) {
                    loadPlanets(response.next)
                } else {
                    localStorage.setItem("planets", JSON.stringify(planetsState.value.list))
                }
            })
    }

  const fetchPlanets = () => {
      if (localStorage.getItem('planets') !== null) {
          planetsState.value.list = planetsState.value.list.concat(JSON.parse(localStorage.getItem('planets') as string))
      } else {
          loadPlanets()
  }
}

  const showNextPlanets = () => {
      planetsState.value.page++
  }

  const showPreviousPlanets = () => {
      planetsState.value.page--
  }

  const changePage = (value: number) => {
      planetsState.value.page = value;
  }

  const updateFilter = (key: FilterFields, value: string) => {
      planetsState.value.filters[key] = value
  }

  return { fetchPlanets, planets, pagination, changePage, showPreviousPlanets, showNextPlanets, updateFilter }
});
