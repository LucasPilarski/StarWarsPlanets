<script setup lang="ts">
import Select from "components/Input/InputSelect.vue";

defineProps({
  planetsPopulation: {
    type: Number,
    required: true,
    default: 0,
  },
  limit: {
    type: Number,
    required: true,
    default: 0,
  },
});

defineEmits(["changeLimit"]);
</script>

<template>
  <div class="planetsLimit__container">
    <p class="planetsLimit__population">
      Selected planets population is {{ planetsPopulation }}
    </p>
    <div class="screenPlanets__limit">
      <Select
        :value="limit"
        :label="'Limit'"
        :variant="'horizontal'"
        :options="[
          { label: '10', value: '10' },
          { label: '25', value: '25' },
          { label: '50', value: '50' },
          { label: '100', value: '100' },
        ]"
        @option-picked="$emit('changeLimit', $event)"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.planetsLimit__container {
  display: flex;
  justify-content: space-between;
}

.screenPlanets__limit {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
