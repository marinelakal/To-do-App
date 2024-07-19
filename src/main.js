import { createApp } from 'vue';

import { VDateInput } from 'vuetify/labs/VDateInput'


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


import App from './App.vue'

createApp(App).use(vuetify).mount('#app');