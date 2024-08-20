import { defineStore } from 'pinia';
import { useTodoListStore } from '@/stores/useTodoListStore';

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
        const oldCategory = this.categories[index].name;
        this.categories.splice(index, 1);
        this.updateTasksWithCategory(oldCategory, null);
      }
    },
    updateCategory(index, newName) {
      if (index >= 0 && index < this.categories.length && newName) {
        const oldCategory = this.categories[index].name;
        this.categories[index] = { ...this.categories[index], name: newName };
        this.updateTasksWithCategory(oldCategory, newName);
      }
    },
    setEditCategoryIndex(index) {
      this.editCategoryIndex = index;
    },
    clearEditCategoryIndex() {
      this.editCategoryIndex = null;
    },
    updateTasksWithCategory(oldCategory, newCategory) {
      const taskStore = useTodoListStore();
      taskStore.updateTasksWithCategory(oldCategory, newCategory);
    }
  },
});
