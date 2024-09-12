import { defineStore } from 'pinia';

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
      
            this.assignees.splice(index, 1);
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
      
            this.assignees[index] = { ...this.assignees[index], ...updatedAssignee };
        },
        setEditAssigneeIndex(index) {
            this.editAssigneeIndex = index;
        },
        clearEditAssigneeIndex() {
            this.editAssigneeIndex = null;
        },
      },
});