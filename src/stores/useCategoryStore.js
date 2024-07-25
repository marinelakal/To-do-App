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
      },
});