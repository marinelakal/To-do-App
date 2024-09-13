<template>
    <div class="info-dialog-wrapper">
      <v-dialog
        v-model="dialogVisible"
        :max-width="maxWidth"
      >
        <template #activator="{ props }">
          <v-btn
            icon
            v-bind="props"
            class="info-button"
          >
            <v-icon color="white">
              mdi-information
            </v-icon>
          </v-btn>
        </template>
  
        <v-card>
          <v-card-title class="headline modal-title">
            <v-icon color="white" class="mr-2">mdi-information</v-icon>
            {{ title }}
          </v-card-title>
  
          <v-divider></v-divider>
  
          <v-card-text class="modal-content">
            <slot>
              {{ content }}
            </slot>
          </v-card-text>
  

  
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <v-btn
              text
              @click="dialogVisible = false"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  defineProps({
    title: {
      type: String,
      default: 'Information',
    },
    content: {
      type: String,
      default: '',
    },
    maxWidth: {
      type: [String, Number],
      default: 500,
    },
  });
  
  const dialogVisible = ref(false);
  </script>
  
  <style scoped>
  .info-dialog-wrapper {
    position: absolute;
    margin-top: 25px;
    right: 16px;
  }
  
  .info-button {
    background-color: #1565C0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
  
  .info-button:hover {
    background-color: #1E88E5;
  }
  
  .modal-title {
    display: flex;
    align-items: center;
    background-color: #65bbae;
    color: white;
    padding: 16px;
    font-size: 20px;
  }
  </style>
  