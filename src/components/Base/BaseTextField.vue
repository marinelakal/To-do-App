<template>
    <v-text-field
      v-model="model"
      :label="label"
      :outlined="isOutlined"
      :dense="isDense"
      :prepend-inner-icon="prependInnerIcon"
      :hide-details="hideDetails"
      :single-line="singleLine"
      :rules="rules"
      :required="isRequired"
    >
    </v-text-field>
  </template>
  
  <script setup>
  import { computed } from 'vue';

  const model = defineModel()
  
  const props = defineProps({
    label: {
      type: String,
      default: '',
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    dense: {
      type: Boolean,
      default: true,
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
      default: true,
    },
  });

  const isRequired = computed(() => props.required);
  const isOutlined = computed(() => props.outlined);
  const isDense = computed(() => props.dense);
  </script>
  