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

    <BaseButton
      v-if="showImportButton"
      @click="navigateTo('/tasks')"
      icon="mdi-grid-large"
      color="#4CAF50"
      class="table-button"
    />

    <BaseButton
      v-if="showImportButton"
      @click="navigateTo('/calendar')"
      icon="mdi-calendar"
      color="#F4BB44"
      class="calendar-button"
    />

    <BaseButton
      v-if="showDemoButton"
      @click="importDemoData"
      label="Import Demo Data"
      class="demo-data-button"
    />

    <router-view />
  </v-container>
</template>

<script setup>
import { useTodoListStore } from '@/stores/useTodoListStore';
import { useAssigneesStore } from '@/stores/useAssigneesStore';
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';
import BaseButton from '../Base/BaseButton.vue';
import BaseModal from '../Base/BaseModal.vue';
import { demoTasks, demoAssignees } from '@/config.js';

const router = useRouter();
const route = useRoute();
const todoListStore = useTodoListStore();
const assigneesStore = useAssigneesStore();

// Determine if the Import New Task button should be shown
const showImportButton = computed(() => {
  return ['/tasks', '/calendar'].includes(route.path);
});

const showDemoButton = computed(() => {
  return ['/tasks'].includes(route.path);
});

// Function to navigate to the Task Form page
function navigateToForm() {
  router.push('/import');
}

function navigateTo(path) {
  router.push(path);
}

function importDemoData() {
  demoTasks.forEach(task => {
    todoListStore.addTodo(task);
  });

  demoAssignees.forEach(assignee => {
    assigneesStore.addAssignee(assignee);
  });
}
</script>

<style scoped>
.import-button,
.calendar-button,
.table-button {
  position: fixed;
  right: 16px;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  min-width: 56px;
  padding: 0;
}

.import-button {
  bottom: 20px;
  border: 1px solid #1b3d1d;
}

.table-button{
  bottom: 100px;
  border: 1px solid #1b3d1d;
}

.calendar-button {
  bottom: 180px;
  border: 1px solid #bb6044;
}

.demo-data-button {
  background-color: transparent !important;
  position: absolute;
  top: 16px;
  right: 50%;
  transform: translateX(50%);
  border: 1px solid #1565C0;
  width: 200px;
  height: 50px;
  border-radius: 20px;
  padding: 0 16px;
  z-index: 999;
}

.table-button:hover,
.calendar-button:hover,
.import-button:hover {
  background-color: rgba(192, 192, 192, 0.5) !important;
}


@media (max-width: 390px) {
  .import-button {
    right: 10px;
    bottom: 20px;
    width: 52px;
    height: 52px;
  }

  .table-button {
    right: 10px;
    bottom: 110px;
    width: 52px;
    height: 52px;
  }

  .calendar-button {
    right: 10px;
    bottom: 180px;
    width: 52px;
    height: 52px;
  }
}


</style>
