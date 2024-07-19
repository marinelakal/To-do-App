
<template>
    <div class="subtext">
        What needs to be done?
    </div>
    <v-sheet class="mx-auto" width="300">
      <v-form fast-fail @submit.prevent>
        <v-text-field
          label="Name"
        ></v-text-field>
  
        <v-textarea label="Description"></v-textarea>

        <v-date-input
            label="Select a date"
            prepend-icon=""
            
            variant="solo"
      ></v-date-input>

        <v-select
            label="Select Category"
            :items="['Personal', 'Work', 'Leisure', 'Misc']"
        ></v-select>

        
        <v-container>
            <v-radio-group>
                <v-radio label="Low" value="one" color="green"></v-radio>
                <v-radio label="Medium" value="two" color="orange"></v-radio>
                <v-radio label="High" value="three" color="red"></v-radio>
            </v-radio-group>
        </v-container>
        
        <div class="button-container">
        <v-btn
        class="me-4"
        type="submit"
        >
        submit
        </v-btn>

        <v-btn>
        clear
        </v-btn>
    </div>
      </v-form>
    </v-sheet>
    

</template>





 
<style>
  .subtext {
    font-size: 1.5rem; 
    color: #999999; 
    text-align: center;
    margin-bottom: 40px;
    margin-top: 20px; 
    font-family: Arial, sans-serif; 
    
  }
  
  .button-container {
    display: flex;
    justify-content: flex-end; 
    
  }
</style>