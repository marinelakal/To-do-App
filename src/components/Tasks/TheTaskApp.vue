<template>
    <the-task-form></the-task-form>
    <the-task-table></the-task-table>
</template>


<script>
    import TheTaskForm from './TheTaskForm.vue'
    import TheTaskTable from './TheTaskTable.vue';
    export default {
    components: { TheTaskForm , TheTaskTable}
    
    }
</script>

