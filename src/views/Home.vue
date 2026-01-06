<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useLiveStore } from '../stores/live'
import { 
  Play, 
  Users, 
  Eye, 
  Video, 
  Youtube, 
  MessageCircle, 
  Instagram, 
  Twitter,
  ArrowRight,
  ExternalLink
} from 'lucide-vue-next'

const liveStore = useLiveStore()

const isVisible = ref({
  hero: false,
  stats: false,
  community: false
})

const socialLinks = [
  { 
    name: 'YouTube', 
    icon: Youtube, 
    url: 'https://youtube.com/@akshayakz',
    color: 'from-red-500 to-red-600',
    description: 'Watch latest videos'
  },
  { 
    name: 'Discord', 
    icon: MessageCircle, 
    url: 'http://discord.com/invite/k8K74CKD',
    color: 'from-indigo-500 to-purple-600',
    description: 'Join our community'
  },
  { 
    name: 'Instagram', 
    icon: Instagram, 
    url: 'https://instagram.com/akshayakz',
    color: 'from-pink-500 to-orange-400',
    description: 'Behind the scenes'
  },
  { 
    name: 'Twitter', 
    icon: Twitter, 
    url: 'https://twitter.com/akshayakz',
    color: 'from-sky-400 to-blue-500',
    description: 'Latest updates'
  }
]

const stats = computed(() => [
  { 
    label: 'Subscribers', 
    value: liveStore.formattedSubCount || '2M+', 
    icon: Users,
    description: 'Growing community'
  },
  { 
    label: 'Total Views', 
    value: '500M+', 
    icon: Eye,
    description: 'And counting'
  },
  { 
    label: 'Videos', 
    value: '150+', 
    icon: Video,
    description: 'Premium content'
  }
])

onMounted(() => {
  setTimeout(() => isVisible.value.hero = true, 100)
  setTimeout(() => isVisible.value.stats = true, 300)
  setTimeout(() => isVisible.value.community = true, 500)
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0 bg-background">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/8 via-background to-background"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div
        class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center transition-all duration-1000"
        :class="isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <div class="space-y-6">
          <p class="text-primary text-sm font-medium uppercase tracking-widest">Welcome to</p>
          
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold leading-tight tracking-tight">
            <span class="text-white">Team</span>
            <span class="text-gradient"> Lava</span>
          </h1>
          
          <p class="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            Premium gaming content, epic tournaments, and a passionate community. Join millions of fans following Akshay Akz's gaming journey.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a 
              href="https://youtube.com/@akshayakz" 
              target="_blank"
              class="btn-primary inline-flex items-center justify-center gap-2"
            >
              <Youtube class="w-5 h-5" />
              Watch on YouTube
            </a>
            <a 
              href="http://discord.com/invite/k8K74CKD" 
              target="_blank"
              class="btn-secondary inline-flex items-center justify-center gap-2"
            >
              <MessageCircle class="w-5 h-5" />
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section 
      class="py-16 border-y border-white/5 bg-surface/30 transition-all duration-700"
      :class="isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-heading font-bold text-white mb-2">Channel Statistics</h2>
          <p class="text-text-muted text-sm">Real-time stats from YouTube</p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="card text-center group"
          >
            <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
              <component :is="stat.icon" class="w-6 h-6 text-primary" />
            </div>
            <p class="text-3xl font-heading font-bold text-white mb-1">{{ stat.value }}</p>
            <p class="text-sm text-text-muted uppercase tracking-wider">{{ stat.label }}</p>
            <p class="text-xs text-text-muted/70 mt-1">{{ stat.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Community Links Section -->
    <section 
      class="py-20 transition-all duration-700"
      :class="isVisible.community ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-heading font-bold text-white mb-3">
            Join the <span class="text-gradient">Community</span>
          </h2>
          <p class="text-text-muted max-w-lg mx-auto">
            Connect with Team Lava across all platforms. Be part of the gaming revolution.
          </p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group relative overflow-hidden rounded-xl p-6 bg-surface border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
          >
            <!-- Gradient background on hover -->
            <div 
              :class="`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`"
            ></div>
            
            <div class="relative">
              <div class="flex items-center justify-between mb-4">
                <div :class="`w-10 h-10 rounded-lg bg-gradient-to-br ${social.color} flex items-center justify-center`">
                  <component :is="social.icon" class="w-5 h-5 text-white" />
                </div>
                <ExternalLink class="w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
              </div>
              
              <h3 class="font-heading font-semibold text-white mb-1">{{ social.name }}</h3>
              <p class="text-sm text-text-muted">{{ social.description }}</p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-surface border-t border-white/5">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
          Ready to Join <span class="text-gradient">Team Lava</span>?
        </h2>
        <p class="text-text-muted mb-8 max-w-xl mx-auto">
          Subscribe to the channel and join our Discord to never miss an update, tournament, or community event.
        </p>
        <a 
          href="http://discord.com/invite/k8K74CKD" 
          target="_blank"
          class="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
        >
          <MessageCircle class="w-5 h-5" />
          Join Discord Server
          <ArrowRight class="w-5 h-5" />
        </a>
      </div>
    </section>
  </div>
</template>
