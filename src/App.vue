<template>
  
  <h1 class="title">TODOS</h1> 
  <tabs-item></tabs-item>
  <main>
    <router-view></router-view>
  </main>
</template>


<script>
    import TabsItem from './components/Tabs/TabsItem.vue'
    export default {
        components: {
            TabsItem,
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