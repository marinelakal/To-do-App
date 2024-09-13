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

    <v-toolbar
      flat
      class="custom-toolbar"
      dense
    >
      <v-spacer></v-spacer>

      <v-toolbar-items class="toolbar-items">
        <v-btn @click="navigateTo('/tasks')" icon>
          <v-icon>mdi-table</v-icon>
        </v-btn>

        <v-btn @click="navigateTo('/calendar')" icon>
          <v-icon>mdi-calendar</v-icon>
        </v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>
    </v-toolbar>
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
  return [ '/tasks', '/calendar'].includes(route.path);
});

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

.custom-toolbar {
  background-color: transparent;
  box-shadow: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.toolbar-items {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.import-button:hover, .nav-button:hover {
  background-color: #293d3a;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
}
</style>