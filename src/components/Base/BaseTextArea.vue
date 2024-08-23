<template>
    <v-textarea
      v-model="model"
      :label="label"
      :rules="rules"
      :required="required"
    >
    </v-textarea>
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
  });
  </script>
  