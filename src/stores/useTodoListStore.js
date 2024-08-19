import { defineStore } from 'pinia';

export const useTodoListStore = defineStore('todoList', {
  state: () => ({
    todoList: [],
    editTaskIndex: null,
  }),
  actions: {
    addTodo(todo) {
      if (!todo) {
        console.error('Invalid todo item:', todo);
        return;
      }

      if (todo.important === undefined) {
        todo.important = false;
      }

      this.todoList.push(todo);
    },
    deleteTask(index) {
      if (index < 0 || index >= this.todoList.length) {
        console.error('Invalid index for deletion:', index);
        return;
      }

      this.todoList.splice(index, 1);
    },
    duplicateTask(index) {
      if (index < 0 || index >= this.todoList.length) {
        console.error('Invalid index for duplication:', index);
        return;
      }

      const item = this.todoList[index];
      if (!item) {
        console.error('Task item is undefined at index:', index);
        return;
      }

      const duplicateItem = { ...item, name: `${item.name} (copy)`, important: false };
      this.todoList.push(duplicateItem);
    },
    updateTask(index, updatedTask) {
      if (index < 0 || index >= this.todoList.length) {
        console.error('Invalid index for updating:', index);
        return;
      }

      if (!updatedTask) {
        console.error('Invalid updated task:', updatedTask);
        return;
      }

      this.todoList[index] = { ...this.todoList[index], ...updatedTask };
    },
    setEditTaskIndex(index) {
      this.editTaskIndex = index;
    },
    clearEditTaskIndex() {
      this.editTaskIndex = null;
    },
  },
});
