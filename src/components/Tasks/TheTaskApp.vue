<template>
    <the-task-form @submit-form="handleSubmit"></the-task-form>
    <the-task-table ></the-task-table>
</template>


<script setup>
import TheTaskForm from './TheTaskForm.vue';
import TheTaskTable from './TheTaskTable.vue';
import { useTodoListStore } from '@/stores/useTodoListStore';

// Access the store
const todoStore = useTodoListStore();

// Methods
function handleSubmit(submission) {
  console.log('New submission:', submission);
  todoStore.addTodo(submission);
}
</script>

