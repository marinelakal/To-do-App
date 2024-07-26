<template>
  <div class="table-container">
    <v-card flat>
      <v-card-title>
        Tasks
        <v-btn class="show-hide" @click="toggleDescriptionContent">
          {{ showDescriptionContent ? 'Hide' : 'Show' }} Description Content
        </v-btn>
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
        <template v-slot:item="{ item, index }">
          <tr>
            <td>{{ item?.name || 'N/A' }}</td>
            <td>{{ showDescriptionContent ? truncatedDescription(item?.description || '') : '' }}</td>
            <td>{{ item?.date || 'N/A' }}</td>
            <td>{{ item?.category || 'N/A' }}</td>
            <td>{{ item?.criticality || 'N/A' }}</td>
          
            <td>
              <v-icon
                @click="deleteTask(index)"
                class="delete-icon"
              >
                mdi-delete
              </v-icon>
            </td>

            <td>
              <v-icon
                @click="duplicateTask(index)"
                class="duplicate-icon"
              >
                mdi-content-copy
              </v-icon>
            </td>


            <td>
              <v-icon
                @click="toggleImportant(index)"
                :class="{ 'important-icon': item?.important }"
              >
                {{ item?.important ? 'mdi-star' : 'mdi-star-outline' }}
              </v-icon>
            </td>
            
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { useTodoListStore } from '@/stores/useTodoListStore';
import { mdiDelete , mdiContentCopy } from '@mdi/js';
export default {
  //props: {
   // newItems: {
     //  type: Array,
     //  required: true,
    // }
  //},
  data() {
    return {
      mdiDelete,
      mdiContentCopy,
      search: '',
      showDescriptionContent: true,
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
          item?.name?.includes(this.search) ||
          (this.showDescriptionContent && item?.description?.includes(this.search)) ||
          item?.date?.includes(this.search) ||
          item?.category?.includes(this.search) ||
          item?.criticality?.includes(this.search)
        );
      }

      return items.sort((a, b) => {
        const aImportant = a?.important ? 1 : 0;
        const bImportant = b?.important ? 1 : 0;
        return bImportant - aImportant;
      });
    }
  },
  methods: {
    toggleDescriptionContent() {
      this.showDescriptionContent = !this.showDescriptionContent;
    },
    truncatedDescription(description) {
      if (description.length > 20) {
        return description.substring(0, 20) + '...';
      }
      return description;
    },
    toggleImportant(index) {
      const todoStore = this.todoStore;

      console.log('Attempting to toggle importance at index:', index);
      console.log('Current todo list:', todoStore.todoList);

      if (index < 0 || index >= todoStore.todoList.length) {
        console.error('Invalid index:', index);
        return;
      }

      const item = todoStore.todoList[index];

      if (!item) {
        console.error('Task item is undefined at index:', index);
        return;
      }

      console.log('Item before toggle:', item);

      if (item.important === undefined) {
        item.important = false;
      }

      item.important = !item.important;

      console.log('Item after toggle:', item);

      // Trigger reactivity by reassigning the todoList array
      todoStore.todoList = [...todoStore.todoList];
    },
    deleteTask(index) {
      const todoStore = this.todoStore;

      // Check if index is within valid range
      if (index < 0 || index >= todoStore.todoList.length) {
        console.error('Invalid index for deletion:', index);
        return;
      }

      // Remove the task at the specified index
      todoStore.todoList.splice(index, 1);
    },duplicateTask(index) {
      const todoStore = this.todoStore;
      if (index < 0 || index >= todoStore.todoList.length) {
        console.error('Invalid index for duplication:', index);
        return;
      }
      todoStore.duplicateTask(index);
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
.show-hide {
  background-color: #cde8e4b9;
  display: flex;
  justify-content: center;
}

</style>
