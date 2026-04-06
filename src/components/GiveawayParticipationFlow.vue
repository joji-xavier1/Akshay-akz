<script setup>
import { ref, computed, nextTick } from 'vue'
import { freeFireService } from '../services/freefire'
import { auth, googleProvider, signInWithPopup } from '../services/firebase'
import { useGiveawayStore } from '../stores/giveaway'
import { X, ChevronRight, Loader2, User as UserIcon, Mail, CheckCircle, Shield, AlertCircle } from 'lucide-vue-next'

const props = defineProps({
  giveaway: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'complete'])
const giveawayStore = useGiveawayStore()

const currentStep = ref(1) // 1: FreeFire, 2: Google Auth, 3: Success
const error = ref('')
const isLoading = ref(false)

// Step 1: Free Fire
const ffUid = ref('')
const ffData = ref(null)

// Step 2: Google
const googleUser = ref(null)

const verifyFreeFire = async () => {
  if (!ffUid.value) return
  isLoading.value = true
  error.value = ''
  
  try {
    const data = await freeFireService.getPlayerProfile(ffUid.value, 'ind') // Default to ind region for simplicty
    if (data && data.basicinfo) {
      ffData.value = data.basicinfo
      currentStep.value = 2
    } else {
      error.value = 'Player not found. Please check your UID.'
    }
  } catch (err) {
    error.value = 'Error verifying UID. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

const signInOutGoogle = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const result = await signInWithPopup(auth, googleProvider)
    googleUser.value = result.user
    
    // Success: They have verified FF and Google.
    giveawayStore.enterGiveaway(props.giveaway.id)
    currentStep.value = 3
  } catch (err) {
    error.value = err.message || 'Google Sign-In failed.'
  } finally {
    isLoading.value = false
  }
}

</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="$emit('close')"></div>
    
    <div class="card relative w-full max-w-md bg-surface/90 border border-white/10 glass shadow-2xl p-6 sm:p-8 rounded-2xl animate-fade-in z-10 flex flex-col max-h-[90vh]">
      <button 
        @click="$emit('close')" 
        class="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
      >
        <X class="w-5 h-5" />
      </button>

      <div class="text-center mb-8">
        <h2 class="text-2xl font-heading font-bold text-gradient uppercase">Participate</h2>
        <p class="text-sm text-text-muted">{{ giveaway.title }}</p>
      </div>

      <!-- Step Indicator -->
      <div class="flex items-center justify-center gap-2 mb-8">
        <div v-for="step in 2" :key="step" class="flex items-center">
          <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors" 
               :class="currentStep >= step ? 'bg-primary text-white' : 'bg-surface-elevated text-text-muted'">
            <CheckCircle v-if="currentStep > step" class="w-4 h-4" />
            <span v-else>{{ step }}</span>
          </div>
          <div v-if="step < 2" class="w-8 h-1 transition-colors" :class="currentStep > step ? 'bg-primary' : 'bg-surface-elevated'"></div>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <!-- Error Alert -->
        <div v-if="error" class="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500 text-red-500 text-sm flex items-start gap-2">
          <AlertCircle class="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{{ error }}</span>
        </div>

        <!-- Step 1: Free Fire Verification -->
        <div v-if="currentStep === 1" class="space-y-6 animate-fade-in pb-4">
          <div class="text-center">
            <div class="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
              <Shield class="w-6 h-6 text-primary" />
            </div>
            <h3 class="font-bold text-lg mb-1">Link Free Fire ID</h3>
            <p class="text-sm text-text-muted">We need to verify your account to ensure genuine participation.</p>
          </div>
          
          <div>
            <label class="block text-xs font-medium text-text-muted mb-2 ml-1">UID</label>
            <input 
              v-model="ffUid" 
              type="text" 
              placeholder="e.g. 123456789"
              class="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:border-primary transition-colors font-mono"
              @keyup.enter="verifyFreeFire"
            />
          </div>
          <button 
            @click="verifyFreeFire" 
            :disabled="isLoading || !ffUid"
            class="btn-primary w-full py-3 flex items-center justify-center gap-2"
          >
            <Loader2 v-if="isLoading" class="w-5 h-5 animate-spin" />
            Verify Account <ChevronRight v-if="!isLoading" class="w-4 h-4" />
          </button>
        </div>

        <!-- Step 2: Google Verification -->
        <div v-else-if="currentStep === 2" class="space-y-6 animate-fade-in pb-4">
          <div class="text-center">
            <div class="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
              <Mail class="w-6 h-6 text-blue-500" />
            </div>
            <h3 class="font-bold text-lg mb-1">Sign In</h3>
            <p class="text-sm text-text-muted">Sign in with Google to confirm your email and username.</p>
          </div>

          <div v-if="ffData" class="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 mb-6">
            <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary">
              <span class="font-bold">{{ ffData.level }}</span>
            </div>
            <div>
              <p class="font-bold text-sm">Valid FF Account</p>
              <p class="text-xs text-primary">{{ ffData.nickname }} ({{ ffData.accountid }})</p>
            </div>
            <CheckCircle class="w-5 h-5 text-green-500 ml-auto" />
          </div>
          
          <button 
            @click="signInOutGoogle" 
            :disabled="isLoading"
            class="w-full py-3 px-4 bg-white hover:bg-gray-100 text-black rounded-xl font-bold transition-colors flex items-center justify-center gap-3"
          >
            <Loader2 v-if="isLoading" class="w-5 h-5 animate-spin" />
            <svg v-if="!isLoading" class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </button>
        </div>

        <!-- Step 3: Success -->
        <div v-else-if="currentStep === 3" class="py-8 space-y-6 text-center animate-fade-in text-center">
          <div class="w-20 h-20 rounded-full bg-green-500/20 flex flex-col items-center justify-center mx-auto mb-4 border-2 border-green-500 animate-pulse">
            <CheckCircle class="w-10 h-10 text-green-500" />
          </div>
          <h3 class="font-heading font-bold text-2xl text-green-500">Successfully Enrolled!</h3>
          <p class="text-text-muted">You are now participating in the <strong class="text-white">{{ giveaway.title }}</strong> giveaway. Good luck!</p>
          <button 
            @click="$emit('complete')" 
            class="btn-primary px-8 mt-6 w-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
}
</style>
