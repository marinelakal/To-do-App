<template>
    <v-textarea
      v-model="model"
      :label="label"
      :rules="rules"
      :required="isRequired"
    >
    </v-textarea>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const model = defineModel()
  
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
  });

  const isRequired = computed(() => {
    return props.required;
  });
  </script>
  