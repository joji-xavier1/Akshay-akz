<script setup>
import { ref, computed } from 'vue'
import { freeFireService } from '../services/freefire'
import { Search, Shield, Trophy, Target, Crosshair, User, AlertCircle, CheckCircle, XCircle, Loader2, ThumbsUp, Crown, Calendar, Skull, ExternalLink } from 'lucide-vue-next'
import ComingSoon from '../components/ComingSoon.vue'

const uid = ref('')
const region = ref('ind')
const isLoading = ref(false)
const error = ref(null)
const playerData = ref(null)
const brStats = ref(null)
const csStats = ref(null)
const hasSearched = ref(false)
const isComingSoon = ref(true)

const regions = [
  { value: 'ind', label: 'India' },
  { value: 'br', label: 'Brazil' },
  { value: 'sg', label: 'Singapore' },
  { value: 'id', label: 'Indonesia' },
  { value: 'us', label: 'USA' },
  { value: 'ru', label: 'Russia' },
  { value: 'vn', label: 'Vietnam' },
  { value: 'th', label: 'Thailand' },
  { value: 'me', label: 'Middle East' },
  { value: 'pk', label: 'Pakistan' },
  { value: 'cis', label: 'CIS' },
  { value: 'bd', label: 'Bangladesh' }
]

const eligibilityCriteria = {
  level: 60,
  likes: 5000,
  brRank: 6000, // BR Rank Points
  csRank: 100,  // CS Rank Stars
  brKd: 2.0,    // Minimum BR K/D
  csKd: 1.5     // Minimum CS K/D
}

const checkEligibility = async () => {
  if (!uid.value) return
  
  isLoading.value = true
  error.value = null
  playerData.value = null
  brStats.value = null
  csStats.value = null
  hasSearched.value = true
  
  try {
    // Fetch all data in parallel
    const [profile, br, cs] = await Promise.all([
      freeFireService.getPlayerProfile(uid.value, region.value),
      freeFireService.getBRStats(uid.value, region.value),
      freeFireService.getCSStats(uid.value, region.value)
    ])
    
    if (profile && profile.basicinfo) {
      playerData.value = profile
    } else {
      throw new Error('Player not found')
    }
    
    if (br && br.success) {
      brStats.value = br.data
    }
    
    if (cs && cs.success) {
      csStats.value = cs.data
    }
  } catch (err) {
    console.error(err)
    error.value = 'Failed to fetch player data. Please check the UID and Region.'
  } finally {
    isLoading.value = false
  }
}

// Calculate BR K/D (combining all BR modes: solo, duo, squad)
// BR Formula: Deaths = Matches - Wins
const brKD = computed(() => {
  if (!brStats.value) return 0
  
  let totalKills = 0
  let totalDeaths = 0
  
  // Solo stats
  if (brStats.value.solostats) {
    const s = brStats.value.solostats
    totalKills += s.kills || 0
    // Deaths = Matches - Wins
    totalDeaths += (s.gamesplayed || 0) - (s.wins || 0)
  }
  
  // Duo stats
  if (brStats.value.duostats) {
    const d = brStats.value.duostats
    totalKills += d.kills || 0
    totalDeaths += (d.gamesplayed || 0) - (d.wins || 0)
  }
  
  // Squad stats
  if (brStats.value.quadstats) {
    const q = brStats.value.quadstats
    totalKills += q.kills || 0
    totalDeaths += (q.gamesplayed || 0) - (q.wins || 0)
  }
  
  if (totalDeaths === 0) return totalKills > 0 ? totalKills : 0
  return (totalKills / totalDeaths).toFixed(2)
})

// Calculate CS K/D
// CS Formula: Uses direct deaths count from API (across all rounds)
const csKD = computed(() => {
  if (!csStats.value || !csStats.value.csstats) return 0
  
  const cs = csStats.value.csstats
  const kills = cs.kills || 0
  // CS uses explicit deaths count from detailedstats
  const deaths = cs.detailedstats?.deaths || 0
  
  if (deaths === 0) return kills > 0 ? kills : 0
  return (kills / deaths).toFixed(2)
})

// Eligibility Logic
const eligibility = computed(() => {
  if (!playerData.value || !playerData.value.basicinfo) return null
  
  const basic = playerData.value.basicinfo
  const level = parseInt(basic.level) || 0
  const likes = parseInt(basic.liked) || 0
  const brPoints = parseInt(basic.rankingpoints) || 0
  const csPoints = parseInt(basic.csrankingpoints) || 0
  const brKdValue = parseFloat(brKD.value) || 0
  const csKdValue = parseFloat(csKD.value) || 0
  
  const checks = [
    { label: `Level ${eligibilityCriteria.level}+`, passed: level >= eligibilityCriteria.level, value: level },
    { label: `Likes ${eligibilityCriteria.likes}+`, passed: likes >= eligibilityCriteria.likes, value: likes.toLocaleString() },
    { label: `BR Rank Points ${eligibilityCriteria.brRank}+`, passed: brPoints >= eligibilityCriteria.brRank, value: brPoints.toLocaleString() },
    { label: `CS Rank Stars ${eligibilityCriteria.csRank}+`, passed: csPoints >= eligibilityCriteria.csRank, value: csPoints.toLocaleString() },
    { label: `BR K/D ${eligibilityCriteria.brKd}+`, passed: brKdValue >= eligibilityCriteria.brKd, value: brKdValue },
    { label: `CS K/D ${eligibilityCriteria.csKd}+`, passed: csKdValue >= eligibilityCriteria.csKd, value: csKdValue }
  ]
  
  const isEligible = checks.filter(c => c.passed).length >= 4 // Pass if 4 out of 6 criteria met
  
  return { isEligible, checks }
})

const formatDate = (timestamp) => {
  if (!timestamp) return 'Unknown'
  return new Date(parseInt(timestamp) * 1000).toLocaleDateString()
}
</script>

<template>
  <div v-if="isComingSoon">
    <ComingSoon 
      title="GUILD TEST" 
      description="The ultimate recruitment portal is under maintenance. We're upgrading our verification algorithms to find the best of the best!"
    />
  </div>
  <div v-else class="min-h-screen py-16 lg:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6">
          <span class="text-gradient">GUILD TEST</span>
        </h1>
        <p class="text-xl text-text-muted max-w-2xl mx-auto">
          Check if you have what it takes to join Team Lava. Enter your UID to verify your eligibility.
        </p>
      </div>

      <!-- Search Form -->
      <div class="max-w-2xl mx-auto mb-16">
        <div class="card p-6 sm:p-8 bg-surface/50 backdrop-blur-md border border-white/10">
          <div class="grid sm:grid-cols-3 gap-4">
            <!-- Region Select -->
            <div class="relative">
              <label class="block text-xs font-medium text-text-muted mb-1 ml-1">REGION</label>
              <select 
                v-model="region"
                class="w-full bg-background border border-white/10 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-primary transition-colors cursor-pointer capitalize"
              >
                <option v-for="r in regions" :key="r.value" :value="r.value">
                  {{ r.label }}
                </option>
              </select>
              <div class="absolute right-3 top-[2.1rem] pointer-events-none text-text-muted">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            <!-- UID Input -->
            <div class="sm:col-span-2">
              <label class="block text-xs font-medium text-text-muted mb-1 ml-1">PLAYER UID</label>
              <div class="relative">
                <input 
                  v-model="uid"
                  type="text" 
                  placeholder="Enter Free Fire UID"
                  class="w-full bg-background border border-white/10 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:border-primary transition-colors font-mono"
                  @keyup.enter="checkEligibility"
                />
                <button 
                  @click="checkEligibility"
                  :disabled="!uid || isLoading"
                  class="absolute right-2 top-2 p-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Loader2 v-if="isLoading" class="w-5 h-5 animate-spin" />
                  <Search v-else class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          <p v-if="error" class="mt-4 text-red-500 text-sm flex items-center gap-2">
            <AlertCircle class="w-4 h-4" />
            {{ error }}
          </p>
        </div>
      </div>

      <!-- Results Section -->
      <div v-if="playerData && playerData.basicinfo" class="animate-fade-in space-y-8">
        
        <!-- Player Header -->
        <div class="card p-6 flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-surface to-surface/50">
          <div class="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary overflow-hidden">
            <!-- Using avatarframe level as generic placeholder if no image -->
            <span class="text-2xl font-bold text-primary">{{ playerData.basicinfo.level }}</span>
          </div>
          <div class="text-center sm:text-left flex-1">
            <h2 class="text-3xl font-heading font-bold flex items-center gap-2">
              {{ playerData.basicinfo.nickname }}
              <span v-if="playerData.basicinfo.level >= 70" class="text-yellow-500">
                <Crown class="w-6 h-6 fill-current" />
              </span>
            </h2>
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-2 text-sm text-text-muted">
              <span class="px-3 py-1 rounded-full bg-white/5 border border-white/10">ID: {{ playerData.basicinfo.accountid }}</span>
              <span class="px-3 py-1 rounded-full bg-white/5 border border-white/10 uppercase">Region: {{ playerData.basicinfo.region }}</span>
              <span class="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1">
                <Calendar class="w-3 h-3" /> Since {{ formatDate(playerData.basicinfo.createat) }}
              </span>
            </div>
          </div>
          
          <!-- Eligibility Badge -->
          <div 
            class="px-6 py-3 rounded-xl border-2 font-bold text-center min-w-[160px]"
            :class="eligibility.isEligible 
              ? 'bg-green-500/10 border-green-500 text-green-500' 
              : 'bg-red-500/10 border-red-500 text-red-500'"
          >
            <div class="flex flex-col items-center">
              <component :is="eligibility.isEligible ? CheckCircle : XCircle" class="w-8 h-8 mb-1" />
              <span>{{ eligibility.isEligible ? 'ELIGIBLE' : 'NOT ELIGIBLE' }}</span>
            </div>
          </div>
        </div>

        <!-- Eligibility Detail Checks -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="(check, idx) in eligibility.checks" :key="idx" 
            class="card p-4 flex items-center justify-between border-l-4"
            :class="check.passed ? 'border-l-green-500' : 'border-l-red-500'"
          >
            <div>
              <p class="text-sm text-text-muted">{{ check.label }}</p>
              <p class="text-xl font-bold">{{ check.value }}</p>
            </div>
            <component :is="check.passed ? CheckCircle : XCircle" 
              class="w-6 h-6"
              :class="check.passed ? 'text-green-500' : 'text-red-500'" 
            />
          </div>
        </div>

        <!-- Player Details Grid -->
        <div class="grid lg:grid-cols-2 gap-6">
          <!-- Rank Info -->
          <div class="card p-6 relative group overflow-hidden">
            <h3 class="text-xl font-heading font-bold mb-6 flex items-center gap-2">
              <Trophy class="w-5 h-5 text-yellow-500" /> RANKING STATS
            </h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                <span class="text-text-muted">BR Rank</span>
                <span class="font-mono font-bold text-yellow-500 text-lg">{{ playerData.basicinfo.rankingpoints?.toLocaleString() }} <span class="text-xs text-text-muted">Pts</span></span>
              </div>
              <div class="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                <span class="text-text-muted">CS Rank</span>
                <span class="font-mono font-bold text-primary text-lg">{{ playerData.basicinfo.csrankingpoints }} <span class="text-xs text-text-muted">Stars</span></span>
              </div>
              <div class="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                <span class="text-text-muted">Max Rank Achieved</span>
                <span class="font-mono font-bold">{{ playerData.basicinfo.maxrank }}</span>
              </div>
            </div>
          </div>

          <!-- K/D Stats -->
          <div class="card p-6 relative group overflow-hidden border-accent/30 bg-accent/5">
            <h3 class="text-xl font-heading font-bold mb-6 flex items-center gap-2">
              <Skull class="w-5 h-5 text-accent" /> K/D RATIO
            </h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center bg-white/5 p-4 rounded-lg">
                <div>
                  <span class="text-text-muted block text-sm">Battle Royale K/D</span>
                  <span class="text-xs text-text-muted">(Solo + Duo + Squad)</span>
                </div>
                <span class="font-mono font-bold text-3xl" :class="brKD >= 2 ? 'text-green-500' : 'text-red-400'">{{ brKD }}</span>
              </div>
              <div class="flex justify-between items-center bg-white/5 p-4 rounded-lg">
                <div>
                  <span class="text-text-muted block text-sm">Clash Squad K/D</span>
                  <span class="text-xs text-text-muted">(Ranked Matches)</span>
                </div>
                <span class="font-mono font-bold text-3xl" :class="csKD >= 1.5 ? 'text-green-500' : 'text-red-400'">{{ csKD }}</span>
              </div>
            </div>
          </div>

          <!-- Social Info -->
          <div class="card p-6 relative group overflow-hidden">
            <h3 class="text-xl font-heading font-bold mb-6 flex items-center gap-2">
              <ThumbsUp class="w-5 h-5 text-primary" /> SOCIAL PROFILE
            </h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                <span class="text-text-muted">Total Likes</span>
                <span class="font-mono font-bold text-primary text-lg">{{ playerData.basicinfo.liked }}</span>
              </div>
              <div class="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                <span class="text-text-muted">Language</span>
                <span class="font-mono font-bold capitalize">{{ playerData.socialinfo?.language?.replace('LANGUAGE', '')?.toLowerCase() || 'English' }}</span>
              </div>
              <div class=" bg-white/5 p-3 rounded-lg">
                <span class="text-text-muted block mb-1 text-sm">Signature</span>
                <p class="font-mono text-sm whitespace-pre-wrap text-white/80">{{ playerData.socialinfo?.signature || 'No signature' }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="eligibility.isEligible" class="text-center pt-8">
           <a 
              href="https://discord.gg/teamlava" 
              target="_blank"
              class="btn-primary inline-flex items-center gap-2 px-8 py-4 text-lg animate-pulse"
            >
              Apply on Discord
              <ExternalLink class="w-5 h-5" />
            </a>
            <p class="mt-4 text-sm text-text-muted">Take a screenshot of this page and send it in the #guild-applications channel</p>
        </div>
      </div>
    </div>
  </div>
</template>
