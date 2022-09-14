import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import mixins from './mixins';
/* INSTALADOS */
import axios from 'axios';
import AOS from 'aos';

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
//window.Popper = require('popper.js').default;




require('./static/js/core');
//require('./static/js/sow.helper');

//require('./static/js/vendor.typed');
require('./static/js/vendor.aos');
//require('./static/js/vendor.leaflet');
//require('./static/js/vendor.swiper');

require('./static/js/vendor_bundle');
//AOS.init();
Vue.mixin(mixins);
Vue.prototype.$http=instance;
new Vue({
  store,
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
