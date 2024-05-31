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
    :class="{ planetHeader__clickable: header.canSort, [`planetHeader__${header.value}`]: true }"
    @click="handleClick"
  >
    <span>{{ header.label }}</span>
    <SortIcon v-show="header.sortBy" :direction="header.sortDirection" />
  </td>
</template>

<style scoped lang="postcss">
.planetHeader__container {
  padding: 0 10px;
  height: 30px;
}

.planetHeader__clickable:hover {
  cursor: pointer;
}

.planetHeader__container {
  height: 50px;
}

.planetHeader__name {
  width: 120px;
}

.planetHeader__population {
  width: 120px;
}

.planetHeader__rotation_period {
  width: 120px;
}

.planetHeader__climate {
  width: 100px;
}

.planetHeader__gravity {
  width: 100px;
}

.planetHeader__created {
  width: 100px;
}

.planetHeader__link {
  width: 50px;
}

@media only screen and (max-width: 760px) {
  .planetHeader__container {
    height: auto;
  }

  .planetHeader__container td {
    padding: 0.3rem 0 0.3rem 50%;
  }

  .planetHeader__select {
    width: auto;
  }

  .planetHeader__name {
    width: auto;
  }

  .planetHeader__population {
    width: auto;
  }

  .planetHeader__rotationPeriod {
    width: auto;
  }

  .planetHeader__climate {
    width: auto;
  }

  .planetHeader__gravity {
    width: auto;
  }

  .planetHeader__created {
    width: auto;
  }

  .planetHeader__link {
    width: auto;
  }
}
</style>
