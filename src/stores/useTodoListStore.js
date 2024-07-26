import { defineStore } from 'pinia'

export const useTodoListStore = defineStore('todoList' , {
    state: () => ({
        todoList: [] , 
    }),
    //getters 
    //actions
    actions: {
        addTodo(todo) {
          if (todo.important === undefined) {
            todo.important = false;
          }
          this.todoList.push(todo);
        },
        deleteTask(index) {
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
    
          // Create a duplicate of the item, ensuring it doesn't retain the important status
          const duplicateItem = { ...item, name: `${item.name} (copy)`, important: false };
          this.todoList.push(duplicateItem);
        }
      }
})