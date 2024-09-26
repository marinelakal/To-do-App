<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="8" lg="6">
          <v-sheet class="d-flex" :width="screenWidth < 960 ? '100%' : '800px'" height="54" tile>
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
              v-model="selectedWeekday"
              :items="weekdays"
              item-text="title"
              item-value="title"
              class="ma-2"
              label="weekdays"
              variant="outlined"
              dense
              hide-details
            ></v-select>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div v-if="type === 'date range'" class="d-flex justify-column">
            <v-date-input
              prepend-icon=""
              variant="outlined"
              v-model="selectedRange"
              label="Select Date Range"
              max-width="400"
              multiple="range"
              class="date-range"
            ></v-date-input>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-sheet>
            <v-calendar
              ref="calendar"
              v-model="value"
              :events="calendarEvents"
              :view-mode="type !== 'date range' ? type : 'month'"
              :weekdays="weekday"
            >
              <template v-slot:event="{ event }">
                <div @click="handleTaskClick(event)" class="event-wrapper" :style="{ backgroundColor: event.isDone ? '#C8C8C8' : event.color }">
                  {{ event.title }}
                </div>
              </template>
            </v-calendar>
          </v-sheet>
        </v-col>
      </v-row>


      <v-dialog v-model="taskDialog" max-width="400px">
        <v-card>
          <v-card-title class="primary--text" style="background-color:#65bbae ; color:white">
            {{ selectedTask.name }}
            <v-icon v-if="selectedTask.isDone" style="margin-left: 8px; font-size: 18px;">mdi-check</v-icon>
          </v-card-title>

          <v-card-text>

            <v-row>
              <v-col cols="6">
                <strong>Category:</strong>
                <p>{{ selectedTask.category }}</p>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <strong>Description:</strong>
                <p>{{ selectedTask.description }}</p>
              </v-col>
            </v-row>


            <v-row>
              <v-col cols="6">
                <strong>Criticality:</strong>
                <p :class="getCriticalityClass(selectedTask.criticality)">{{ selectedTask.criticality }}</p>
              </v-col>
            </v-row>


            <v-row>
              <v-col cols="6">
                <strong>Date:</strong>
                <p>{{ new Date(selectedTask.date).toDateString() }}</p>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="justify-end">
            <v-btn @click="taskDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>

  <script setup>
  import { ref, onMounted, watch , computed } from 'vue'
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

  // Screen width ref to adjust the layout
  const screenWidth = ref(window.innerWidth)
  window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth
  })

  // Computed property to get and set the weekday title
  const selectedWeekday = computed({
    get() {
      const found = weekdays.find(w => JSON.stringify(w.value) === JSON.stringify(weekday.value));
      return found ? found.title : '';
    },
    set(title) {
      const found = weekdays.find(w => w.title === title);
      if (found) {
        weekday.value = found.value;
      }
    }
  });

  const events = ref([])
  
  const filteredEvents = ref([])

  const value = ref([new Date()])
  const selectedRange = ref([])
  const taskDialog = ref(false)
  const selectedTask = ref({})

  const criticalityColors = {
    Low: 'green',
    Medium: 'orange',
    High: 'red',
  };

  const getCriticalityClass = (criticality) => {
    if (criticality === 'High') return 'red--text';
    if (criticality === 'Medium') return 'orange--text';
    return 'green--text';
  };

  const getEventsFromTasks = () => {
    const newEvents = []
    
    todoStore.todoList.forEach(task => {
      
      const taskDate = new Date(task.date)
  
      if (!isNaN(taskDate)) {
        
        newEvents.push({
          title: `${task.name} - ${task.category}`,
          start: taskDate,
          end: taskDate,
          color: criticalityColors[task.criticality] ,
          isDone: task.isDone,
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
  };

  const handleTaskClick = (event) => {
    const clickedTask = todoStore.todoList.find((task) => `${task.name} - ${task.category}` === event.title);
    if (clickedTask) {
      selectedTask.value = clickedTask;
      taskDialog.value = true;
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

  .event-wrapper {
    padding: 5px;
    cursor: pointer;
    color: white;
    border-radius: 4px;
    height: 30px;
  }

  .red--text {
    color: red !important;
  }

  .orange--text {
    color: orange !important;
  }

  .green--text {
    color: green !important;
  }

  @media only screen and (max-width: 600px) {
    .date-range {
      max-width: 100% !important;
    }
  }
  
  </style>