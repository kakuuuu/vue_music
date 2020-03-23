import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Discover from '../components/Discover.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [{ path: '/discover', component: Discover }]
  }
]

const router = new VueRouter({
  routes
})

export default router
