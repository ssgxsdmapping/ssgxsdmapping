// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ToastMessage from './ToastMessage.js';

import {JavaTemplate,TemplatesId} from './JavaTemplate.js';

Vue.config.productionTip = false

//for caching
JavaTemplate.getStringFromTemplate(TemplatesId.CLASS_TEMPLATE)
  .catch(e => ToastMessage.displayError("An error occured while contacting the server !"));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});
