import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category',{
    state: () => ({
        categories: [
          { name: 'Personal' },
          { name: 'Work' },
          { name: 'Leisure' },
          { name: 'Misc' },
        ],
      }),
      actions: {
        addCategory(name) {
          this.categories.push({ name });
        },
        deleteCategory(index) {
          this.categories.splice(index, 1);
        },
        updateCategory(index, newName) {
          if (index >= 0 && index < this.categories.length) {
            this.categories[index].name = newName; 
          }
        }
      },
});