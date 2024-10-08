<template>
  <div class="table-container">
    <v-card flat>
      <v-card-title>
        Tasks
        <v-btn class="show-hide" v-if="hasTasks" @click="toggleDescriptionContent">
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

            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <v-card>
                <v-card-title>Edit Task</v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        md="4"
                        sm="6"
                      >
                        <v-text-field
                          v-model="editedItem.name"
                          label="Task name"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="4"
                        sm="6"
                      >
                        <v-text-field
                          v-model="editedItem.description"
                          label="Description"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="4"
                        sm="6"
                      >
                        <v-text-field
                          v-model="editedItem.date"
                          label="Date"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="4"
                        sm="6"
                      >
                        <v-text-field
                          v-model="editedItem.category"
                          label="Category"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="4"
                        sm="6"
                      >
                        <v-text-field
                          v-model="editedItem.criticality"
                          label="Criticality"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue-darken-1" variant="text" @click="closeDeleteDialog">Cancel</v-btn>
                  <v-btn color="blue-darken-1" variant="text" @click="confirmDelete">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <td class="actions-cell">
              <v-icon
                class="me-2"
                size="small"
                @click="editItem(item, index)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                 @click="openDeleteDialog(index)"
                class="delete-icon"
              >
                mdi-delete
              </v-icon>
              <v-icon
                @click="duplicateTask(index)"
                class="duplicate-icon"
              >
                mdi-content-copy
              </v-icon>
               
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
  data() {
    return {
      dialogDelete: false,
      deleteIndex: null,
      dialog: false,
      editedIndex: -1,
      editedItem: {
        name: '',
        description: '',
        date: '',
        category: '',
        criticality: '',
        important: false,
      },
      mdiDelete,
      mdiContentCopy,
      search: '',
      showDescriptionContent: false,
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
        { key: 'actions', title: 'Actions' },
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
    },
    hasTasks() {
      return this.todoStore.todoList.length > 0;
    },
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

      if (index < 0 || index >= todoStore.todoList.length) {
        console.error('Invalid index:', index);
        return;
      }

      const item = todoStore.todoList[index];

      if (!item) {
        console.error('Task item is undefined at index:', index);
        return;
      }

      if (item.important === undefined) {
        item.important = false;
      }

      item.important = !item.important;

      todoStore.todoList = [...todoStore.todoList];
    },
    deleteTask(index) {
      const todoStore = this.todoStore;

      if (index < 0 || index >= todoStore.todoList.length) {
        console.error('Invalid index for deletion:', index);
        return;
      }

      todoStore.todoList.splice(index, 1);
    },
    duplicateTask(index) {
      const todoStore = this.todoStore;
      if (index < 0 || index >= todoStore.todoList.length) {
        console.error('Invalid index for duplication:', index);
        return;
      }
      todoStore.duplicateTask(index);
    },
    openDeleteDialog(index) {
    this.deleteIndex = index;
    this.dialogDelete = true;
    },

    confirmDelete() {
      if (this.deleteIndex !== null) {
        this.todoStore.deleteTask(this.deleteIndex);
        this.deleteIndex = null;
      }
      this.closeDeleteDialog();
    },

    closeDeleteDialog() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.deleteIndex = null;
      });
    },
    editItem(item, index) {
      this.editedIndex = index;
      this.editedItem = { ...item };
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = {
          name: '',
          description: '',
          date: '',
          category: '',
          criticality: '',
          important: false,
        };
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        this.todoStore.updateTask(this.editedIndex, this.editedItem);
      }
      this.close();
    },
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
  background-color: #f5f5f5; 
}
.show-hide {
  background-color: #cde8e4b9;
  display: flex;
  justify-content: center;
}

.actions-cell .v-icon {
  margin-right: 8px;
}

.actions-cell .v-icon:last-child {
  margin-right: 0; 
}

td {
  text-align: center; 
}
</style>
