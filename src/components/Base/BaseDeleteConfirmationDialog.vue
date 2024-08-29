<template>
    <v-dialog v-model="isVisible" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="cancel">
            Cancel
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="confirm">
            OK
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { defineEmits, defineModel } from 'vue';
  
  const isVisible = defineModel({
    name: 'modelValue',
    props: {
      modelValue: Boolean,
    },
  });
  
  const emit = defineEmits(['confirmDelete']);
  
  function cancel() {
    isVisible.value = false;
  }
  
  function confirm() {
    emit('confirmDelete');
    isVisible.value = false;
  }
  </script>
  