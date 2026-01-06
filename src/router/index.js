import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Merch from '../views/Merch.vue'
import LavaNews from '../views/LavaNews.vue'
import TeamLava from '../views/TeamLava.vue'
import Giveaways from '../views/Giveaways.vue'
import Contact from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Home | Akshay Akz' }
  },
  {
    path: '/merch',
    name: 'Merch',
    component: Merch,
    meta: { title: 'Merchandise | Akshay Akz' }
  },
  {
    path: '/news',
    name: 'LavaNews',
    component: LavaNews,
    meta: { title: 'Lava News | Akshay Akz' }
  },
  {
    path: '/team',
    name: 'TeamLava',
    component: TeamLava,
    meta: { title: 'Team Lava | Akshay Akz' }
  },
  {
    path: '/giveaways',
    name: 'Giveaways',
    component: Giveaways,
    meta: { title: 'Giveaways | Akshay Akz' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: { title: 'Contact | Akshay Akz' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Akshay Akz | Team Lava'
  next()
})

export default router
