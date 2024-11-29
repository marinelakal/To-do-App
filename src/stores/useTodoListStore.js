import { defineStore } from 'pinia';

export const useTodoListStore = defineStore('todoList', {
  state: () => ({
    todoList: [],
    editTaskIndex: null,
    currentPage: 1,
    itemsPerPage: 10,
  }),
  actions: {
    addTodo(todo) {
      if (!todo) {
        console.error('Invalid todo item:', todo);
        return;
      }
    
      if (!todo.assigneeId) {
        console.error('AssigneeId is required for the task.');
        return;
      }
    
      if (todo.important === undefined) {
        todo.important = false;
      }

      todo.isDone = false;

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
    updateTasksWithCategory(oldCategory, newCategory) {
      this.todoList = this.todoList.map(task => {
        if (task.category === oldCategory) {
          return { ...task, category: newCategory };
        }
        return task;
      });
    },
    updateTasksWithAssigneeId(oldAssigneeId, newAssignee) {
      this.todoList = this.todoList.map(task => {
        if (task.assigneeId === oldAssigneeId) {
          return { 
            ...task, 
            assigneeId: newAssignee ? newAssignee.id : null
          };
        }
        return task;
      });
    },
    toggleTaskDone(index) {
      if (index < 0 || index >= this.todoList.length) {
        console.error('Invalid index for toggling done status:', index);
        return;
      }

      const item = this.todoList[index];
      if (item) {
        item.isDone = !item.isDone;
      }
    },
    setEditTaskIndex(index) {
      this.editTaskIndex = index;
    },
    clearEditTaskIndex() {
      this.editTaskIndex = null;
    },
  },
});
