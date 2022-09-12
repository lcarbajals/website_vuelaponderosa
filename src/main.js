import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import mixins from './mixins';
/* INSTALADOS */

Vue.config.productionTip = false
window.baseUrl  = process.env.VUE_APP_ROOT_API;
window.tokenAPI = process.env.VUE_APP_TOKEN_API;//Para mi token API

Vue.mixin(mixins);
new Vue({
  store,
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
