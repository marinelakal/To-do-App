<template>
    <div class="table-wrapper">
      <div class="table-container">
        <BaseDataTable
          :headers="headers"
          :items="assigneesStore.assignees"
          :icons="['edit', 'delete']"
          v-model:currentPage="assigneesStore.currentPage"
          v-model:itemsPerPage="assigneesStore.itemsPerPage"
          @edit="editItem"
          @delete="openDeleteDialog"
        />
      </div>

      <BaseDeleteConfirmationDialog
        v-model="dialogDelete"
        @confirmDelete="confirmDelete"
      />
    </div>
  </template>


<script setup>
import BaseDataTable from '../Base/BaseDataTable.vue';
import BaseDeleteConfirmationDialog from '../Base/BaseDeleteConfirmationDialog.vue';
import { useAssigneesStore } from '@/stores/useAssigneesStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const headers = [
  { key: 'firstname', align: 'start', visible: true, showContent: true , title: 'First Name' , type: 'text'},
  { key: 'lastname', align: 'start', visible: true, showContent: true , title: 'Last Name' , type: 'text'},
  { key: 'email', align: 'start', visible: true, showContent: true , title: 'Email' , type: 'text'},
  { key: 'phone', align: 'start', visible: true, showContent: true , title: 'Phone Number' , type: 'text'},
  { key: 'actions', visible: false, showContent: true , title: 'Actions', sortable: false , type: 'action' },
];

// Reactive variables
const dialogDelete = ref(false);
const deleteIndex = ref(null);

const router = useRouter();

// Access the store
const assigneesStore = useAssigneesStore(); 

//Methods 

function openDeleteDialog(index) {
  deleteIndex.value = index;
  dialogDelete.value = true;
}

function confirmDelete() {
  if (deleteIndex.value !== null) {
    assigneesStore.deleteAssignee(deleteIndex.value);
    deleteIndex.value = null;
    assigneesStore.clearEditAssigneeIndex(); // Clear the edit index after deletion
  }
  closeDeleteDialog();
}

function closeDeleteDialog() {
  dialogDelete.value = false;
  deleteIndex.value = null;
}

function editItem(index) {
  assigneesStore.setEditAssigneeIndex(index); 
  router.push('/make');
}

</script>

<style scoped>
.table-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #ffffff;
}

.v-data-table {
  border-radius: 8px;
  overflow: hidden;
}

.table-container {
  width: 100%;
  max-width: 800px;
  max-height: none;
  overflow-y: hidden;
  overflow-x: hidden;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.233);
}
</style>