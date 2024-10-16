<template>
  <v-card flat class="form-card">
    <v-card-title>
      <slot name="title"></slot>
    </v-card-title>
    <v-card-subtitle>
      <slot name="subtitle"></slot>
    </v-card-subtitle>
    <v-card-text>
      <slot name="content"></slot>
    </v-card-text>
    <slot name="actions"></slot>
  </v-card>
  </template>
  
  <script setup>
  </script>
  