import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Discover from '../components/Discover.vue'
import Mv from '../components/Mv.vue'
import Mvs from '../components/Mvs.vue'
import Playlists from '../components/Playlists.vue'
import Playlist from '../components/Playlist.vue'
import Result from '../components/Result.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/discover',
    children: [
      { path: '/discover', component: Discover },
      { path: '/playlists', component: Playlists },
      { path: '/playlist', component: Playlist },
      { path: '/mv', component: Mv },
      { path: '/mvs', component: Mvs },
      { path: '/result', component: Result }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
