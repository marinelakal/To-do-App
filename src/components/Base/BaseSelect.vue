<template>
    <v-select
      v-model="model"
      :label="label"
      :rules="rules"
      required
      :items="items"
    >
    </v-select>
  </template>
  
  <script setup>
  
  const model = defineModel()
  
  defineProps({
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
      default: false,
    },
    items: {
    type: Array,
    default: () => [],
  },
  });
  </script>
  