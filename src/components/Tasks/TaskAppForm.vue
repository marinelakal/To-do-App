<template>
  <div class="todo-form-subtext">What needs to be done?</div>
  <BaseForm
    :width="300"
    submitButtonLabel="Submit"
    cancelButtonLabel="Cancel"
    submitButtonColor="#004080"
    cancelButtonColor="#D3D3D3"
    @submit="submit"
    @cancel="handleCancel"
  >
    <template #content>
      <BaseTextField
        v-model="name"
        label="Title"
        :rules="nameRules"
      ></BaseTextField>

      <BaseTextArea
        v-model="description"
        label="Description"
        :rules="descriptionRules"
      ></BaseTextArea>

      <BaseDateInput
        v-model="date"
        :min="minDate"
        label="Deadline"
        variant="solo"
      ></BaseDateInput>

      <BaseSelect
        v-model="assigneeSelect"
        label="Select Assignee"
        :rules="selectAssigneeRules"
        :items="assigneeNames"
      ></BaseSelect>

      <BaseSelect
        v-model="categorySelect"
        label="Select Category"
        :rules="selectRules"
        :items="categoryNames"
      ></BaseSelect>

      <v-container>
        <v-radio-group v-model="radios">
          <v-radio
            label="Low"
            value="one"
            color="green"
          ></v-radio>
          <v-radio
            label="Medium"
            value="two"
            color="orange"
          ></v-radio>
          <v-radio
            label="High"
            value="three"
            color="red"
          ></v-radio>
        </v-radio-group>
      </v-container>
    </template>
  </BaseForm>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useTodoListStore } from '@/stores/useTodoListStore';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useRouter } from 'vue-router';
import BaseTextField from '@/components/Base/BaseTextField.vue';
import BaseTextArea from '../Base/BaseTextArea.vue';
import BaseSelect from '../Base/BaseSelect.vue';
import BaseDateInput from '../Base/BaseDateInput.vue';
import BaseForm from '../Base/BaseForm.vue';
import { useAssigneesStore } from '@/stores/useAssigneesStore';

// Reactive variables
const valid = ref(false);
const name = ref('');
const description = ref('');
const radios = ref('one');
const date = ref(null);
const minDate = ref(new Date().toISOString().split('T')[0]);

// Non-reactive variables
const nameRules = [
  value => (value ? true : 'Name is required.')
];

const descriptionRules = [
  value => (value ? true : 'Description is required.')
];

const selectRules = [
  value => (value && value !== 'Uncategorized' ? true : 'Category is required.')
];

const selectAssigneeRules = [
  value => (value && value !== 'No assignee' ? true : 'Assignee is required.')
];

const criticalityMap = {
  one: 'Low',
  two: 'Medium',
  three: 'High'
};

const criticality = computed(() => criticalityMap[radios.value]);

const defaultCategory = 'Uncategorized';
const defaultAssignee = 'No assignee';

// Access the stores
const todoStore = useTodoListStore();
const categoryStore = useCategoryStore();
const assigneesStore = useAssigneesStore(); 

// Access the router instance
const router = useRouter();

// Computed properties
const categoryNames = computed(() =>
  categoryStore.categories.map(category => category.name)
);

const assigneeNames = computed(() =>
  assigneesStore.assignees.map(assignee => assignee.firstname)
);

// Refs
const form = ref(null);
const assigneeSelect = ref('');
const categorySelect = ref('');

watch(
  () => todoStore.editTaskIndex,
  (newIndex) => {
    if (newIndex !== null && todoStore.todoList[newIndex]) {
      const task = todoStore.todoList[newIndex];
      name.value = task.name;
      description.value = task.description;
      radios.value = Object.keys(criticalityMap).find(key => criticalityMap[key] === task.criticality);
      assigneeSelect.value = task.assignee;
      categorySelect.value = task.category;
      // Convert stored date string back to Date object, treating it as local
      date.value = task.date ? new Date(`${task.date}T00:00:00`) : null;
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

// Methods
function resetForm() {
  if (form.value) form.value.resetValidation();
  name.value = '';
  description.value = '';
  radios.value = 'one';
  assigneeSelect.value = defaultAssignee;
  categorySelect.value = defaultCategory; 
  date.value = null;
  valid.value = false;
  todoStore.clearEditTaskIndex();
}

function handleCancel() {
  resetForm();
  router.push('/tasks');
}

function submit() {
    // Ensure the date is treated as a local date and format it as YYYY-MM-DD
    const formattedDate = date.value
      ? `${date.value.getFullYear()}-${String(date.value.getMonth() + 1).padStart(2, '0')}-${String(date.value.getDate()).padStart(2, '0')}`
      : '';

    const submission = {
      name: name.value,
      description: description.value,
      date: formattedDate,
      assignee: assigneeSelect.value,
      category: categorySelect.value,
      criticality: criticality.value,
      important: false
    };

    if (todoStore.editTaskIndex !== null && todoStore.todoList[todoStore.editTaskIndex]) {
      // Update existing task
      todoStore.updateTask(todoStore.editTaskIndex, submission);
    } else {
      // Add new task
      todoStore.addTodo(submission);
    }

    resetForm();
    router.push('/tasks');
}
</script>

<style>
.todo-form-subtext {
  font-size: 1.5rem;
  color: #7e7d7d;
  text-align: center;
  margin-bottom: 40px;
  margin-top: 100px;
  font-family: Arial, sans-serif;
}

.button-container {
  display: flex;
  justify-content: space-around;
  color: white ; 
}

.todo-form-submit-btn {
  background-color: #004080;
}

.todo-form-clear-btn {
  background-color: #87ceeb;
}

.todo-form-submit-btn:hover, 
.todo-form-clear-btn:hover {
  opacity: 0.9;
}

.todo-form-disabled-button {
  background-color: #b0b0b0;
}
</style>
