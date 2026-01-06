
<script setup>
import { useLiveStore } from '../stores/live'
import { Radio, CalendarClock, X } from 'lucide-vue-next'
import { ref, watch } from 'vue'

const liveStore = useLiveStore()
const isVisible = ref(false)

// Show notification when status changes to live or upcoming
watch(() => [liveStore.isLive, liveStore.nextLiveTime], ([isLive, nextLive]) => {
  if (isLive || (nextLive && new Date(nextLive) > new Date())) {
    isVisible.value = true
  }
}, { immediate: true })

const close = () => {
  isVisible.value = false
}

const formatTime = (isoString) => {
  if (!isoString) return ''
  return new Date(isoString).toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit'
  })
}
</script>

<template>
  <Transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div 
      v-if="isVisible && (liveStore.isLive || liveStore.isUpcoming)" 
      class="fixed z-[100] bottom-4 left-4 right-4 sm:right-auto sm:top-24 sm:left-auto sm:bottom-auto sm:w-96"
    >
      <div class="relative bg-surface border border-primary/20 rounded-lg shadow-2xl p-4 overflow-hidden">
        <!-- Live Indicator Background -->
        <div class="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none"></div>
        
        <!-- Close Button -->
        <button @click="close" class="absolute top-2 right-2 text-text-muted hover:text-white transition-colors">
          <X class="w-4 h-4" />
        </button>

        <div class="flex gap-4">
          <!-- Thumbnail -->
          <div class="relative w-20 h-14 rounded overflow-hidden bg-black/50 flex-shrink-0">
             <img 
               v-if="liveStore.thumbnailUrl" 
               :src="liveStore.thumbnailUrl" 
               alt="Stream Thumbnail" 
               class="w-full h-full object-cover"
             />
             <div v-if="liveStore.isLive" class="absolute bottom-1 right-1 px-1 py-0.5 bg-red-600 text-[10px] font-bold text-white rounded uppercase tracking-wider">
               Live
             </div>
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0 pr-4">
            <div class="flex items-center gap-2 mb-1">
              <span v-if="liveStore.isLive" class="flex items-center gap-1.5 text-red-500 text-xs font-bold uppercase tracking-wider animate-pulse">
                <Radio class="w-3 h-3" />
                Live Now
              </span>
              <span v-else class="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider">
                <CalendarClock class="w-3 h-3" />
                Scheduled • {{ formatTime(liveStore.nextLiveTime) }}
              </span>
            </div>
            
            <h4 class="text-sm font-medium text-white truncate leading-tight">
              {{ liveStore.videoTitle }}
            </h4>
            
            <a 
              :href="`https://youtube.com/watch?v=${liveStore.videoId}`" 
              target="_blank"
              class="inline-block mt-2 text-xs text-primary hover:text-white transition-colors font-medium border-b border-primary/30 hover:border-white"
            >
              {{ liveStore.isLive ? 'Watch Stream' : 'Set Reminder' }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
