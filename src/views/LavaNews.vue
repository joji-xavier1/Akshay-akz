<script setup>
import { ref, onMounted } from 'vue'
import { ArrowRight, Calendar, Clock, Flame } from 'lucide-vue-next'
import ComingSoon from '../components/ComingSoon.vue'

const isVisible = ref(false)
const isComingSoon = ref(true)

const newsArticles = ref([
  {
    id: 1,
    title: 'Team Lava Wins National Championship!',
    date: '2026-01-05',
    readTime: '5 min',
    excerpt: 'An incredible victory as Team Lava dominates the finals with a stunning 3-0 sweep against the defending champions. The match showcased exceptional teamwork and strategic gameplay that left fans amazed.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600',
    category: 'Esports'
  },
  {
    id: 2,
    title: 'New Merch Drop Coming This Week',
    date: '2026-01-03',
    readTime: '3 min',
    excerpt: 'Get ready for the exclusive limited edition collection featuring the new Team Lava 2026 design. Pre-orders will be available starting Saturday with early bird discounts!',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
    category: 'Merchandise'
  },
  {
    id: 3,
    title: 'Akshay Akz Hits 2 Million Subscribers!',
    date: '2025-12-28',
    readTime: '4 min',
    excerpt: 'A massive milestone for the channel! Thank you to the entire Lava Army for making this possible. Special giveaway announced to celebrate this achievement.',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600',
    category: 'Milestone'
  },
  {
    id: 4,
    title: 'Behind the Scenes: Gaming Setup Tour 2026',
    date: '2025-12-20',
    readTime: '6 min',
    excerpt: 'Take a look at the completely redesigned streaming setup! New RGB lighting, upgraded PC specs, and the ultimate gaming chair setup that took months to perfect.',
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600',
    category: 'Lifestyle'
  },
  {
    id: 5,
    title: 'Collaboration Announcement: Major Gaming Brand Partnership',
    date: '2025-12-15',
    readTime: '4 min',
    excerpt: 'Excited to announce a major partnership with one of the biggest gaming peripheral brands! More details coming soon about exclusive products and giveaways.',
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600',
    category: 'Partnership'
  },
  {
    id: 6,
    title: 'Team Lava Discord: New Channels and Features',
    date: '2025-12-10',
    readTime: '3 min',
    excerpt: 'We have added new voice channels, game-specific rooms, and exclusive member perks to the Discord server. Join now to access all the new features!',
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=600',
    category: 'Community'
  }
])

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

onMounted(() => {
  setTimeout(() => isVisible.value = true, 100)
})
</script>

<template>
  <div v-if="isComingSoon">
    <ComingSoon 
      title="LAVA NEWS" 
      description="Stay tuned for the latest gossip, tournament updates, and epic milestones. We're refining our news delivery system!"
    />
  </div>
  <div v-else class="min-h-screen py-8 lg:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div 
        class="text-center mb-12 transition-all duration-700"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
          <span class="text-gradient">LAVA</span> NEWS
        </h1>
        <p class="text-text-muted max-w-2xl mx-auto">
          Stay updated with the latest announcements, tournament results, and community updates.
        </p>
      </div>

      <!-- Featured Article -->
      <article 
        class="card mb-12 overflow-hidden transition-all duration-700 delay-100"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <div class="grid lg:grid-cols-2 gap-6">
          <div class="relative aspect-video lg:aspect-auto lg:min-h-[300px] rounded-lg overflow-hidden">
            <img
              :src="newsArticles[0].image"
              :alt="newsArticles[0].title"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <span class="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold flex items-center gap-1">
              <Flame class="w-3 h-3" />
              Featured
            </span>
          </div>
          <div class="flex flex-col justify-center py-2">
            <div class="flex items-center gap-4 text-sm text-text-muted mb-3">
              <span class="flex items-center gap-1">
                <Calendar class="w-4 h-4" />
                {{ formatDate(newsArticles[0].date) }}
              </span>
              <span class="flex items-center gap-1">
                <Clock class="w-4 h-4" />
                {{ newsArticles[0].readTime }} read
              </span>
            </div>
            <span class="text-primary text-sm font-medium uppercase tracking-wider">
              {{ newsArticles[0].category }}
            </span>
            <h2 class="text-2xl sm:text-3xl font-heading font-bold mt-2 hover:text-primary transition-colors cursor-pointer">
              {{ newsArticles[0].title }}
            </h2>
            <p class="text-text-muted mt-4 line-clamp-3">
              {{ newsArticles[0].excerpt }}
            </p>
            <button class="btn-primary mt-6 inline-flex items-center gap-2 self-start">
              Read Full Article
              <ArrowRight class="w-5 h-5" />
            </button>
          </div>
        </div>
      </article>

      <!-- Articles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="(article, index) in newsArticles.slice(1)"
          :key="article.id"
          class="card group cursor-pointer overflow-hidden transition-all duration-700"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          :style="{ transitionDelay: `${(index + 2) * 100}ms` }"
        >
          <div class="relative aspect-video rounded-lg overflow-hidden mb-4">
            <img
              :src="article.image"
              :alt="article.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <span 
              class="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium glass"
            >
              {{ article.category }}
            </span>
          </div>
          
          <div class="flex items-center gap-4 text-xs text-text-muted mb-2">
            <span class="flex items-center gap-1">
              <Calendar class="w-3 h-3" />
              {{ formatDate(article.date) }}
            </span>
            <span class="flex items-center gap-1">
              <Clock class="w-3 h-3" />
              {{ article.readTime }}
            </span>
          </div>
          
          <h3 class="font-heading text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
            {{ article.title }}
          </h3>
          
          <p class="text-text-muted text-sm mt-2 line-clamp-2">
            {{ article.excerpt }}
          </p>
          
          <span class="inline-flex items-center gap-1 text-primary mt-4 text-sm font-medium group-hover:gap-2 transition-all">
            Read More <ArrowRight class="w-4 h-4" />
          </span>
        </article>
      </div>

      <!-- Load More -->
      <div class="text-center mt-12">
        <button class="btn-secondary">
          Load More Articles
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
