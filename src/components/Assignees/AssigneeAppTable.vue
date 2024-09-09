<template>
    <div class="table-wrapper">
      <div class="table-container">
        <BaseDataTable
          :headers="headers"
        />
      </div>
    </div>
  </template>


<script setup>
import BaseDataTable from '../Base/BaseDataTable.vue';

const headers = [
  { key: 'firstname', align: 'start', visible: true, showContent: true , title: 'First Name' , type: 'text'},
  { key: 'lastname', align: 'start', visible: true, showContent: true , title: 'Last Name' , type: 'text'},
  { key: 'email', align: 'start', visible: true, showContent: true , title: 'Email' , type: 'text'},
  { key: 'phone', align: 'start', visible: true, showContent: true , title: 'Phone Number' , type: 'text'},
  { key: 'actions', visible: false, showContent: true , title: 'Actions', sortable: false , type: 'action' },
];
</script>

<style scoped>
.table-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #ffffff;
}

.v-data-table {
  border-radius: 8px;
  overflow: hidden;
}

.table-container {
  width: 100%;
  max-width: 800px;
  max-height: none;
  overflow-y: hidden;
  overflow-x: hidden;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.233);
}
</style>