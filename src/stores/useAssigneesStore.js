import { defineStore } from 'pinia';
import { useTodoListStore } from '@/stores/useTodoListStore';

export const useAssigneesStore = defineStore('assignee', {
    state: () => ({
        assignees: [],
        editAssigneeIndex: null,
        currentPage: 1,
        itemsPerPage: 10,
      }),
      actions: {
        addAssignee(assignee) {
            if (!assignee) {
                console.error('Invalid assignee item:', assignee);
                return;
            }
        
            if (assignee.important === undefined) {
                assignee.important = false;
            }
        
            this.assignees.push(assignee);
        },
        deleteAssignee(index) {
            if (index < 0 || index >= this.assignees.length) {
              console.error('Invalid index for deletion:', index);
              return;
            }
            const oldAssignee = this.assignees[index].firstname;
            this.assignees.splice(index, 1);
            this.updateTasksWithAssignees(oldAssignee, null);
        },
        updateAssignee(index, updatedAssignee) {
            if (index < 0 || index >= this.assignees.length) {
              console.error('Invalid index for updating:', index);
              return;
            }
      
            if (!updatedAssignee) {
              console.error('Invalid updated assignee:', updatedAssignee);
              return;
            }
            const oldAssignee = this.assignees[index].firstname;
            this.assignees[index] = { ...this.assignees[index], ...updatedAssignee };
            this.updateTasksWithAssignees(oldAssignee, updatedAssignee);
        },
        setEditAssigneeIndex(index) {
            this.editAssigneeIndex = index;
        },
        clearEditAssigneeIndex() {
            this.editAssigneeIndex = null;
        },
        updateTasksWithAssignees(oldAssignee, newAssignee) {
          const taskStore = useTodoListStore();
          
          taskStore.todoList = taskStore.todoList.map(task => {
            if (task.assignee === oldAssignee) {
              return {
                ...task,
                assignee: newAssignee ? newAssignee.firstname : null,
              };
            }
            return task;
          });
        }
      },
});