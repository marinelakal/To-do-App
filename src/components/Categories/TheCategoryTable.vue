<template>
  <div class="table-wrapper">
    <v-table class="category-table" height="300px">
      <thead>
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in categories" :key="item.name">
          <td class="names">{{ item.name }}</td>
          <td>
            <div class="icon-container">
              <v-icon
                class="me-2"
                size="small"
                @click="editItem(item, index)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                @click="openDeleteDialog(index)"
                class="delete-icon"
              >
                mdi-delete
              </v-icon>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDeleteDialog">
            Cancel
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="confirmDelete">
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

const categoryStore = useCategoryStore();
const categories = computed(() => categoryStore.categories);

const dialogDelete = ref(false);
const deleteIndex = ref(null);

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

function editItem(item, index) {
  categoryStore.setEditItem({ item, index });
}
</script>

<style scoped>
.table-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5; 
  margin-top: 20px;
}

.category-table {
  max-width: 600px;
  width: 100%;
  margin: auto;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.icon-container {
  display: flex;
  justify-content: left;
  gap: 10px;
}

.names {
  display: flex;
  justify-content: left;
  margin-top: 10px;
}

td, th {
  padding: 0;
  margin: 0;
}

.v-table {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.delete-icon {
  cursor: pointer;
}
</style>
