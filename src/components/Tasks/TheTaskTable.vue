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
              <v-icon class="me-2" size="small" @click="editItem(item, index)">
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
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Edit Task</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="4" sm="6">
                <v-text-field v-model="editedItem.name" label="Task name"></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field v-model="editedItem.date" label="Date"></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field v-model="editedItem.category" label="Category"></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field v-model="editedItem.criticality" label="Criticality"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="close">Cancel</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

// Reactive variables
const dialogDelete = ref(false);
const deleteIndex = ref(null);
const dialog = ref(false);
const editedIndex = ref(-1);
const editedItem = ref({
  name: '',
  description: '',
  date: '',
  category: '',
  criticality: '',
  important: false,
});
const search = ref('');
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
  }
  closeDeleteDialog();
}

function closeDeleteDialog() {
  dialogDelete.value = false;
  deleteIndex.value = null;
}

function editItem(item, index) {
  editedIndex.value = index;
  editedItem.value = { ...item };
  dialog.value = true;
}

function close() {
  dialog.value = false;
  editedItem.value = {
    name: '',
    description: '',
    date: '',
    category: '',
    criticality: '',
    important: false,
  };
  editedIndex.value = -1;
}

function save() {
  if (editedIndex.value > -1) {
    todoStore.updateTask(editedIndex.value, editedItem.value);
  }
  close();
}
</script>

<style>
.v-card, .v-data-table {
  background-color: #cde8e4b9;
}

.table-container {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
}

.show-hide {
  background-color: #deb9eee7;
  display: flex;
  justify-content: center;
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
