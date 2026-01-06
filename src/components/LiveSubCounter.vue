
<script setup>
import { onMounted, watch, ref } from 'vue'
import { useLiveStore } from '../stores/live'
import { Users } from 'lucide-vue-next'

const liveStore = useLiveStore()
const displayCount = ref(0)

onMounted(() => {
  // Initialize with store value
  displayCount.value = liveStore.subscriberCount
})

// Simple animation for number changes
watch(() => liveStore.subscriberCount, (newVal) => {
  const duration = 1000
  const start = displayCount.value
  const startTime = performance.now()

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // Ease out quart
    const ease = 1 - Math.pow(1 - progress, 4)
    
    displayCount.value = Math.round(start + (newVal - start) * ease)

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  
  requestAnimationFrame(animate)
})
</script>

<template>
  <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/50 border border-white/5 backdrop-blur-md">
    <div class="relative">
      <Users class="w-4 h-4 text-primary" />
      <span class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" v-if="liveStore.isLive"></span>
    </div>
    <div class="flex flex-col leading-none">
      <span class="text-xs text-text-muted uppercase tracking-wider font-medium">Subscribers</span>
      <span class="text-sm font-bold text-white font-heading tabular-nums">
        {{ new Intl.NumberFormat('en-US').format(displayCount) }}
      </span>
    </div>
  </div>
</template>
