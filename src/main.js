import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false
/* Lodash */
window._ = require('lodash');
/* Popper Js */
window.Popper = require('popper.js').default;
try {
  /* Jquery */
  window.$ = window.jQuery = require('jquery');
  /* Bootstrap */
  require('bootstrap');
} catch (e) {}
/* Axios */
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
let token = localStorage.getItem('user-token');
if (token) {
  window.axios.defaults.headers.common['Authorization'] = "Bearer " + token;
}
window.store = store;
window.axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
// window.axios.defaults.baseURL = 'https://systimanx.xyz/lottery/public/';

import Toasted from 'vue-toasted'
Vue.use(Toasted);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (localStorage.getItem('user-token') === null) {
      console.log('main beforeeach');
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {

    next() // make sure to always call next()!
  }
})

// axios.interceptors.request.use(function (config) {

//   return config
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error)
// })

// console.log('vue axios', axios.interceptors);

window.axios.interceptors.response.use(function (response) {
  // if (response.data.code === 401) {
  //   router.push({ path: '/signin' });
  // }
  return response
}, function (error) {
  if (error.response.status === 401 && (location.hash).indexOf('signup') < 0) {
    router.push({
      path: '/login'
    });
  }
  // Do something with response error
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
