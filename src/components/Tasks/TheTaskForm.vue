<template>
  <div class="subtext">What needs to be done?</div>
  <v-sheet class="mx-auto" width="300">
    <v-form fast-fail v-model="valid" @submit.prevent="submit" ref="form">
      <v-text-field
        v-model="name"
        label="Name"
        :rules="nameRules"
        required
      ></v-text-field>

      <v-textarea
        v-model="description"
        label="Description"
        :rules="descriptionRules"
        required
      ></v-textarea>

      <v-date-input
        v-model="date"
        :min="minDate"
        label="Select a date"
        variant="solo"
      ></v-date-input>

      <v-select
        v-model="select"
        label="Select Category"
        :rules="selectRules"
        required
        :items="categoryNames"
      ></v-select>

      <v-container>
        <v-radio-group v-model="radios">
          <v-radio label="Low" value="one" color="green"></v-radio>
          <v-radio label="Medium" value="two" color="orange"></v-radio>
          <v-radio label="High" value="three" color="red"></v-radio>
        </v-radio-group>
      </v-container>

      <div class="button-container">
        <v-btn class="me-4" type="submit" :disabled="!valid">submit</v-btn>
        <v-btn @click="reset">clear</v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useTodoListStore } from '@/stores/useTodoListStore';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useRouter } from 'vue-router';

// Reactive variables
const valid = ref(false);
const name = ref('');
const description = ref('');
const radios = ref('one');
const select = ref('');
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
  value => (value ? true : 'Category is required.')
];

const criticalityMap = {
  one: 'Low',
  two: 'Medium',
  three: 'High'
};

// Access the stores
const todoStore = useTodoListStore();
const categoryStore = useCategoryStore();

// Access the router instance
const router = useRouter();

// Computed properties
const categoryNames = computed(() =>
  categoryStore.categories.map(category => category.name)
);

// Refs
const form = ref(null);

watch(
  () => todoStore.editTaskIndex,
  (newIndex) => {
    if (newIndex !== null && todoStore.todoList[newIndex]) {
      const task = todoStore.todoList[newIndex];
      name.value = task.name;
      description.value = task.description;
      radios.value = Object.keys(criticalityMap).find(key => criticalityMap[key] === task.criticality);
      select.value = task.category;
      // Convert stored date string back to Date object, treating it as local
      date.value = task.date ? new Date(`${task.date}T00:00:00`) : null;
    } else {
      reset();
    }
  },
  { immediate: true }
);

// Methods
function reset() {
  if (form.value) form.value.reset();
  radios.value = 'one';
  valid.value = false;
  date.value = null;
}

function submit() {
  if (form.value && form.value.validate()) {
    // Ensure the date is treated as a local date and format it as YYYY-MM-DD
    const formattedDate = date.value
      ? `${date.value.getFullYear()}-${String(date.value.getMonth() + 1).padStart(2, '0')}-${String(date.value.getDate()).padStart(2, '0')}`
      : '';

    const submission = {
      name: name.value,
      description: description.value,
      date: formattedDate,
      category: select.value,
      criticality: criticalityMap[radios.value],
      important: false
    };

    if (todoStore.editTaskIndex !== null && todoStore.todoList[todoStore.editTaskIndex]) {
      // Update existing task
      todoStore.updateTask(todoStore.editTaskIndex, submission);
    } else {
      // Add new task
      todoStore.addTodo(submission);
    }

    reset();
    todoStore.clearEditTaskIndex(); // Clear the edit index after submission
    router.push('/tasks');
  }
}
</script>

<style>
.subtext {
  font-size: 1.5rem;
  color: #7e7d7d;
  text-align: center;
  margin-bottom: 40px;
  margin-top: 20px;
  font-family: Arial, sans-serif;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}
</style>
