<template>
  <div class="table-wrapper">
    <div class="table-container">
      <BaseDataTable
        :headers="headers"
        :items="categories"
        :showName="true"
        :showDescription="false"
        :showDate="false"
        :showCategory="false"
        :showDuplicate="false"
        :showToggleImportant="false"
        :truncatedDescription="truncatedDescription"
        @edit="editItem"
        @delete="openDeleteDialog"
      />
    </div>

    <v-dialog
      v-model="dialogDelete"
      max-width="500px"
    >
      <v-card>
        <v-card-title class="text-h5">
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="closeDeleteDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="confirmDelete"
          >
            OK
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useRouter } from 'vue-router';
import BaseDataTable from '../Base/BaseDataTable.vue';

const router = useRouter();
const categoryStore = useCategoryStore();
const categories = computed(() => categoryStore.categories);

const dialogDelete = ref(false);
const deleteIndex = ref(null);

const headers = [
  { key: 'name', align: 'start', title: 'Name' },
  { key: 'actions', title: 'Actions', sortable: false },
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
</style>
