<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useLiveStore } from '../stores/live'
import { useThemeStore } from '../stores/theme'
import LiveSubCounter from './LiveSubCounter.vue'
import LiveNotification from './LiveNotification.vue'
import {
  Menu,
  X,
  ShoppingCart,
  Youtube,
  Instagram,
  Twitter,
  MessageCircle,
  Flame,
  Sun,
  Moon
} from 'lucide-vue-next'

const cartStore = useCartStore()
const liveStore = useLiveStore()
const themeStore = useThemeStore()
const route = useRoute()
const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Merch', path: '/merch' },
  { name: 'Lava News', path: '/news' },
  { name: 'Guild Test', path: '/guild-test' },
  { name: 'Giveaways', path: '/giveaways' },
  { name: 'Contact', path: '/contact' }
]

const socialLinks = [
  { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@akshayakz' },
  { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/akshayakz' },
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/akshayakz' },
  { name: 'Discord', icon: MessageCircle, url: 'http://discord.com/invite/k8K74CKD' }
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <LiveNotification />
    
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 glass">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 md:h-20">
          <!-- Logo -->
          <RouterLink to="/" class="flex items-center gap-2 group" @click="closeMobileMenu">
            <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-glow">
              <Flame class="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
            <div class="flex flex-col">
              <span class="text-lg md:text-xl font-heading font-bold text-white group-hover:text-primary transition-colors">
                TEAM LAVA
              </span>
              <span class="text-xs text-text-muted hidden sm:block">Akshay Akz</span>
            </div>
          </RouterLink>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center gap-8">
            <RouterLink
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              class="relative font-medium text-sm uppercase tracking-wider transition-colors hover:text-primary"
              :class="route.path === link.path ? 'text-primary' : 'text-white'"
            >
              {{ link.name }}
              <span
                v-if="route.path === link.path"
                class="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent"
              ></span>
            </RouterLink>
          </div>

          <!-- Right Actions -->
          <div class="flex items-center gap-2 sm:gap-4">
            <!-- Theme Toggle -->
            <button
              @click="themeStore.toggleTheme"
              class="theme-toggle"
              :aria-label="themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <Sun v-if="themeStore.isDark" class="w-5 h-5" />
              <Moon v-else class="w-5 h-5" />
            </button>

            <!-- Cart -->
            <RouterLink to="/merch" class="relative p-2 hover:text-primary transition-colors">
              <ShoppingCart class="w-6 h-6" />
              <span
                v-if="cartStore.totalItems > 0"
                class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-xs font-bold flex items-center justify-center animate-pulse"
              >
                {{ cartStore.totalItems }}
              </span>
            </RouterLink>

            <!-- Mobile Menu Button -->
            <button
              @click="toggleMobileMenu"
              class="lg:hidden p-2 hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
              <X v-else class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div
          v-if="isMobileMenuOpen"
          class="lg:hidden absolute top-full left-0 right-0 glass border-t border-white/10"
        >
          <div class="px-4 py-6 space-y-4">
            <RouterLink
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              @click="closeMobileMenu"
              class="block py-3 px-4 rounded-lg font-medium uppercase tracking-wider transition-all hover:bg-primary/20 hover:text-primary"
              :class="route.path === link.path ? 'bg-primary/20 text-primary' : 'text-white'"
            >
              {{ link.name }}
            </RouterLink>
          </div>
        </div>
      </Transition>
    </nav>

    <!-- Main Content -->
    <main class="flex-1 pt-16 md:pt-20">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-surface border-t border-white/10 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Brand -->
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Flame class="w-6 h-6 text-white" />
              </div>
              <span class="text-xl font-heading font-bold">TEAM LAVA</span>
            </div>
            <p class="text-text-muted text-sm">
              Official website of Akshay Akz. Gaming content, merchandise, and Team Lava community.
            </p>
          </div>

          <!-- Quick Links -->
          <div class="space-y-4">
            <h4 class="font-heading text-lg font-semibold text-secondary">Quick Links</h4>
            <div class="grid grid-cols-2 gap-2">
              <RouterLink
                v-for="link in navLinks"
                :key="link.path"
                :to="link.path"
                class="text-text-muted hover:text-primary transition-colors text-sm"
              >
                {{ link.name }}
              </RouterLink>
            </div>
          </div>

          <!-- Social -->
          <div class="space-y-4">
            <h4 class="font-heading text-lg font-semibold text-secondary">Connect</h4>
            <div class="flex gap-4">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
                :aria-label="social.name"
              >
                <component :is="social.icon" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <!-- Bottom -->
        <div class="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-text-muted text-sm">
            © 2026 Team Lava. All rights reserved.
          </p>
          <p class="text-text-muted text-sm flex items-center gap-1">
            Made with <Flame class="w-4 h-4 text-primary" /> by Team Lava
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
