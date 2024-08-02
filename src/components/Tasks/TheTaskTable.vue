<template>
  <div class="table-container">
    <v-card flat>
      <v-card-title>
        Tasks
        <v-btn
          class="show-hide"
          v-if="hasTasks"
          @click="toggleDescriptionContent"
        >
          {{ showDescriptionContent ? 'Hide' : 'Show' }} Description Content
        </v-btn>
      </v-card-title>
      <template v-slot:text>
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        ></v-text-field>
      </template>
      <v-data-table
        :headers="headers"
        :items="filteredItems"
        :search="search"
      >
        <template v-slot:item="{ item, index }">
          <tr>
            <td>{{ item?.name || 'N/A' }}</td>
            <td>
              {{ showDescriptionContent
                ? truncatedDescription(item?.description || '')
                : ''
              }}
            </td>
            <td>{{ item?.date || 'N/A' }}</td>
            <td>{{ item?.category || 'N/A' }}</td>
            <td>
              <v-chip :color="getColor(item?.criticality || '')">
                {{ item?.criticality || 'N/A' }}
              </v-chip>
            </td>
            <td class="actions-cell">
              <v-icon class="me-2" size="small" @click="editItem(index)">
                mdi-pencil
              </v-icon>
              <v-icon @click="openDeleteDialog(index)" class="delete-icon">
                mdi-delete
              </v-icon>
              <v-icon @click="duplicateTask(index)" class="duplicate-icon">
                mdi-content-copy
              </v-icon>
              <v-icon
                @click="toggleImportant(index)"
                :class="{ 'important-icon': item?.important }"
              >
                {{ item?.important ? 'mdi-star' : 'mdi-star-outline' }}
              </v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDeleteDialog">Cancel</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="confirmDelete">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTodoListStore } from '@/stores/useTodoListStore';
import { useRouter } from 'vue-router';

// Reactive variables
const dialogDelete = ref(false);
const deleteIndex = ref(null);
const search = ref('');
const router = useRouter();
const showDescriptionContent = ref(false);

// Non-reactive variable
const headers = [
  { align: 'start', key: 'name', sortable: false, title: 'Name' },
  { key: 'description', title: 'Description' },
  { key: 'date', title: 'Date' },
  { key: 'category', title: 'Category' },
  { key: 'criticality', title: 'Criticality' },
  { key: 'actions', title: 'Actions' },
];

// Access the store
const todoStore = useTodoListStore();

// Computed properties
const filteredItems = computed(() => {
  const items = todoStore.todoList;
  if (search.value) {
    return items.filter(item =>
      item?.name?.includes(search.value) ||
      (showDescriptionContent.value && item?.description?.includes(search.value)) ||
      item?.date?.includes(search.value) ||
      item?.category?.includes(search.value) ||
      item?.criticality?.includes(search.value)
    );
  }
  return items.sort((a, b) => (b.important ? 1 : 0) - (a.important ? 1 : 0));
});

const hasTasks = computed(() => todoStore.todoList.length > 0);

// Methods
function getColor(criticality) {
  switch (criticality.toLowerCase()) {
    case 'low':
      return 'green';
    case 'medium':
      return 'orange';
    case 'high':
      return 'red';
    default:
      return 'grey';
  }
}

function toggleDescriptionContent() {
  showDescriptionContent.value = !showDescriptionContent.value;
}

function truncatedDescription(description) {
  return description.length > 20 ? description.substring(0, 20) + '...' : description;
}

function toggleImportant(index) {
  if (index < 0 || index >= todoStore.todoList.length) {
    console.error('Invalid index:', index);
    return;
  }
  const item = todoStore.todoList[index];
  if (!item) {
    console.error('Task item is undefined at index:', index);
    return;
  }
  item.important = !item.important;
  todoStore.todoList = [...todoStore.todoList];
}

function duplicateTask(index) {
  if (index < 0 || index >= todoStore.todoList.length) {
    console.error('Invalid index for duplication:', index);
    return;
  }
  todoStore.duplicateTask(index);
}

function openDeleteDialog(index) {
  deleteIndex.value = index;
  dialogDelete.value = true;
}

function confirmDelete() {
  if (deleteIndex.value !== null) {
    todoStore.deleteTask(deleteIndex.value);
    deleteIndex.value = null;
    todoStore.clearEditTaskIndex(); // Clear the edit index after deletion
  }
  closeDeleteDialog();
}

function closeDeleteDialog() {
  dialogDelete.value = false;
  deleteIndex.value = null;
}

function editItem(index) {
  todoStore.setEditTaskIndex(index); 
  router.push('/import');
}

</script>

<style>
.v-card {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.233);
  overflow: hidden;
}

.v-data-table {
  border-radius: 8px;
  overflow: hidden;
}

.table-container {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  max-width: 1200px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.233);
}


.v-btn {
  border-radius: 20px;
  transition: background-color 0.3s, color 0.3s;
}

.v-btn:hover {
  background-color: #0056b3;
  color: #ffffff;
}

.show-hide {
  background-color: #278b769c;
  color: #ffffff;
  border-radius: 20px;
}

.show-hide:hover {
  background-color: #16725ed0;
}

.v-icon {
  transition: color 0.3s;
}

.v-icon:hover {
  color: #007bff;
}

.actions-cell .v-icon {
  margin-right: 8px;
}

.actions-cell .v-icon:last-child {
  margin-right: 0;
}

td {
  text-align: center;
}
</style>
