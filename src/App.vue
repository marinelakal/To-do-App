<template>
  <h1 class="title">TODOS</h1>
  <the-task-form></the-task-form>
  <the-task-table></the-task-table>
</template>

<script>
    import TheTaskForm from './components/TheTaskForm.vue';
    import TheTaskTable from './components/TheTaskTable.vue';
    export default {
        components: {
            TheTaskForm,
            TheTaskTable
        }
    }
</script>



<style scoped>
.title {
  font-size: 5rem; 
  color: #cde8e4; 
  text-align: center;
  width: 100%;
  font-weight: bold; 
  font-family: Arial, sans-serif; 
}
</style>