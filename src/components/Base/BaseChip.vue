<template>
    <td>
      <v-chip :color="chipColor">
        {{ criticality || 'N/A' }}
      </v-chip>
    </td>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  defineProps({
    criticality: {
      type: String,
      default: '',
    },
    chipColor: {
      type: String,
      required: true,
    },
  });
  </script>
  