<template>
  <v-select
    v-model="model"
    :label="label"
    :rules="rules"
    :required="isRequired"
    :items="items"
  >
  </v-select>
</template>

<script setup>
import { computed , defineModel } from 'vue';

const model = defineModel();

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  rules: {
    type: Array,
    default: () => [],
  },
  required: {
    type: Boolean,
    default: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
});

const isRequired = computed(() => {
  return props.required;
});
</script>
