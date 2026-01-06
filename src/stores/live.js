
import { defineStore } from 'pinia'
import { youtubeService } from '../services/youtube'

export const useLiveStore = defineStore('live', {
  state: () => ({
    subscriberCount: 0,
    isLive: false,
    nextLiveTime: null,
    videoTitle: '',
    thumbnailUrl: '',
    videoId: '',
    isLoading: false,
    lastUpdated: null
  }),

  getters: {
    formattedSubCount: (state) => {
      return Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(state.subscriberCount)
    },
    // Exact count with thousand separators (e.g., 1,319,299)
    exactSubCount: (state) => {
      return Intl.NumberFormat('en-US').format(state.subscriberCount)
    },
    isUpcoming: (state) => {
      if (!state.nextLiveTime) return false;
      const now = new Date();
      const scheduled = new Date(state.nextLiveTime);
      return scheduled > now;
    }
  },

  actions: {
    async fetchStats(forceRefresh = false) {
      try {
        const stats = await youtubeService.getChannelStats(forceRefresh);
        if (stats) {
          this.subscriberCount = parseInt(stats.subscriberCount);
          this.lastUpdated = new Date();
        }
      } catch (error) {
        console.error('Failed to fetch stats', error);
      }
    },

    async fetchLiveStatus() {
      this.isLoading = true;
      try {
        const status = await youtubeService.getLiveStatus();
        this.isLive = status.isLive;
        this.nextLiveTime = status.nextLive || null;
        this.videoTitle = status.title || '';
        this.thumbnailUrl = status.thumbnail || '';
        this.videoId = status.videoId || '';
        this.lastUpdated = new Date();
      } catch (error) {
        console.error('Failed to fetch live status', error);
      } finally {
        this.isLoading = false;
      }
    },

    startPolling() {
      // Initial fetch with force refresh to get fresh data on page load
      this.fetchStats(true);  // Force refresh on initial load
      this.fetchLiveStatus();

      // Real-time polling every 5 seconds (FREE - no quota used!)
      setInterval(() => {
        this.fetchStats(); // Normal fetch (uses cache)
      }, 5 * 1000); // 5 seconds

      // Live status polling every 30 seconds
      setInterval(() => {
        this.fetchLiveStatus();
      }, 30 * 1000); // 30 seconds
    }
  }
})
