<script setup>
import { ref, onMounted } from 'vue'
import { useGiveawayStore } from '../stores/giveaway'
import { Trophy, Calendar, Users, Gift, ExternalLink, ChevronRight, Crown } from 'lucide-vue-next'
import GiveawayParticipationFlow from '../components/GiveawayParticipationFlow.vue'

const giveawayStore = useGiveawayStore()
const isVisible = ref(false)
const showFlowModal = ref(false)
const selectedGiveaway = ref(null)

const handleEnterGiveaway = (giveaway) => {
  if (giveaway.requiresFlow) {
    selectedGiveaway.value = giveaway
    showFlowModal.value = true
  } else {
    giveawayStore.enterGiveaway(giveaway.id)
  }
}

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
  <div class="min-h-screen py-8 lg:py-16 relative">
    
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <GiveawayParticipationFlow 
        v-if="showFlowModal && selectedGiveaway" 
        :giveaway="selectedGiveaway"
        @close="showFlowModal = false"
        @complete="showFlowModal = false"
      />
    </Transition>

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



      <!-- Active Giveaways -->
      <section 
        class="mb-16 transition-all duration-700 delay-200"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <h2 class="text-2xl sm:text-3xl font-heading font-bold mb-8 flex items-center gap-3">
          <span class="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
          ACTIVE GIVEAWAYS
        </h2>
        
        <div v-if="giveawayStore.activeGiveaways.length > 0" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
              @click="handleEnterGiveaway(giveaway)"
              class="btn-primary w-full mt-6 flex items-center justify-center gap-2"
            >
              Enter Giveaway
              <ExternalLink class="w-4 h-4" />
            </button>
          </article>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16 card bg-surface/50 border-dashed border-2 border-white/10">
          <div class="w-16 h-16 mx-auto rounded-full bg-surface-elevated flex items-center justify-center mb-4">
            <Gift class="w-8 h-8 text-text-muted" />
          </div>
          <h3 class="font-heading text-xl font-bold mb-2">No Active Giveaways</h3>
          <p class="text-text-muted max-w-md mx-auto">
            There are currently no active giveaways running. Join our Discord to get notified about upcoming contests!
          </p>
          <a 
            href="http://discord.com/invite/k8K74CKD" 
            target="_blank"
            class="btn-secondary inline-flex items-center gap-2 mt-6"
          >
            Join Discord
            <ExternalLink class="w-4 h-4" />
          </a>
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
