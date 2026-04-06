import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGiveawayStore = defineStore('giveaway', () => {
  const activeGiveaways = ref([
    {
      id: 1,
      title: 'Marriage treat',
      prize: 'Exclusive Rewards & Top-ups',
      description: 'Special marriage treat giveaway! Participate to win exclusive rewards.',
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
      participants: 0,
      requirements: [
        'Free Fire Level 40+',
        'Must be subscribed to the channel'
      ],
      requiresFlow: true
    }
  ])
  const pastGiveaways = ref([
    {
      id: 101,
      title: 'PS5 Giveaway',
      prize: 'PlayStation 5',
      winner: 'GamerPro_2025',
      endedDate: '2025-12-25'
    },
    {
      id: 102,
      title: 'Diamond Royale Pass',
      prize: '10,000 Diamonds',
      winner: 'FireKing_Mumbai',
      endedDate: '2025-12-01'
    },
    {
      id: 103,
      title: 'Team Lava Hoodie',
      prize: 'Official Hoodie',
      winner: 'LavaFan_Delhi',
      endedDate: '2025-11-15'
    }
  ])

  const winners = ref([
    'GamerPro_2025', 'FireKing_Mumbai', 'LavaFan_Delhi', 'ProSniper_Chennai',
    'HeadshotKing', 'NinjaGamer_Pune', 'DragonSlayer_Kolkata', 'PhoenixRise',
    'ThunderBolt_HYD', 'ShadowHunter', 'BlazeMaster', 'IceBreaker_BLR',
    'StormRider_JKT', 'NightHawk', 'CyberWolf_AMD', 'FireStorm_LKO'
  ])

  function enterGiveaway(giveawayId) {
    const giveaway = activeGiveaways.value.find(g => g.id === giveawayId)
    if (giveaway) {
      giveaway.participants++
    }
  }

  return {
    activeGiveaways,
    pastGiveaways,
    winners,
    enterGiveaway
  }
})
