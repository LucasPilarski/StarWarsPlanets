<script setup lang="ts">
import CommonText, {
  type EventObject,
} from "components/Inputs/Text/CommonText.vue";
import { type PropType, ref } from "vue";
import type { Field } from "@/types";

const emit = defineEmits(["keyUp", "change"]);
const inputType = ref("password");

defineProps({
  label: { type: String, default: "Password", required: false },
  field: {
    type: Object as PropType<Field<string>>,
    required: true,
  },
});

const toggle = () => {
  inputType.value = inputType.value === "text" ? "password" : "text";
};

const onChange = (event: EventObject) => {
  emit("change", event);
};

const onKeyUp = (event: EventObject) => {
  emit("keyUp", event);
};
</script>

<template>
  <CommonText
    :type="inputType"
    :label="label"
    :field="field"
    @change="onChange"
    @key-up="onKeyUp"
  />
  <button type="button" :disabled="field.disabled" @click="toggle">S</button>
</template>

<style scoped></style>
