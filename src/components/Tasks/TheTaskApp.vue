<template>
    <the-task-form @submit-form="handleSubmit"></the-task-form>
    <the-task-table :new-items="submissions"></the-task-table>
</template>


<script>
    import TheTaskForm from './TheTaskForm.vue'
    import TheTaskTable from './TheTaskTable.vue';
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
            this.submissions.push(submission);
        }
    }
    
}
</script>

