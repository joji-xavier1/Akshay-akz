import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // Check for saved preference or system preference
  const getInitialTheme = () => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light'
    }
    return 'dark'
  }

  const theme = ref(getInitialTheme())
  const isDark = ref(theme.value === 'dark')

  const setTheme = (newTheme) => {
    theme.value = newTheme
    isDark.value = newTheme === 'dark'
    localStorage.setItem('theme', newTheme)
    applyTheme()
  }

  const toggleTheme = () => {
    setTheme(isDark.value ? 'light' : 'dark')
  }

  const applyTheme = () => {
    const root = document.documentElement
    if (isDark.value) {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
  }

  // Apply theme on initialization
  applyTheme()

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme
  }
})
