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
        }
      }
})