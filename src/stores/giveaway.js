import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGiveawayStore = defineStore('giveaway', () => {
  const activeGiveaways = ref([
    {
      id: 1,
      title: 'iPhone 15 Pro Max Giveaway',
      description: 'Subscribe & comment to win an iPhone 15 Pro Max!',
      endDate: '2026-02-15',
      prize: 'iPhone 15 Pro Max',
      image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400',
      requirements: ['Subscribe to the channel', 'Like this video', 'Comment your favorite game'],
      participants: 15420
    },
    {
      id: 2,
      title: 'Gaming PC Build Giveaway',
      description: 'Win a complete RGB gaming setup worth ₹2,00,000!',
      endDate: '2026-02-28',
      prize: 'Gaming PC Setup',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400',
      requirements: ['Follow on Instagram', 'Share this post', 'Tag 3 friends'],
      participants: 8750
    },
    {
      id: 3,
      title: 'Team Lava Jersey Giveaway',
      description: '10 lucky winners will get official Team Lava jerseys!',
      endDate: '2026-01-31',
      prize: 'Team Lava Jersey',
      image: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=400',
      requirements: ['Join Discord server', 'React to giveaway post'],
      participants: 3200
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
