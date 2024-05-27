<script lang="ts">
enum EventsTypes {
  "keyUp" = "keyUp",
  "change" = "change",
}
</script>

<script setup lang="ts">
import type { PropType } from "vue";
import type { Field } from "@/types";

export type EventObject = {
  value: string;
  name: string;
};

const emit = defineEmits(Object.keys(EventsTypes));
const props = defineProps({
  type: { type: String, default: "text" },
  label: { type: String, default: "", required: true },
  field: {
    type: Object as PropType<Field<string>>,
    required: true,
  },
});

const emitData = (event: Event, type: EventsTypes): void => {
  if (event.target) {
    emit(type, {
      value: (event.target as HTMLInputElement).value,
      name: props.field.name,
    });
  }
};
</script>

<template>
  <label class="input__container">
    {{ label }}
    <input
      class="input__input"
      :disabled="field.disabled"
      :type="type"
      :value="field.value"
      @keyup="emitData($event, 'keyUp' as EventsTypes)"
      @change="emitData($event, 'change' as EventsTypes)"
    />
  </label>
  <p v-if="field.message.length > 0">{{ field.message }}</p>
</template>

<style scoped>
.input__container {
  padding: 10px 0 0;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.input__input {
  width: 200px;
}
</style>
