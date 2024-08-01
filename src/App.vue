<template>
  
  <h1 class="title">TODOS</h1> 
  <tabs-item></tabs-item>
  <main>
    <router-view></router-view>
  </main>
</template>


<script setup>
import TabsItem from './components/Tabs/TabsItem.vue';
</script>



<style scoped>
.title {
  font-size: 5rem; 
  color: #65bbae; 
  text-align: center;
  width: 100%;
  font-weight: bold; 
  font-family: Arial, sans-serif; 
}
</style> 