<script setup>
import { ref, onMounted } from 'vue'
import { useGiveawayStore } from '../stores/giveaway'
import { Trophy, Calendar, Users, Gift, ExternalLink, ChevronRight, Crown } from 'lucide-vue-next'

const giveawayStore = useGiveawayStore()
const isVisible = ref(false)

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const getDaysRemaining = (dateStr) => {
  const diff = new Date(dateStr) - new Date()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

onMounted(() => {
  setTimeout(() => isVisible.value = true, 100)
})
</script>

<template>
  <div class="min-h-screen py-8 lg:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div 
        class="text-center mb-12 transition-all duration-700"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
          <span class="text-gradient">GIVEAWAYS</span> & CONTESTS
        </h1>
        <p class="text-text-muted max-w-2xl mx-auto">
          Participate in exclusive giveaways and win amazing prizes. Good luck!
        </p>
      </div>

      <!-- Winners Wall (Marquee) -->
      <div 
        class="mb-12 overflow-hidden bg-surface rounded-2xl py-4 transition-all duration-700 delay-100"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <div class="flex items-center gap-4 px-4 mb-3">
          <Crown class="w-6 h-6 text-secondary" />
          <h3 class="font-heading font-semibold text-secondary">WINNERS WALL</h3>
        </div>
        <div class="relative">
          <div class="flex animate-marquee whitespace-nowrap">
            <div
              v-for="(winner, index) in [...giveawayStore.winners, ...giveawayStore.winners]"
              :key="index"
              class="inline-flex items-center gap-2 mx-4 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30"
            >
              <Trophy class="w-4 h-4 text-secondary" />
              <span class="font-medium">{{ winner }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Giveaways -->
      <section 
        class="mb-16 transition-all duration-700 delay-200"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <h2 class="text-2xl sm:text-3xl font-heading font-bold mb-8 flex items-center gap-3">
          <span class="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
          ACTIVE GIVEAWAYS
        </h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <article
            v-for="giveaway in giveawayStore.activeGiveaways"
            :key="giveaway.id"
            class="card group overflow-hidden"
          >
            <div class="relative aspect-video rounded-lg overflow-hidden mb-4">
              <img
                :src="giveaway.image"
                :alt="giveaway.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div class="absolute bottom-3 left-3 right-3">
                <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500 text-xs font-bold">
                  <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  {{ getDaysRemaining(giveaway.endDate) }} days left
                </span>
              </div>
            </div>
            
            <h3 class="font-heading text-xl font-bold group-hover:text-primary transition-colors">
              {{ giveaway.title }}
            </h3>
            
            <p class="text-text-muted text-sm mt-2">{{ giveaway.description }}</p>
            
            <div class="flex items-center gap-4 mt-4 text-sm text-text-muted">
              <span class="flex items-center gap-1">
                <Gift class="w-4 h-4 text-secondary" />
                {{ giveaway.prize }}
              </span>
              <span class="flex items-center gap-1">
                <Users class="w-4 h-4" />
                {{ giveaway.participants.toLocaleString() }}
              </span>
            </div>
            
            <div class="mt-4 pt-4 border-t border-white/10">
              <p class="text-xs text-text-muted mb-2 font-medium">Requirements:</p>
              <ul class="space-y-1">
                <li
                  v-for="(req, index) in giveaway.requirements"
                  :key="index"
                  class="flex items-center gap-2 text-sm"
                >
                  <ChevronRight class="w-4 h-4 text-primary" />
                  {{ req }}
                </li>
              </ul>
            </div>
            
            <button
              @click="giveawayStore.enterGiveaway(giveaway.id)"
              class="btn-primary w-full mt-6 flex items-center justify-center gap-2"
            >
              Enter Giveaway
              <ExternalLink class="w-4 h-4" />
            </button>
          </article>
        </div>
      </section>

      <!-- Past Giveaways -->
      <section 
        class="transition-all duration-700 delay-300"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <h2 class="text-2xl sm:text-3xl font-heading font-bold mb-8 flex items-center gap-3">
          <Calendar class="w-6 h-6 text-text-muted" />
          PAST GIVEAWAYS
        </h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="giveaway in giveawayStore.pastGiveaways"
            :key="giveaway.id"
            class="card bg-surface/50 flex items-center gap-4"
          >
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
              <Trophy class="w-6 h-6 text-secondary" />
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="font-heading font-semibold truncate">{{ giveaway.title }}</h4>
              <p class="text-sm text-text-muted">{{ giveaway.prize }}</p>
              <p class="text-xs text-primary mt-1">
                Winner: <span class="font-medium">{{ giveaway.winner }}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Rules Section -->
      <section class="mt-16 card bg-surface/50 text-center">
        <h3 class="font-heading text-xl font-bold mb-4">GIVEAWAY RULES</h3>
        <p class="text-text-muted text-sm max-w-2xl mx-auto">
          All giveaways are open to participants worldwide. Winners are selected randomly using verified tools. You must complete all requirements to be eligible. Fake or duplicate entries will be disqualified. For questions, contact us via Discord or email.
        </p>
      </section>
    </div>
  </div>
</template>
