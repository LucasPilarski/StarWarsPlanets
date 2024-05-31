<script setup lang="ts">
import CommonSelect from "components/Input/CommonInputSelect.vue";

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
    <p>Selected planets population is {{ planetsPopulation }}</p>
    <label class="screenPlanets__limit">
      <!--  This should be a part of the component itself, left here due to the time constraints and problems with styling    -->
      <span class="screenPlanets__limitLabel">Limit</span>
      <CommonSelect
        :value="limit"
        :options="[
          { label: '10', value: '10' },
          { label: '25', value: '25' },
          { label: '50', value: '50' },
          { label: '100', value: '100' },
        ]"
        @option-picked="$emit('changeLimit', $event)"
      />
    </label>
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
  width: 110px;
}

.screenPlanets__limitLabel {
  padding-top: 5px;
  font-weight: bold;
}
</style>
