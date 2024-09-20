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
            
            if (this.assignees.some(a => a.id === assignee.id)) {
                assignee.id = Date.now();
            }
            this.assignees.push(assignee);
        },
        deleteAssignee(index) {
            if (index < 0 || index >= this.assignees.length) {
              console.error('Invalid index for deletion:', index);
              return;
            }
            const oldAssigneeId = this.assignees[index].id;
            this.assignees.splice(index, 1);
            this.updateTasksWithAssigneeId(oldAssigneeId, null);
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
            const oldAssigneeId = this.assignees[index].id;
            this.assignees[index] = { ...this.assignees[index], ...updatedAssignee };
            this.updateTasksWithAssigneeId(oldAssigneeId, updatedAssignee);
        },
        setEditAssigneeIndex(index) {
            this.editAssigneeIndex = index;
        },
        clearEditAssigneeIndex() {
            this.editAssigneeIndex = null;
        },
        updateTasksWithAssigneeId(oldAssigneeId, newAssignee) {
          const taskStore = useTodoListStore();
          
          taskStore.todoList = taskStore.todoList.map(task => {
            if (task.assigneeId === oldAssigneeId) {
              return {
                ...task,
                assigneeId: newAssignee ? newAssignee.id : null,
              };
            }
            return task;
          });
        }
      },
});