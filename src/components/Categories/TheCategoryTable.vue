<template>
  <div class="table-wrapper">
    <v-table class="category-table" height="300px">
    <thead>
      <tr>
        <th>Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in categories" :key="item.name">
        <td class="names">{{ item.name }}</td>

        
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>Edit Category</v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Category name"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDialog">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="saveCategory">
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

        <td>
          <div class="icon-container">
          <v-icon class="me-2" size="small" @click="editItem(item, index)">
            mdi-pencil
          </v-icon>
        
        
          <v-icon @click="openDeleteDialog(index)" class="delete-icon">
            mdi-delete
          </v-icon>
        </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</div>
</template>

<script>
  import { useCategoryStore } from '@/stores/useCategoryStore';
  import { mdiDelete, mdiPencil } from '@mdi/js';

  export default {
    data() {
    return {
      mdiDelete,
      mdiPencil,
      dialog: false,
      dialogDelete: false,
      deleteIndex: null,
      editedIndex: -1,
      editedItem: {
        name: ''
      },
    };
  },
    computed: {
      categories() {
        const categoryStore = useCategoryStore();
        return categoryStore.categories;
      },
      categoryStore () {
        return useCategoryStore();
      }
    },
    methods: {
      del(index) {
        const categoryStore = useCategoryStore();
        categoryStore.deleteCategory(index);
      },
    openDeleteDialog(index) {
    this.deleteIndex = index;
    this.dialogDelete = true;
    },

    confirmDelete() {
      if (this.deleteIndex !== null) {
        this.categoryStore.deleteCategory(this.deleteIndex);
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
      closeDialog() {
        this.dialog = false; 
      },
      saveCategory() {
        const categoryStore = useCategoryStore();
        if (this.editedIndex > -1) {
          categoryStore.updateCategory(this.editedIndex, this.editedItem.name);
        }
        this.closeDialog();
      }
    }
  };
</script>

<style scoped>

.table-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5; 
  margin-top:20px;
}

.category-table {
  max-width: 600px; 
  width: 100%; 
  margin: auto; 
  background-color: #ffffff; 
  border-radius: 8px; 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
}

.icon-container {
  display: flex;
  justify-content: left;
  gap: 10px;
}

.names {
  display: flex;
  justify-content: left;
  margin-top: 10px;
}

td, th {
  padding: 0; 
  margin: 0; 
}

.v-table {
        margin-top: 20px;
        display: flex;
        justify-content:center; 
    }

.delete-icon {
cursor: pointer;
}

.edit-icon {
  margin-right: 10px;
}



</style>