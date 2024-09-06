<template>
  <div class="info-tooltip-wrapper">
    <v-tooltip bottom>
      <template v-slot:activator="{ props }">
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
      <span>Hello, here you can add categories to categorise your todos.</span>
    </v-tooltip>
  </div>
  <v-container
    class="d-flex flex-column align-center justify-center"
    fill-height
  >
    <BaseButton
      v-if="showImportButton"
      label="Create New Category"
      @click="navigateToForm"
    />
    <router-view />
  </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import BaseButton from '../Base/BaseButton.vue';

const router = useRouter();
const route = useRoute();

// Determine if the Create New Category button should be shown
const showImportButton = computed(() => route.path === '/categories');

// Function to navigate to the Category Form page
function navigateToForm() {
  router.push('/create');
}
</script>

<style scoped>
.info-tooltip-wrapper {
  position: absolute;
  margin-top: 10px;
  right: 16px;
}

.info-button {
  background-color: #1565C0; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}
</style>