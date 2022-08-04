import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuestic from "@/lib/vuestic";

createApp(App)
  .use(router)
  .use(vuestic)
  .mount('#app')
