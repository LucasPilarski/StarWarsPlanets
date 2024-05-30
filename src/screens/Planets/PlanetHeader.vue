<script setup lang="ts">
import type { PropType } from "vue";
import type { MappedTableHeader } from "@/types";
import SortIcon from "components/SortIcon.vue";

const emit = defineEmits(["sort"]);

const props = defineProps({
  header: {
    type: Object as PropType<MappedTableHeader>,
    required: true,
    default: () => ({
      label: "",
      value: "",
      canSort: false,
      sortBy: false,
      sortDirection: "",
    }),
  },
});

const handleClick = () => {
  if (props.header.canSort) {
    emit("sort", props.header.value);
  }
};
</script>

<template>
  <td
    class="planetHeader__container"
    :class="{ planetHeader__clickable: header.canSort }"
    @click="handleClick"
  >
    <span>{{ header.label }}</span>
    <SortIcon v-show="header.sortBy" :direction="header.sortDirection" />
  </td>
</template>

<style scoped lang="postcss">
.planetHeader__container {
  padding: 5px 10px;
  height: 30px;
}

.planetHeader__clickable:hover {
  cursor: pointer;
}
</style>
