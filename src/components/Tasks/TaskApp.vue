<template>
  <BaseModal :title="'Information'">
    Hello, here you can add new todos to keep track of everything you need to accomplish. Use the "+" button to add new tasks. View your tasks in a table format for detailed organization or switch to the calendar view to see your tasks scheduled over time.
  </BaseModal>
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
        <v-btn @click="navigateTo('/tasks')" class="toolbar-btn" icon>
          <v-icon color="black">mdi-table</v-icon>
        </v-btn>

        <v-btn @click="navigateTo('/calendar')" class="toolbar-btn" icon>
          <v-icon color="black">mdi-calendar</v-icon>
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
import BaseModal from '../Base/BaseModal.vue';

const router = useRouter();
const route = useRoute();

// Determine if the Import New Task button should be shown
const showImportButton = computed(() => {
  return ['/tasks', '/calendar'].includes(route.path);
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
.import-button {
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
  border-radius: 50px;
  box-shadow: 0px 4px 10px rgba(202, 173, 6, 0.322);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
}

.toolbar-items {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.toolbar-items {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.toolbar-btn:hover {
  background-color: transparent;
}

.import-button:hover, .nav-button:hover {
  background-color: #293d3a;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
}


@media (max-width: 390px) {
  .import-button {
    right: 10px;
    bottom: 20px;
    width: 52px;
    height: 52px;
  }
}

@media (max-width: 390px) {
  .custom-toolbar {
    width: 60%;
  }
}


</style>
