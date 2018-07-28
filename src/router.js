import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/auth/Login.vue'
import Logout from './views/auth/Logout.vue'

Vue.use(Router)

const router =  new Router({
  mode: "history",
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta :{
        requiresAuth : true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
       meta: {
         requiresAuth: true
       }
    }
  ]
})

export default router;
