<template>
  <div class="table-wrapper">
    <div class="table-container">
      <BaseDataTable
        :headers="headers"
        :items="categoryStore.categories"
        :icons="['edit', 'delete']"
        :truncatedName="truncatedName"
        v-model:currentPage="categoryStore.currentPage" 
        v-model:itemsPerPage="categoryStore.itemsPerPage"
        @edit="editItem"
        @delete="openDeleteDialog"
      />
    </div>
    
    <BaseDeleteConfirmationDialog
      v-model="dialogDelete"
      @confirmDelete="confirmDelete"
    />
  </div>

  <v-btn
      @click="snackbar = true"
      class="info-btn"
    >
      Info
    </v-btn>
    <v-snackbar
      v-model="snackbar"
      class="snackbar"
    >
      {{ text }}

      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

</template>

<script setup>
import { ref } from 'vue';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useRouter } from 'vue-router';
import BaseDataTable from '../Base/BaseDataTable.vue';
import BaseDeleteConfirmationDialog from '../Base/BaseDeleteConfirmationDialog.vue';

const snackbar = ref(false)
const text = ref(`Hello, here you can add categories to categorise your todos.`)

const router = useRouter();
const categoryStore = useCategoryStore();


const dialogDelete = ref(false);
const deleteIndex = ref(null);

const headers = [
  { key: 'name', align: 'start', visible: true, showContent: true , title: 'Name' , type: 'text'},
  { key: 'actions', visible: false, showContent: true , title: 'Actions', sortable: false , type: 'action' },
];

function openDeleteDialog(index) {
  deleteIndex.value = index;
  dialogDelete.value = true;
}

function confirmDelete() {
  if (deleteIndex.value !== null) {
    categoryStore.deleteCategory(deleteIndex.value);
    deleteIndex.value = null;
  }
  closeDeleteDialog();
}

function closeDeleteDialog() {
  dialogDelete.value = false;
  deleteIndex.value = null;
}

function editItem(index) {
  categoryStore.setEditCategoryIndex(index);
  router.push('/create');
}

function truncatedName(name) {
  return name.length > 20 ? name.substring(0, 20) + '...' : name;
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

.category-table {
  width: 100%;
}

.icon-container {
  display: flex;
  justify-content: left;
  gap: 10px;
}

.table-header {
  padding: 10px;
  text-align: left;
}

.delete-icon {
  cursor: pointer;
}

.table-container td {
  padding: 10px;
  text-align: left;
}

.info-btn {
  border-radius: 20px;
  transition: background-color 0.3s, color 0.3s;
  top: 0;
  right: 0;
  position: fixed;
  margin: 16px;
  width: 300px;
  z-index: 9999;
}

.info-btn:hover {
  background-color: #0056b3;
  color: #ffffff;
}
</style>
