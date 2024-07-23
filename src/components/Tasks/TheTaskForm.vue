
<template>
    <div class="subtext">
        What needs to be done?
    </div>
    <v-sheet class="mx-auto" width="300">
      <v-form fast-fail @submit.prevent ref="form">
        <v-text-field
          v-model="name"
          label="Name"
          :rules="nameRules"
          required
        ></v-text-field>
  
        <v-textarea 
          v-model="description"
          label="Description"
          :rules="descriptionRules"
          required
        ></v-textarea>

        <v-date-input
            label="Select a date"
            prepend-icon=""
            
            variant="solo"
      ></v-date-input>

        <v-select 
            v-model="select"
            label="Select Category"
            :rules="selectRules"
            required
            :items="['Personal', 'Work', 'Leisure', 'Misc']"
        ></v-select>

        
        <v-container>
            <v-radio-group v-model="radios">
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

        <v-btn @click="reset">
        clear
        </v-btn>
    </div>
      </v-form>
    </v-sheet>
    

</template>

<script>
  export default {
    data: () => ({
      valid: false,
      name: '',
      description: '',
      radios: "one",
      select: '',
      nameRules: [
        value => {
          if (value) return true

          return 'Name is required.'
        }
      ],
      descriptionRules: [
      value => {
          if (value) return true

          return 'Description is required.'
        }
      ],
      selectRules: [
      value => {
          if (value) return true

          return 'Category is required.'
        }
      ],
      
      
    }),

    methods: {
      reset() {
        this.$refs.form.reset()
      }
    }
  }
</script>

 
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