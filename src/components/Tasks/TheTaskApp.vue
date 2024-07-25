<template>
    <the-task-form @submit-form="handleSubmit"></the-task-form>
    <the-task-table ></the-task-table>
</template>


<script>
    import TheTaskForm from './TheTaskForm.vue'
    import TheTaskTable from './TheTaskTable.vue';
    import { useTodoListStore } from '@/stores/useTodoListStore';
    export default {
    components: { TheTaskForm , TheTaskTable} , 
    data() {
        return {
            submissions: []
        };
    },
    methods: {
        handleSubmit(submission) {
            console.log('New submission:', submission);
            const todoStore = useTodoListStore();
            todoStore.addTodo(submission); // Directly add to Pinia store
        }
    }
    
}
</script>

