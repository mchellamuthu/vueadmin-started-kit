import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dashboard from './views/general/Dashboard.vue'
import Settings from './views/general/Settings.vue'
import Plans from './views/plans/List.vue'
import Products from './views/products/List.vue'
import Banners from './views/banners/List.vue'
import RollGift from './views/winners/Rollgift.vue'
import PlanDetails from './views/plans/Info.vue'
import About from './views/About.vue'
import Login from './views/auth/Login.vue'
import Logout from './views/auth/Logout.vue'
import PlansTableView from './views/plans/TableView.vue'

Vue.use(Router)

const router =  new Router({
  mode: "history",
  routes: [{
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/plans',
      name: 'plans',
      component: Plans,
      meta :{
        requiresAuth : true
      }
    },
    {
      path: '/products',
      name: 'products',
      component: Products,
      meta :{
        requiresAuth : true
      }
    },
    {
      path: '/banners',
      name: 'banners',
      component: Banners,
      meta :{
        requiresAuth : true
      }
    },
    {
      path: '/roll-gift',
      name: 'RollGift',
      component: RollGift,
      meta :{
        requiresAuth : true
      }
    },
    {
      path: '/plan/:id',
      name: 'Plan Details',
      component: PlanDetails,
      props:true,
      meta :{
        requiresAuth : true
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
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
    },
    {
      path: '/plans/table',
      name: 'plansTableview',
      component: PlansTableView,
       meta: {
         requiresAuth: true
       }
    }
  ]
})

export default router;
