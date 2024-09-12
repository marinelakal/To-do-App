<template>
    <div>
      <v-sheet class="d-flex" width="800" height="54" tile>
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
          v-if="['month', 'week', 'day'].includes(type)"
          v-model="weekday"
          :items="weekdays"
          class="ma-2"
          label="weekdays"
          variant="outlined"
          dense
          hide-details
        ></v-select>
      </v-sheet>

        <div v-if="type === 'date range'" class="d-flex justify-center">
          <v-date-input
            v-model="selectedRange"
            label="Select Date Range"
            max-width="368"
            multiple="range"
            class="date-range"
          ></v-date-input>
        </div>

      <v-sheet>
        <v-calendar
          ref="calendar"
          v-model="value"
          :events="calendarEvents"
          :view-mode="type !== 'date range' ? type : 'month'"
          :weekdays="weekday"
        ></v-calendar>
      </v-sheet>
    </div>
  </template>

  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import { useTodoListStore } from '@/stores/useTodoListStore'

  const todoStore = useTodoListStore()

  const type = ref('month')
  const types = ['month', 'week', 'day', 'date range']
  const weekday = ref([0, 1, 2, 3, 4, 5, 6])
  const weekdays = [
    { title: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
    { title: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
    { title: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
    { title: 'Mon, Wed, Fri', value: [1, 3, 5] },
  ]


  const events = ref([])
  
  const filteredEvents = ref([])

  const value = ref([new Date()])
  const selectedRange = ref([])

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

  // Function to filter events by the selected date range
  const filterEventsByDateRange = () => {
    if (selectedRange.value.length >= 2) {
      const startDate = selectedRange.value[0]
      const endDate = selectedRange.value[selectedRange.value.length - 1]

      // Filter events based on the selected range
      filteredEvents.value = events.value.filter(
        (event) => event.start >= startDate && event.start <= endDate
      )
    } else {
      filteredEvents.value = []
    }
  }

  // Reactive property for the calendar events
  const calendarEvents = ref([])

  watch(type, () => {
    if (type.value === 'date range') {
      filterEventsByDateRange()
      calendarEvents.value = filteredEvents.value
    } else {
      calendarEvents.value = events.value 
    }
  })

  watch(selectedRange, () => {
    if (type.value === 'date range') {
      filterEventsByDateRange()
      calendarEvents.value = filteredEvents.value
    }
  })

  onMounted(() => {
    getEventsFromTasks() 
    calendarEvents.value = events.value 
  })
  </script>

  <style scoped>
  .date-range{
    margin-top:20px;
  }
  </style>