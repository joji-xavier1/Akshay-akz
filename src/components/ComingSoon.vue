<script setup>
import { useRouter } from 'vue-router'
import { Rocket, Clock, ArrowLeft, Flame, Sparkles, Shield } from 'lucide-vue-next'

defineProps({
  title: {
    type: String,
    default: 'COMING SOON'
  },
  description: {
    type: String,
    default: 'We are currently working hard to bring you something amazing. Stay tuned for the ultimate experience!'
  }
})

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-[70vh] flex items-center justify-center p-4 sm:p-8">
    <div class="max-w-3xl w-full text-center relative">
      <!-- Background Decorative Elements -->
      <div class="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
      <div class="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/20 rounded-full blur-[100px] animate-pulse delay-700"></div>

      <!-- Icon Container -->
      <div class="relative inline-block mb-8">
        <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-surface/50 backdrop-blur-xl border border-white/10 flex items-center justify-center transform rotate-12 transition-transform hover:rotate-0 duration-500 shadow-2xl">
          <Rocket class="w-12 h-12 sm:w-16 sm:h-16 text-primary animate-bounce" />
        </div>
        <div class="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg transform -rotate-12">
          <Clock class="w-6 h-6 text-white" />
        </div>
      </div>

      <!-- Content -->
      <div class="space-y-6 relative z-10">
        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold tracking-tight">
          {{ title }}
        </h1>
        
        <div class="flex items-center justify-center gap-2 text-primary font-medium uppercase tracking-[0.2em] text-sm sm:text-base">
          <Sparkles class="w-4 h-4" />
          <span>Under Construction</span>
          <Sparkles class="w-4 h-4" />
        </div>

        <p class="text-text-muted text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
          {{ description }}
        </p>

        <!-- Progress Bar (Simulation) -->
        <div class="max-w-md mx-auto py-8">
          <div class="flex justify-between text-xs font-semibold uppercase tracking-wider mb-2 text-text-muted">
            <span>Development Progress</span>
            <span class="text-secondary">85% Complete</span>
          </div>
          <div class="h-3 w-full bg-surface-light rounded-full overflow-hidden border border-white/5 p-0.5">
            <div class="h-full bg-gradient-to-r from-primary via-accent to-secondary rounded-full animate-progress" style="width: 85%"></div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button @click="goHome" class="btn-primary group px-8 py-4 text-lg w-full sm:w-auto flex items-center justify-center gap-2">
            <ArrowLeft class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <a href="http://discord.com/invite/k8K74CKD" target="_blank" class="btn-secondary px-8 py-4 text-lg w-full sm:w-auto flex items-center justify-center gap-2">
            Stay Updated
            <Flame class="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes progress {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.animate-progress {
  animation: progress 2s cubic-bezier(0.44, 0.21, 0, 1);
}

.animate-glow {
  box-shadow: 0 0 20px rgba(var(--color-primary), 0.3);
}

.btn-primary {
  background: linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-accent)));
  color: white;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -10px rgb(var(--color-primary));
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px border rgba(255, 255, 255, 0.1);
  color: white;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}
</style>
