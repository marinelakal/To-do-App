import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [
      { name: 'Personal' },
      { name: 'Work' },
      { name: 'Leisure' },
      { name: 'Misc' },
    ],
    editCategoryIndex: null,
  }),
  actions: {
    addCategory(name) {
      if (name && !this.categories.some(category => category.name === name)) {
        this.categories.push({ name });
      }
    },
    deleteCategory(index) {
      if (index >= 0 && index < this.categories.length) {
        this.categories.splice(index, 1);
      }
    },
    updateCategory(index, newName) {
      if (index >= 0 && index < this.categories.length && newName) {
        this.categories[index] = { ...this.categories[index], name: newName };
      }
    },
    setEditCategoryIndex(index) {
      this.editCategoryIndex = index;
    },
    clearEditCategoryIndex() {
      this.editCategoryIndex = null;
    },
  },
});
