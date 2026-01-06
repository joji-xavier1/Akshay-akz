<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 500 // Animation duration in ms
  }
})

const displayValue = ref(0)
const isAnimating = ref(false)
let animationFrame = null

// Animate from current value to target value
const animateValue = (start, end, duration) => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
  
  const startTime = performance.now()
  isAnimating.value = true
  
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // Easing function (ease-out cubic)
    const easeOut = 1 - Math.pow(1 - progress, 3)
    
    displayValue.value = Math.round(start + (end - start) * easeOut)
    
    if (progress < 1) {
      animationFrame = requestAnimationFrame(animate)
    } else {
      displayValue.value = end
      isAnimating.value = false
    }
  }
  
  animationFrame = requestAnimationFrame(animate)
}

// Format number with commas
const formattedValue = () => {
  return new Intl.NumberFormat('en-US').format(displayValue.value)
}

// Watch for value changes and animate
watch(() => props.value, (newVal, oldVal) => {
  if (newVal !== oldVal && newVal > 0) {
    animateValue(oldVal || 0, newVal, props.duration)
  }
}, { immediate: false })

// Initialize with current value
onMounted(() => {
  if (props.value > 0) {
    displayValue.value = props.value
  }
})
</script>

<template>
  <span 
    class="inline-block tabular-nums transition-transform"
    :class="{ 'scale-105': isAnimating }"
  >
    {{ formattedValue() }}
  </span>
</template>
