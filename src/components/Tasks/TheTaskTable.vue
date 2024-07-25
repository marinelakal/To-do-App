

<template>
  <div class="table-container">
    <v-card flat>
      <v-card-title>
        Tasks
      </v-card-title>
      <template v-slot:text>
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        ></v-text-field>
      </template>
      <v-data-table
        :headers="headers"
        :items="filteredItems"
        :search="search"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.criticality }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { useTodoListStore } from '@/stores/useTodoListStore';
export default {
  props: {
    newItems: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      search: '',
      headers: [
          {
            align: 'start',
            key: 'name',
            sortable: false,
            title: 'Name',
          },
          { key: 'description', title: 'Description' },
          { key: 'date', title: 'Date' },
          { key: 'category', title: 'Category' },
          { key: 'criticality', title: 'Criticality' },
          
        ],
    };
  },
  computed: {
    todoStore() {
      return useTodoListStore();
    },
    filteredItems() {
      const items = this.todoStore.todoList;
      if (this.search) {
        return items.filter(item => 
          item.name.includes(this.search) ||
          item.description.includes(this.search) ||
          item.date.includes(this.search) ||
          item.category.includes(this.search) ||
          item.criticality.includes(this.search)
        );
      }
      return items;
    }
  }
};
</script>

<style>
.v-card, .v-data-table {
  background-color: #cde8e4b9;
}
.table-container {
  margin-top: 20px;
  display: flex;
  justify-content: center; 
}
</style>
