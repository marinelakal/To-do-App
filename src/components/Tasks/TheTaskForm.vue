
<template>
    <div class="subtext">
        What needs to be done?
    </div>
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
            prepend-icon=""

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
        <v-btn
        class="me-4"
        type="submit"
        :disabled="!valid"
        >
        submit
        </v-btn>

        <v-btn @click="reset">
        clear
        </v-btn>
    </div>
      </v-form>
    </v-sheet>


</template>

<script setup>
import { ref, computed } from 'vue';
import { useTodoListStore } from '@/stores/useTodoListStore';
import { useCategoryStore } from '@/stores/useCategoryStore';

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

// Computed properties
const categoryNames = computed(() => {
  return categoryStore.categories.map(category => category.name);
});

//refs
const form = ref(null);

//Methods
function reset() {
  if (form.value) form.value.reset();
  radios.value = 'one';
  valid.value = false;
}

function submit() {
  if (form.value && form.value.validate()) {
    const formattedDate = date.value ? new Date(date.value).toLocaleDateString() : '';
    const submission = {
      name: name.value,
      description: description.value,
      date: formattedDate,
      category: select.value,
      criticality: criticalityMap[radios.value],
      important: false
    };

    console.log('Form submission:', submission);
    todoStore.addTodo(submission);
    console.log('Current todo list:', todoStore.todoList);
    reset();
  }
}
</script>


<style>
  .subtext {
    font-size: 1.5rem; 
    color: #999999; 
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
