<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Play, ShoppingBag, Newspaper, ArrowRight, Flame, Trophy, Users } from 'lucide-vue-next'

const isVisible = ref({
  hero: false,
  merch: false,
  news: false,
  stats: false
})

const merchItems = [
  {
    id: 1,
    name: 'Team Lava Hoodie',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
    badge: 'Best Seller'
  },
  {
    id: 2,
    name: 'Gaming Jersey',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400',
    badge: 'New'
  },
  {
    id: 3,
    name: 'Lava Phone Case',
    price: 599,
    image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=400',
    badge: null
  }
]

const newsItems = [
  {
    id: 1,
    title: 'Team Lava Wins National Championship!',
    date: '2026-01-05',
    excerpt: 'An incredible victory as Team Lava dominates the finals with a stunning 3-0 sweep...',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400'
  },
  {
    id: 2,
    title: 'New Merch Drop Coming This Week',
    date: '2026-01-03',
    excerpt: 'Get ready for the exclusive limited edition collection. Pre-orders open soon...',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'
  }
]

const stats = [
  { label: 'Subscribers', value: '2M+', icon: Users },
  { label: 'Views', value: '500M+', icon: Play },
  { label: 'Tournaments Won', value: '50+', icon: Trophy }
]

onMounted(() => {
  // Staggered animations
  setTimeout(() => isVisible.value.hero = true, 100)
  setTimeout(() => isVisible.value.stats = true, 300)
  setTimeout(() => isVisible.value.merch = true, 500)
  setTimeout(() => isVisible.value.news = true, 700)
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price)
}

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <!-- Background Gradient -->
      <div class="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background"></div>
      
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      </div>

      <div
        class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-all duration-1000"
        :class="isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <!-- Text Content -->
          <div class="text-center lg:text-left space-y-6">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/50">
              <span class="w-2 h-2 rounded-full bg-primary animate-pulse-live"></span>
              <span class="text-sm font-medium">🔴 LIVE NOW</span>
            </div>
            
            <h1 class="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold leading-tight">
              <span class="text-gradient">AKSHAY AKZ</span>
              <br />
              <span class="text-white">TEAM LAVA</span>
            </h1>
            
            <p class="text-lg text-text-muted max-w-xl mx-auto lg:mx-0">
              Join millions of fans in the ultimate gaming experience. Watch live streams, grab exclusive merch, and become part of the Lava family!
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="https://youtube.com/@akshayakz"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary inline-flex items-center justify-center gap-2"
              >
                <Play class="w-5 h-5" />
                Watch Now
              </a>
              <RouterLink to="/team" class="btn-secondary inline-flex items-center justify-center gap-2">
                <Flame class="w-5 h-5" />
                Join Team Lava
              </RouterLink>
            </div>
          </div>

          <!-- YouTube Embed -->
          <div class="relative group">
            <div class="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-2xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity"></div>
            <div class="relative aspect-video rounded-xl overflow-hidden border-2 border-white/10">
              <iframe
                class="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"
                title="Akshay Akz Latest Video"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section 
      class="py-12 bg-surface/50 transition-all duration-700"
      :class="isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="card flex items-center gap-4 hover:border-secondary/50"
          >
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <component :is="stat.icon" class="w-7 h-7 text-secondary" />
            </div>
            <div>
              <p class="text-2xl sm:text-3xl font-heading font-bold text-white">{{ stat.value }}</p>
              <p class="text-sm text-text-muted">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Top Merch Section -->
    <section 
      class="py-16 lg:py-24 transition-all duration-700"
      :class="isVisible.merch ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold">
              <span class="text-gradient">HOT</span> MERCH
            </h2>
            <p class="text-text-muted mt-2">Gear up with official Team Lava merchandise</p>
          </div>
          <RouterLink to="/merch" class="hidden sm:flex items-center gap-2 text-primary hover:text-accent transition-colors">
            View All <ArrowRight class="w-5 h-5" />
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="item in merchItems"
            :key="item.id"
            class="card group cursor-pointer overflow-hidden"
          >
            <div class="relative aspect-square rounded-lg overflow-hidden mb-4">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <span
                v-if="item.badge"
                class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold"
                :class="item.badge === 'Best Seller' ? 'bg-secondary text-background' : 'bg-primary text-white'"
              >
                {{ item.badge }}
              </span>
            </div>
            <h3 class="font-heading text-lg font-semibold group-hover:text-primary transition-colors">
              {{ item.name }}
            </h3>
            <p class="text-xl font-bold text-secondary mt-1">{{ formatPrice(item.price) }}</p>
          </div>
        </div>

        <RouterLink to="/merch" class="sm:hidden btn-primary w-full mt-6 flex items-center justify-center gap-2">
          <ShoppingBag class="w-5 h-5" />
          Shop All Merch
        </RouterLink>
      </div>
    </section>

    <!-- Latest News Section -->
    <section 
      class="py-16 lg:py-24 bg-surface transition-all duration-700"
      :class="isVisible.news ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold">
              <span class="text-gradient">LAVA</span> NEWS
            </h2>
            <p class="text-text-muted mt-2">Stay updated with the latest from Team Lava</p>
          </div>
          <RouterLink to="/news" class="hidden sm:flex items-center gap-2 text-primary hover:text-accent transition-colors">
            All News <ArrowRight class="w-5 h-5" />
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <article
            v-for="article in newsItems"
            :key="article.id"
            class="card group cursor-pointer flex flex-col sm:flex-row gap-4"
          >
            <div class="w-full sm:w-48 aspect-video sm:aspect-square rounded-lg overflow-hidden flex-shrink-0">
              <img
                :src="article.image"
                :alt="article.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div class="flex flex-col justify-center">
              <time class="text-sm text-primary font-medium">{{ formatDate(article.date) }}</time>
              <h3 class="font-heading text-xl font-semibold mt-1 group-hover:text-primary transition-colors line-clamp-2">
                {{ article.title }}
              </h3>
              <p class="text-text-muted mt-2 line-clamp-2">{{ article.excerpt }}</p>
              <span class="inline-flex items-center gap-1 text-secondary mt-3 text-sm font-medium">
                Read More <ArrowRight class="w-4 h-4" />
              </span>
            </div>
          </article>
        </div>

        <RouterLink to="/news" class="sm:hidden btn-primary w-full mt-6 flex items-center justify-center gap-2">
          <Newspaper class="w-5 h-5" />
          View All News
        </RouterLink>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 lg:py-24 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
      <div class="absolute inset-0">
        <div class="absolute top-0 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/30 rounded-full blur-3xl"></div>
      </div>
      
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
          JOIN THE <span class="text-gradient">LAVA ARMY</span>
        </h2>
        <p class="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
          Be part of the most epic gaming community. Join our Discord server and connect with thousands of fellow gamers!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/team" class="btn-primary inline-flex items-center justify-center gap-2">
            <Flame class="w-5 h-5" />
            Join Team Lava
          </RouterLink>
          <RouterLink to="/giveaways" class="btn-secondary inline-flex items-center justify-center gap-2">
            <Trophy class="w-5 h-5" />
            Active Giveaways
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
