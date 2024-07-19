<template>
    <div class="table-container">
    <v-card
      title="Tasks"
      flat
    >
      <template v-slot:text>
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        ></v-text-field>
      </template>
  
      <v-data-table
        :headers="headers"
        :search="search"
      ></v-data-table>
    </v-card>
</div>
  </template>


  <script>
    export default {
      data () {
        return {
          search: '',
          headers: [
            {
              align: 'start',
              key: 'name',
              sortable: false,
              title: 'Name',
            },
            { key: 'description', title: 'Description' },
            { key: 'date', title: 'Date' },
            { key: 'category', title: 'Category' },
            { key: 'criticality', title: 'Criticality' }
          ]
        }
      },
    }
  </script>

<style>
    .v-card , .v-data-table{
        background-color: #cde8e4b9;
    }
    .table-container {
        margin-top: 20px;
        display: flex;
        justify-content:center; 
    }
</style>