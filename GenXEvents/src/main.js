import { createApp } from 'vue';
import App from './App.vue';
import router from './routers/routers.js';
import PrimeVue from 'primevue/config'; // Import PrimeVue config

// Import PrimeVue components
import Dropdown from 'primevue/dropdown';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
import Tree from 'primevue/tree';
import Toast from 'primevue/toast';
import Toolbar from 'primevue/toolbar';

// Import PrimeVue CSS files
import 'primevue/resources/themes/aura-light-amber/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

// Import MDB Vue UI Kit CSS file
// import 'mdb-vue-ui-kit/css/mdb.min.css';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.use(vuetify)
app.component('Dropdown', Dropdown)
app.component('Divider', Divider)
app.component('Card', Card)
app.component('Tree', Tree)
app.component('Toast', Toast)
app.component('Toolbar', Toolbar)

app.mount('#app')

