import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Discover from '../components/Discover.vue'
import Mv from '../components/Mv.vue'
import Mvs from '../components/Mvs.vue'
import Playlists from '../components/Playlists.vue'
import Playlist from '../components/Playlist.vue'
import Result from '../components/Result.vue'
import Myplaylist from '../components/Myplaylist.vue'
import Player from '../components/Player.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/discover',
    children: [
      {
        path: '/discover',
        component: Discover,
        meta: {
          keepAlive: true // 需要被缓存
        }
      },
      {
        path: '/playlists',
        component: Playlists,
        meta: {
          keepAlive: true // 需要被缓存
        }
      },
      {
        path: '/playlist',
        component: Playlist,
        meta: {
          keepAlive: false
        }
      },
      {
        path: '/mv',
        component: Mv,
        meta: {
          keepAlive: false
        }
      },
      {
        path: '/mvs',
        component: Mvs,
        meta: {
          keepAlive: true // 需要被缓存
        }
      },
      {
        path: '/result',
        component: Result,
        meta: {
          keepAlive: false
        }
      },
      {
        path: '/myplaylist',
        component: Myplaylist,
        meta: {
          keepAlive: true // 需要被缓存
        }
      },
      {
        path: '/player',
        component: Player,
        meta: {
          keepAlive: false
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
