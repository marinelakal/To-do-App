import { createApp } from 'vue';

import { VDateInput } from 'vuetify/labs/VDateInput'

import { createRouter, createWebHistory } from 'vue-router';

import TheTaskApp from './components/Tasks/TheTaskApp.vue'

import TheCategory from './components/Categories/TheCategoryApp.vue' ;

import { createPinia } from 'pinia'

import TheTaskTable from './components/Tasks/TheTaskTable';
import TheTaskForm from './components/Tasks/TheTaskForm';

import App from './App.vue'

const pinia = createPinia()

const router = createRouter ({
  history: createWebHistory (),
  routes: [
    {
      path: '/tasks',
      component: TheTaskApp,
      children: [
        {
          path: '',
          name: 'TaskTable',
          component: TheTaskTable
        },
        {
          path: '/import',
          name: 'TaskForm',
          component: TheTaskForm
        }
      ]
    },
    {
      path: '/categories',
      component: TheCategory
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