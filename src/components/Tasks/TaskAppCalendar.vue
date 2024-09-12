<template>
    <div>
      <v-sheet class="d-flex" height="54" tile>
        <v-select
          v-model="type"
          :items="types"
          class="ma-2"
          label="View Mode"
          variant="outlined"
          dense
          hide-details
        ></v-select>
        <v-select
          v-model="weekday"
          :items="weekdays"
          class="ma-2"
          label="weekdays"
          variant="outlined"
          dense
          hide-details
        ></v-select>
      </v-sheet>
      <v-sheet>
        <v-calendar
          ref="calendar"
          v-model="value"
          :events="events"
          :view-mode="type"
          :weekdays="weekday"
        ></v-calendar>
      </v-sheet>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useTodoListStore } from '@/stores/useTodoListStore'
  

  const todoStore = useTodoListStore()
  

  const type = ref('month')
  const types = ['month', 'week', 'day']
  const weekday = ref([0, 1, 2, 3, 4, 5, 6])
  const weekdays = [
    { title: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
    { title: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
    { title: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
    { title: 'Mon, Wed, Fri', value: [1, 3, 5] },
  ]
  

  const events = ref([])
  

  const value = ref([new Date()])
  
 
  const criticalityColors = {
    Low: 'green',
    Medium: 'orange',
    High: 'red',
  }
  
 
  const getEventsFromTasks = () => {
    const newEvents = []
    
    todoStore.todoList.forEach(task => {
      
      const taskDate = new Date(task.date)
  
      if (!isNaN(taskDate)) {
        
        newEvents.push({
          title: task.name,
          start: taskDate,
          end: taskDate,
          color: criticalityColors[task.criticality] ,
          allDay: false,
        })
      } else {
        console.error(`Invalid date for task: ${task.name}`)
      }
    })
  
    events.value = newEvents
  }

  
  onMounted(() => {
    getEventsFromTasks() 
  })
  </script>
  