<template>
    <v-table height="300px">
    <thead>
      <tr>
        
        
      </tr>
    </thead>
    
    <tbody>
      <tr
        v-for="item in categories"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        
      </tr>
    </tbody>

  </v-table>
</template>

<script>
  import { useCategoryStore } from '@/stores/useCategoryStore';
  export default {
    computed: {
      categories() {
        const categoryStore = useCategoryStore();
        return categoryStore.categories;
      },
  },
  }
</script>


<style scoped>
.v-table {
        margin-top: 20px;
        display: flex;
        justify-content:center; 
    }




</style>