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
      <span>Hello, here you can add your todos.</span>
    </v-tooltip>
  </div>
  <v-container
    class="d-flex flex-column align-center justify-center"
    fill-height
  >
    <BaseButton
      v-if="showImportButton"
      icon="mdi-plus"
      color="#65bbae"
      @click="navigateToForm"
      class="import-button"
    />

    <BaseButton
      v-if="showTableButton"
      @click="navigateTo('/table')" 
      :label="'Go to Table'" 
      color="primary" 
      class="nav-button"
    />

    <BaseButton
      v-if="showCalendarButton"
      @click="navigateTo('/calendar')" 
      :label="'Go to Calendar'" 
      color="primary" 
      class="nav-button"
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

// Determine if the Import New Task button should be shown
const showImportButton = computed(() => {
  return [ '/table', '/calendar'].includes(route.path);
});

// Determine if the Go to Table button should be shown
const showTableButton = computed(() => route.path === '/tasks');

// Determine if the Go to Calendar button should be shown
const showCalendarButton = computed(() => route.path === '/tasks');

// Function to navigate to the Task Form page
function navigateToForm() {
  router.push('/import');
}

function navigateTo(path) {
  router.push(path);
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

.import-button{
  position: absolute;
  right: 16px;
  bottom: 20px;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  min-width: 56px;
  padding: 0;
}

.import-button:hover {
  background-color: #293d3a;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
}

.nav-button {
  display: table;
  margin: 0 auto;
}
</style>