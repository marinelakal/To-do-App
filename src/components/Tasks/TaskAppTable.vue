<template>
  <div class="table-container">
    
    <BaseCard>
      <template #title>
        <span>Tasks</span>
        <BaseButton
            v-if="hasTasks"
            labelColor="white"
            @click="toggleDescriptionContent"
            :label="descriptionButtonLabel"
            color="secondary"
            class="table-container-show-hide"
        />
      </template>
      <template #content>
        <BaseTextField
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        ></BaseTextField>

        <BaseDataTable
          :headers="headers"
          :items="filteredItems"
          :search="search"
          :showDescriptionContent="showDescriptionContent"
          :truncatedDescription="truncatedDescription"
          :truncatedName="truncatedName"
          :getColor="getColor"
          :icons="['edit', 'delete', 'duplicate', 'toggleImportant']"
          v-model:currentPage="todoStore.currentPage"
          v-model:itemsPerPage="todoStore.itemsPerPage"
          @edit="editItem"
          @delete="openDeleteDialog"
          @duplicate="duplicateTask"
          @toggleimportant="toggleImportant"
      />
      </template>
    </BaseCard>

    <BaseDeleteConfirmationDialog
      v-model="dialogDelete"
      @confirmDelete="confirmDelete"
    />
    
  </div>
</template>

<script setup>
import { ref, computed , onMounted , onBeforeUnmount } from 'vue';
import { useTodoListStore } from '@/stores/useTodoListStore';
import { useRouter } from 'vue-router';
import BaseTextField from '@/components/Base/BaseTextField.vue';
import BaseDataTable from '../Base/BaseDataTable.vue';
import BaseDeleteConfirmationDialog from '../Base/BaseDeleteConfirmationDialog.vue';
import BaseCard from '../Base/BaseCard.vue';
import BaseButton from '../Base/BaseButton.vue'
import { useAssigneesStore } from '@/stores/useAssigneesStore';


// Reactive variables
const dialogDelete = ref(false);
const deleteIndex = ref(null);
const search = ref('');
const router = useRouter();
const showDescriptionContent = ref(false);

// Non-reactive variable
const headers = [
  { align: 'start', key: 'name', visible: true, showContent: true , sortable: false, title: 'Title' , type: 'text' },
  { key: 'description', visible: true, showContent: true , title: 'Description' , type: 'text'},
  { key: 'date', visible: true, showContent: true , title: 'Deadline' , type: 'date' },
  { key: 'assignee', visible: true, showContent: true , title: 'Assignee' , type: 'text' },
  { key: 'category', visible: true, showContent: true , title: 'Category' , type: 'text' },
  { key: 'criticality', visible: false, showContent: true , title: 'Criticality' , type: 'number'},
  { key: 'actions', visible: false, showContent: true , title: 'Actions' ,type: 'action' },
];

// Access the store
const todoStore = useTodoListStore();
const assigneesStore = useAssigneesStore(); 

// Computed properties

const screenWidth = ref(window.innerWidth);


const descriptionButtonLabel = computed(() => {

  if (screenWidth.value <= 600) {
    return showDescriptionContent.value ? 'Hide' : 'Show';
  }

  return showDescriptionContent.value ? 'Hide Description Content' : 'Show Description Content';
});


const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};


onMounted(() => {
  window.addEventListener('resize', updateScreenWidth);
});


onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenWidth);
});

const filteredItems = computed(() => {
  const items = todoStore.todoList.map(item => ({
    ...item,
    assignee: getAssigneeName(item.assigneeId),
  }));
  if (search.value) {
    return items.filter(item =>
      item?.name?.includes(search.value) ||
      (showDescriptionContent.value && item?.description?.includes(search.value)) ||
      item?.date?.includes(search.value) ||
      item?.assignee?.includes(search.value) ||
      item?.category?.includes(search.value) ||
      item?.criticality?.includes(search.value)
    );
  }
  return items.sort((a, b) => (b.important ? 1 : 0) - (a.important ? 1 : 0));
});

const hasTasks = computed(() => todoStore.todoList.length > 0);

// Methods

function getAssigneeName(assigneeId) {
  const assignee = assigneesStore.assignees.find(a => a.id === assigneeId);
  return assignee ? assignee.firstname : 'N/A';
}

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

function truncatedName(name) {
  return name.length > 70 ? name.substring(0, 70) + '...' : name;
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
  width: 100%;
}

.v-data-table {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.table-container {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.233);
  width: 70%;
}

.table-container-show-hide{
  display: flex;
}

.v-btn {
  border-radius: 20px;
  transition: background-color 0.3s, color 0.3s;
}

.v-btn:hover {
  background-color: #0056b3;
  color: #ffffff;
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

.table-container-icon {
  transition: color 0.3s;
}

.table-container-icon:hover {
  color: #007bff;
}

.table-container-actions-cell .table-container-icon {
  margin-right: 8px;
}

.table-container-actions-cell .table-container-icon:last-child {
  margin-right: 0;
}

.table-container td {
  text-align: center;
  white-space: nowrap;
}
</style>
