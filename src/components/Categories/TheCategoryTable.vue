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
        <!--<button @click="del(index)">X</button>-->
        <td>
          <v-icon
            @click="del(index)"
            class="delete-icon"
          >
            mdi-delete
          </v-icon>
        </td>
        
      </tr>
    </tbody>

  </v-table>
</template>

<script>
  import { useCategoryStore } from '@/stores/useCategoryStore';
  import { mdiDelete } from '@mdi/js';
  export default {
    data() {
    return {
      mdiDelete
    };
  },
    computed: {
      categories() {
        const categoryStore = useCategoryStore();
        return categoryStore.categories;
      },
  },
  methods: {
    del(index) {
      const categoryStore = useCategoryStore();
      categoryStore.deleteCategory(index);
    }
  }
  }
</script>


<style scoped>
.v-table {
        margin-top: 20px;
        display: flex;
        justify-content:center; 
    }

.delete-icon {
cursor: pointer;
color: red; /* Optional: Change the color of the delete icon */
}


</style>