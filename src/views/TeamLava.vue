<script setup>
import { ref, onMounted } from 'vue'
import { MessageCircle, Users, Trophy, Gamepad2, Shield, Flame, Heart, ExternalLink } from 'lucide-vue-next'

const isVisible = ref(false)

const guildStats = [
  { icon: Users, label: 'Members', value: '50,000+' },
  { icon: Trophy, label: 'Tournaments Won', value: '50+' },
  { icon: Gamepad2, label: 'Active Players', value: '1,000+' },
  { icon: Shield, label: 'Verified Guild', value: 'Level 3' }
]

const fanArt = ref([
  { id: 1, image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400', artist: '@gamer_art_01' },
  { id: 2, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400', artist: '@digital_lava' },
  { id: 3, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400', artist: '@fire_designs' },
  { id: 4, image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f0f9c?w=400', artist: '@team_lava_fan' },
  { id: 5, image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400', artist: '@gaming_artist' },
  { id: 6, image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400', artist: '@akz_fanclub' },
  { id: 7, image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b08?w=400', artist: '@creative_gamer' },
  { id: 8, image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400', artist: '@lava_designs' },
  { id: 9, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400', artist: '@gaming_vibes' }
])

onMounted(() => {
  setTimeout(() => isVisible.value = true, 100)
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 lg:py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-primary/30 via-background to-background"></div>
      <div class="absolute inset-0">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      </div>
      
      <div 
        class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mb-6 animate-glow">
          <Flame class="w-12 h-12 text-white" />
        </div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-4">
          <span class="text-gradient">TEAM LAVA</span>
        </h1>
        <p class="text-xl text-text-muted max-w-2xl mx-auto mb-8">
          The ultimate gaming community. Join thousands of passionate gamers, compete in tournaments, and become part of the Lava family.
        </p>
        
        <!-- Guild Stats -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          <div
            v-for="stat in guildStats"
            :key="stat.label"
            class="card py-6"
          >
            <component :is="stat.icon" class="w-8 h-8 text-secondary mx-auto mb-2" />
            <p class="text-2xl font-heading font-bold text-white">{{ stat.value }}</p>
            <p class="text-sm text-text-muted">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Discord Section -->
    <section 
      class="py-16 lg:py-24 transition-all duration-700 delay-200"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative rounded-3xl overflow-hidden">
          <!-- Background -->
          <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
          <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=1200')] bg-cover bg-center opacity-20"></div>
          
          <div class="relative p-8 sm:p-12 lg:p-16">
            <div class="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
                  <MessageCircle class="w-5 h-5" />
                  <span class="font-medium">Official Discord Server</span>
                </div>
                <h2 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
                  JOIN OUR DISCORD
                </h2>
                <p class="text-lg text-white/80 mb-8">
                  Connect with fellow gamers, participate in exclusive events, get early access to giveaways, and chat directly with Akshay Akz!
                </p>
                <ul class="space-y-3 mb-8">
                  <li class="flex items-center gap-3">
                    <div class="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                    </div>
                    <span>Exclusive gaming channels</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <div class="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                    </div>
                    <span>Weekly giveaways & events</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <div class="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                    </div>
                    <span>Voice chat with the community</span>
                  </li>
                </ul>
                <a
                  href="https://discord.gg/teamlava"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-600 font-bold text-lg hover:bg-white/90 transition-all hover:scale-105 hover:shadow-xl hover:shadow-white/20"
                >
                  <MessageCircle class="w-6 h-6" />
                  Join Discord Server
                  <ExternalLink class="w-5 h-5" />
                </a>
              </div>
              
              <div class="hidden lg:block relative">
                <div class="absolute inset-0 bg-gradient-to-t from-indigo-600/50 to-transparent rounded-2xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=600"
                  alt="Discord Community"
                  class="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Fan Art Gallery -->
    <section 
      class="py-16 lg:py-24 bg-surface transition-all duration-700 delay-300"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-heading font-bold mb-4">
            <span class="text-gradient">FAN ART</span> GALLERY
          </h2>
          <p class="text-text-muted max-w-2xl mx-auto">
            Amazing artwork created by our talented community. Tag us to get featured!
          </p>
        </div>

        <!-- Masonry Grid -->
        <div class="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          <div
            v-for="(art, index) in fanArt"
            :key="art.id"
            class="break-inside-avoid group relative rounded-xl overflow-hidden cursor-pointer"
            :class="index % 3 === 0 ? 'aspect-[4/5]' : index % 3 === 1 ? 'aspect-square' : 'aspect-[4/3]'"
          >
            <img
              :src="art.image"
              :alt="`Fan art by ${art.artist}`"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div class="absolute bottom-4 left-4 right-4">
                <p class="text-sm font-medium flex items-center gap-2">
                  <Heart class="w-4 h-4 text-primary" />
                  {{ art.artist }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <button class="btn-secondary">
            Submit Your Art
          </button>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-16 lg:py-24">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl font-heading font-bold mb-6">
          ABOUT <span class="text-gradient">TEAM LAVA</span>
        </h2>
        <p class="text-lg text-text-muted leading-relaxed">
          Team Lava was founded in 2020 with a simple mission: to create the most passionate and supportive gaming community in India. What started as a small group of friends has grown into a movement of over 50,000 members. We compete at the highest levels, support each other through every victory and defeat, and most importantly - we have fun together. Whether you're a casual player or aspiring pro, there's a place for you in Team Lava.
        </p>
      </div>
    </section>
  </div>
</template>
