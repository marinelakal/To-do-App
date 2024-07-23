import { createApp } from 'vue';

import { VDateInput } from 'vuetify/labs/VDateInput'

import { createRouter, createWebHistory } from 'vue-router';

import TheTaskTable from './components/Tasks/TheTaskTable.vue' ;

import TheCategory from './components/Categories/TheCategory.vue' ;


import App from './App.vue'

const router = createRouter ({
  history: createWebHistory (),
  routes: [
    { path: '/tasks', component: TheTaskTable },
    { path: '/categories', component: TheCategory }
  ]
});



// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components: {
        ...components,
        VDateInput,
      },
    directives,
  })





createApp(App).use(router).use(vuetify).mount('#app');