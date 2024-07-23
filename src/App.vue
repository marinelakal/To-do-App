<template>
  <h1 class="title">TODOS</h1>
  <tabs-item></tabs-item>
  <!--<the-task-form></the-task-form>-->
  <!--<the-task-table></the-task-table>-->
  <main>
    <router-view></router-view>
  </main>
</template>


<script>
    import TabsItem from './components/TabsItem.vue'
    //import TheTaskForm from './components/Tasks/TheTaskForm.vue';
    //import TheTaskTable from './components/Tasks/TheTaskTable.vue';
    export default {
        components: {
            TabsItem,
            //TheTaskForm,
            //TheTaskTable
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