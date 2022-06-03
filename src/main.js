import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import {
  store
} from '@/store/store';
// import axios from 'axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.config.productionTip = false
Vue.use(Loading);


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
