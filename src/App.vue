<template>
  <h1 class="title">TODOS</h1>
  <the-task-form></the-task-form>
</template>

<script>
    import TheTaskForm from './components/TheTaskForm.vue';

    export default {
        components: {
            TheTaskForm
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