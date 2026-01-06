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
    <section class="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <!-- Background Gradient (Subtle Professional) -->
      <div class="absolute inset-0 bg-background">
         <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-40"></div>
      </div>
      
      <div
        class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-all duration-1000"
        :class="isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <!-- Text Content -->
          <div class="text-center lg:text-left space-y-8">
            <div class="space-y-4">
              <h1 class="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold leading-tight tracking-tight">
                <span class="text-white">Define Your</span>
                <br />
                <span class="text-gradient">Gaming Legacy</span>
              </h1>
              
              <p class="text-lg text-text-muted max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Premium apparel and accessories for the modern gamer. Join a community that values excellence, style, and performance.
              </p>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <RouterLink
                to="/merch"
                class="btn-primary inline-flex items-center justify-center gap-2"
              >
                <ShoppingBag class="w-5 h-5" />
                Shop Collection
              </RouterLink>
              <a 
                href="https://discord.gg/akshayakz" 
                target="_blank"
                class="btn-secondary inline-flex items-center justify-center gap-2"
              >
                <Users class="w-5 h-5" />
                Join Community
              </a>
            </div>

            <div class="pt-8 flex items-center justify-center lg:justify-start gap-8 text-text-muted text-sm">
              <div class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Premium Quality
              </div>
              <div class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Global Shipping
              </div>
              <div class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                24/7 Support
              </div>
            </div>
          </div>

          <!-- Hero Image/Visual (Professional Showcase) -->
          <div class="relative group animate-fade-in-up" style="animation-delay: 0.2s;">
            <div class="absolute -inset-1 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl blur-2xl opacity-50"></div>
            <div class="relative rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
              <img 
                 src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" 
                 alt="Akshay Akz Collection" 
                 class="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
              />
              
              <!-- Floating Card Style Element -->
              <div class="absolute bottom-6 left-6 right-6 p-4 glass rounded-xl flex items-center justify-between">
                 <div>
                    <p class="text-xs text-text-muted uppercase tracking-wider">Latest Drop</p>
                    <p class="text-white font-medium">Summer Collection '26</p>
                 </div>
                 <div class="h-8 w-8 rounded-full bg-white text-background flex items-center justify-center">
                    <ArrowRight class="w-4 h-4" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section (Clean Minimalist) -->
    <section 
      class="py-12 border-y border-white/5 bg-surface/30 transition-all duration-700"
      :class="isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="py-4 sm:py-0"
          >
            <p class="text-4xl font-heading font-bold text-white mb-1">{{ stat.value }}</p>
            <p class="text-sm text-text-muted uppercase tracking-wider">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Reference Collection Section -->
    <section 
      class="py-16 lg:py-24 transition-all duration-700"
      :class="isVisible.merch ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-12">
          <div>
            <h2 class="text-3xl lg:text-4xl font-heading font-bold text-white tracking-tight">
              Selected <span class="text-gradient">Collection</span>
            </h2>
            <p class="text-text-muted mt-2 max-w-lg">
              Explore our premium range of apparel designed for comfort and style.
            </p>
          </div>
          <RouterLink to="/merch" class="hidden sm:flex items-center gap-2 text-primary hover:text-white transition-colors text-sm font-medium uppercase tracking-widest group">
            View All Products
            <ArrowRight class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="item in merchItems"
            :key="item.id"
            class="card group cursor-pointer overflow-hidden border-0 bg-surface/50 hover:bg-surface"
          >
            <div class="relative aspect-[4/5] rounded-lg overflow-hidden mb-6 bg-surface">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span
                v-if="item.badge"
                class="absolute top-4 left-4 px-3 py-1 bg-white text-background text-xs font-bold uppercase tracking-wider"
              >
                {{ item.badge }}
              </span>
            </div>
            
            <div class="space-y-2">
               <h3 class="font-heading text-xl font-medium text-white group-hover:text-primary transition-colors">
                 {{ item.name }}
               </h3>
               <p class="text-text-muted">{{ formatPrice(item.price) }}</p>
            </div>
          </div>
        </div>

        <RouterLink to="/merch" class="sm:hidden btn-primary w-full mt-8 flex items-center justify-center gap-2">
          <ShoppingBag class="w-5 h-5" />
          Shop Collection
        </RouterLink>
      </div>
    </section>

    <!-- Community Updates Section -->
    <section 
      class="py-16 lg:py-24 bg-surface/30 border-t border-white/5 transition-all duration-700"
      :class="isVisible.news ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-12">
          <div>
            <h2 class="text-3xl lg:text-4xl font-heading font-bold text-white tracking-tight">
              Community <span class="text-gradient">Updates</span>
            </h2>
            <p class="text-text-muted mt-2">Latest stories and announcements.</p>
          </div>
          <RouterLink to="/news" class="hidden sm:flex items-center gap-2 text-primary hover:text-white transition-colors text-sm font-medium uppercase tracking-widest group">
            Read All Stories <ArrowRight class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <article
            v-for="article in newsItems"
            :key="article.id"
            class="group cursor-pointer flex flex-col sm:flex-row gap-6 items-start"
          >
            <div class="w-full sm:w-64 aspect-video sm:aspect-[4/3] rounded-lg overflow-hidden flex-shrink-0 bg-surface">
              <img
                :src="article.image"
                :alt="article.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div class="flex flex-col h-full pt-2">
              <time class="text-xs text-primary font-medium uppercase tracking-wider mb-2">{{ formatDate(article.date) }}</time>
              <h3 class="font-heading text-xl font-bold text-white group-hover:text-primary transition-colors line-clamp-2 mb-3">
                {{ article.title }}
              </h3>
              <p class="text-text-muted text-sm leading-relaxed line-clamp-2 mb-4">{{ article.excerpt }}</p>
              <span class="inline-flex items-center gap-1 text-white text-xs font-medium uppercase tracking-widest group-hover:text-primary transition-colors mt-auto">
                Read Article
              </span>
            </div>
          </article>
        </div>

        <RouterLink to="/news" class="sm:hidden btn-primary w-full mt-8 flex items-center justify-center gap-2">
          <Newspaper class="w-5 h-5" />
          View All Updates
        </RouterLink>
      </div>
    </section>

    <!-- Professional CTA Section -->
    <section class="py-24 relative overflow-hidden bg-surface">
      <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
      
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-white">
          Join the <span class="text-gradient">Community</span>
        </h2>
        <p class="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
          Connect with thousands of other members on our Discord server. Participate in events, get exclusive updates, and be part of the future of gaming.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a href="https://discord.gg/akshayakz" target="_blank" class="btn-primary inline-flex items-center justify-center gap-2 min-w-[160px]">
            <Users class="w-5 h-5" />
            Join Discord
          </a>
          <RouterLink to="/contact" class="btn-secondary inline-flex items-center justify-center gap-2 min-w-[160px]">
            <ArrowRight class="w-5 h-5" />
            Contact Us
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
