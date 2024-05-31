<script setup lang="ts">
import type { PropType } from "vue";
import type { MappedPlanet } from "@/types";
import CommonCheckbox from "components/Input/CommonInputCheckbox.vue";

defineEmits(["planetSelected"]);

defineProps({
  planet: {
    type: Object as PropType<MappedPlanet>,
    required: true,
    default: () => ({}),
  },
});
</script>

<template>
  <tr class="planetRow__container">
    <td data-label="Select" class="planetRow__select">
      <CommonCheckbox
          name="isSelected"
          :checked="planet.isSelected"
          @change="$emit('planetSelected', planet.id)"
      />
    </td>
    <td data-label="Name" class="planetRow__name">{{ planet.name }}</td>
    <td data-label="Population" class="planetRow__population">
      {{ planet.population }}
    </td>
    <td data-label="Rotation period" class="planetRow__rotation_period">
      {{ planet.rotation_period }}
    </td>
    <td data-label="Climate" class="planetRow__climate">
      {{ planet.climate }}
    </td>
    <td data-label="Gravity" class="planetRow__gravity">
      {{ planet.gravity }}
    </td>
    <td data-label="Created" class="planetRow__created">
      {{ planet.created.split("T")[0] }}
    </td>
    <td data-label="Link" class="planetRow__link">
      <a :href="planet.url" target="_blank">Link</a>
    </td>
  </tr>
</template>

<style scoped lang="postcss">
.planetRow__container {
  height: 50px;
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
}

.planetRow__container td {
  padding: 5px 10px;
}

.planetRow__select {
  width: 30px;
}

.planetRow__name {
  width: 120px;
}

.planetRow__population {
  width: 120px;
}

.planetRow__rotation_period {
  width: 120px;
}

.planetRow__climate {
  width: 100px;
}

.planetRow__gravity {
  width: 100px;
}

.planetRow__created {
  width: 100px;
}

.planetRow__link {
  width: 50px;
}

@media only screen and (max-width: 760px) {
  .planetRow__container {
    height: auto;
  }

  .planetRow__container td {
    padding: 0.3rem 0 0.3rem 50%;
  }

  .planetRow__select {
    width: auto;
  }

  .planetRow__name {
    width: auto;
  }

  .planetRow__population {
    width: auto;
  }

  .planetRow__rotationPeriod {
    width: auto;
  }

  .planetRow__climate {
    width: auto;
  }

  .planetRow__gravity {
    width: auto;
  }

  .planetRow__created {
    width: auto;
  }

  .planetRow__link {
    width: auto;
  }
}
</style>
