<template>
    <v-container
      class="d-flex flex-column justify-center align-center"
      fill-height
    >
      <slot />
    </v-container>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .fill-height {
    min-height: 100vh; 
  }
  </style>
  