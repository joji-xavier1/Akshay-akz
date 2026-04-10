import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Merch from '../views/Merch.vue'
import LavaNews from '../views/LavaNews.vue'
import GuildTest from '../views/GuildTest.vue'
import Giveaways from '../views/Giveaways.vue'
import Contact from '../views/Contact.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'

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
    path: '/guild-test',
    name: 'GuildTest',
    component: GuildTest,
    meta: { title: 'Guild Test | Akshay Akz' }
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
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy,
    meta: { title: 'Privacy Policy | Akshay Akz' }
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
