import { createApp } from 'vue';

import { VDateInput } from 'vuetify/labs/VDateInput'

import { createRouter, createWebHistory } from 'vue-router';

import TaskApp from './components/Tasks/TaskApp.vue'

import CategoryAppForm from './components/Categories/CategoryAppForm.vue' ;

import { createPinia } from 'pinia'

import TaskAppTable from './components/Tasks/TaskAppTable';
import TaskAppForm from './components/Tasks/TaskAppForm';
import CategoryApp from './components/Categories/CategoryApp';
import CategoryAppTable from './components/Categories/CategoryAppTable' ; 

import App from './App.vue'

const pinia = createPinia()

const router = createRouter ({
  history: createWebHistory (),
  routes: [
    {
      path: '/tasks',
      component: TaskApp,
      children: [
        {
          path: '',
          name: 'TaskTable',
          component: TaskAppTable
        },
        {
          path: '/import',
          name: 'TaskForm',
          component: TaskAppForm
        }
      ]
    },
    {
      path: '/categories',
      component: CategoryApp,
      children: [
        {
          path: '',
          name: 'CategoryTable',
          component: CategoryAppTable
        },
        {
          path: '/create',
          name: 'CategoryForm',
          component: CategoryAppForm
        }
      ]
    }

  ]
});



// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    icons: {
      iconfont: 'mdi', // default - only for display purposes
    },
    components: {
        ...components,
        VDateInput,
      },
    directives,
  })





createApp(App).use(pinia).use(router).use(vuetify).mount('#app');