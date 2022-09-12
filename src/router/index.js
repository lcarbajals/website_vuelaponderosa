import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: '/',
    component: Dashboard
  },
  /*
  {
    path: "*",
    name: "NotFound",
    property: {},
    children: [],
   component: () => import('../views/Error404.vue')
  }
  */
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
