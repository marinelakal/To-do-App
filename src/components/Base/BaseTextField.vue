<template>
    <v-text-field
      v-model="model"
      :label="label"
      outlined
      dense
      :prepend-inner-icon="prependInnerIcon"
      :hide-details="hideDetails"
      :single-line="singleLine"
      :rules="rules"
      required
    >
    </v-text-field>
  </template>
  
  <script setup>
  
  const model = defineModel()
  
  defineProps({
    label: {
      type: String,
      default: '',
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    prependInnerIcon: {
      type: String,
      default: '',
    },
    hideDetails: {
      type: Boolean,
      default: false,
    },
    singleLine: {
      type: Boolean,
      default: false,
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
  