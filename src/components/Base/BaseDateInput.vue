<template>
    <v-date-input
      v-model="model"
      :label="label"
      :min="min"
      :variant="variant"
    >
    </v-date-input>
  </template>
  
  <script setup>
  import { defineModel } from 'vue';
  const model = defineModel()
  
  defineProps({
    label: {
      type: String,
      default: '',
    },
    min: {
        type: String,
        default: '',
    },
    variant: {
        type: String,
        default: 'solo', 
    },
  });
  </script>
  