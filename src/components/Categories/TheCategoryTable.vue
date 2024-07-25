<template>
    <v-table height="300px">
    <thead>
      <tr>
        
        
      </tr>
    </thead>
    
    <tbody>
      <tr
        v-for="item in categories"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        
      </tr>
    </tbody>

  </v-table>
</template>

<script>
  export default {
    data () {
      return {
        categories: [
          {
            name: 'Personal',
          },
          {
            name: 'Work',
          },
          {
            name: 'Leisure',
          },
          {
            name: 'Misc',
          }
        ],
      }
    },
  }
</script>


<style scoped>
.v-table {
        margin-top: 20px;
        display: flex;
        justify-content:center; 
    }




</style>