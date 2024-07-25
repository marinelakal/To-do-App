import { defineStore } from 'pinia'

export const useTodoListStore = defineStore('todoList' , {
    state: () => ({
        todoList: [] , 
    }),
    //getters 
    //actions
    actions: {
        addTodo(todo) {
          this.todoList.push(todo);
        },
        clearTodos() {
          this.todoList = [];
        }
      }
})