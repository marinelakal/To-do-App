<template>
    <v-table height="300px">
    <thead>
      <tr>
     </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in categories" :key="item.name">
        <td>{{ item.name }}</td>

        
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

        <td>
          <v-icon class="me-2" size="small" @click="editItem(item, index)">
            mdi-pencil
          </v-icon>
        </td>
        <td>
          <v-icon @click="del(index)" class="delete-icon">
            mdi-delete
          </v-icon>
        </td>
      </tr>
    </tbody>
  </v-table>
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
    },
    methods: {
      del(index) {
        const categoryStore = useCategoryStore();
        categoryStore.deleteCategory(index);
      },
      editItem(item, index) {
        this.editedIndex = index;
        this.editedItem = { ...item }; // Copy the item to edit
        this.dialog = true; // Open the dialog
      },
      closeDialog() {
        this.dialog = false; // Close the dialog without saving
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
.v-table {
        margin-top: 20px;
        display: flex;
        justify-content:center; 
    }

.delete-icon {
cursor: pointer;
}


</style>