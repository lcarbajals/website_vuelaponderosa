import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import mixins from './mixins';
/* INSTALADOS */
import axios from 'axios';

Vue.config.productionTip = false
window.baseUrl  = process.env.VUE_APP_ROOT_API;
window.tokenAPI = process.env.VUE_APP_TOKEN_API;//Para mi token API
window.baseCli  = process.env.VUE_APP_ROOT_CLI;

const instance  = axios.create({
  baseURL: window.baseUrl,
  headers: {
    'X-API-KEY': window.tokenAPI,
    'Content-type':'json',
  }
});

window.$ = window.jQuery = require('jquery');

window.AOS=require('aos');
window.Typed=require('typed.js');
require('./static/js/core.init');
require('./static/js/core');
require('./static/js/vendor_bundle.prev');
require('./static/js/vendor_bundle');

Vue.mixin(mixins);
Vue.prototype.$http=instance;
new Vue({
  store,
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
