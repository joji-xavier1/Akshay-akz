
<script setup>
import { watch, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useLiveStore } from '../stores/live'
import { Users } from 'lucide-vue-next'

const liveStore = useLiveStore()
const { subscriberCount, isLive } = storeToRefs(liveStore)
const displayCount = ref(0)

// Watch with immediate: true to catch initial load
watch(subscriberCount, (newVal, oldVal) => {
  // Skip animation for initial load (from 0)
  if (oldVal === 0 || oldVal === undefined) {
    displayCount.value = newVal
    return
  }

  // Animate for subsequent updates
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
}, { immediate: true })
</script>

<template>
  <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/50 border border-white/5 backdrop-blur-md">
    <div class="relative">
      <Users class="w-4 h-4 text-primary" />
      <span class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" v-if="isLive"></span>
    </div>
    <div class="flex flex-col leading-none">
      <span class="text-xs text-text-muted uppercase tracking-wider font-medium">Subscribers</span>
      <span class="text-sm font-bold text-white font-heading tabular-nums">
        {{ new Intl.NumberFormat('en-US').format(displayCount) }}
      </span>
    </div>
  </div>
</template>
