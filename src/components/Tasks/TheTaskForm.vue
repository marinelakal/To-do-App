
<template>
    <div class="subtext">
        What needs to be done?
    </div>
    <v-sheet class="mx-auto" width="300">
      <v-form fast-fail v-model="valid" @submit.prevent="submit" ref="form">
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
            v-model="date"
            :min="minDate"
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
        :disabled="!valid"
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
import { useTodoListStore } from '@/stores/useTodoListStore';
  export default {
    data: () => ({
      valid: false,
      name: '',
      description: '',
      radios: "one",
      select: '', 
      date: null,
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
      criticalityMap: {
          one: 'Low',
          two: 'Medium',
          three: 'High'
      },
      minDate: new Date().toISOString().split('T')[0]
      
      
    }),

    methods: {
      reset() {
        this.$refs.form.reset();
        this.valid = false; 
      },
      submit() {
      if (this.$refs.form.validate()) { 
        const formattedDate = this.date ? new Date(this.date).toLocaleDateString() : '';
        const submission = {
          name: this.name,
          description: this.description,
          date: formattedDate,
          category: this.select,
          criticality: this.criticalityMap[this.radios]
        };
        console.log('Form submission:', submission); // Debugging line
        // Emit the current form data
        this.$emit('submit-form', submission);

        // Use the Pinia store to add the todo
        const todoStore = useTodoListStore();
        console.log('Current todo list:', todoStore.todoList);
        todoStore.addTodo(submission);

        // Reset the form
        this.reset();
    }
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