import { createApp } from 'vue';

// Vuetify imports
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import { VDateInput } from 'vuetify/labs/VDateInput';
import { VCalendar } from 'vuetify/labs/VCalendar'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Vue Router imports
import { createRouter, createWebHistory } from 'vue-router';

// Pinia for state management
import { createPinia } from 'pinia';

// Local Component Imports
import App from './App.vue';
import TaskApp from './components/Tasks/TaskApp.vue';
import TaskAppTable from './components/Tasks/TaskAppTable.vue';
import TaskAppForm from './components/Tasks/TaskAppForm.vue';
import TaskAppCalendar from './components/Tasks/TaskAppCalendar.vue';
import CategoryApp from './components/Categories/CategoryApp.vue';
import CategoryAppTable from './components/Categories/CategoryAppTable.vue';
import CategoryAppForm from './components/Categories/CategoryAppForm.vue';
import AssigneeApp from './components/Assignees/AssigneeApp.vue';
import AssigneeAppTable from './components/Assignees/AssigneeAppTable.vue';
import AssigneeAppForm from './components/Assignees/AssigneeAppForm.vue';

// Create Pinia instance
const pinia = createPinia();

// Define Router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/tasks',
      component: TaskApp,
      children: [
        {
          path: '/table',
          name: 'TaskTable',
          component: TaskAppTable,
        },
        {
          path: '/import',
          name: 'TaskForm',
          component: TaskAppForm,
        },
        {
          path: '/calendar',
          name: 'TaskCalendar',
          component: TaskAppCalendar,
        },
      ],
    },
    {
      path: '/categories',
      component: CategoryApp,
      children: [
        {
          path: '',
          name: 'CategoryTable',
          component: CategoryAppTable,
        },
        {
          path: '/create',
          name: 'CategoryForm',
          component: CategoryAppForm,
        },
      ],
    },
    {
      path: '/assignees',
      component: AssigneeApp,
      children: [
        {
          path: '',
          name: 'AssigneeTable',
          component: AssigneeAppTable,
        },
        {
          path: '/make',
          name: 'AssigneeForm',
          component: AssigneeAppForm,
        },
      ],
    },
  ],
});

// Create Vuetify instance
const vuetify = createVuetify({
  icons: {
    iconfont: 'mdi',
  },
  components: {
    ...components,
    VDateInput,
    VCalendar,
  },
  directives,
});

// Create and mount the Vue app
createApp(App).use(pinia).use(router).use(vuetify).mount('#app');
