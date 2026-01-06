
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
    isUpcoming: (state) => {
      if (!state.nextLiveTime) return false;
      const now = new Date();
      const scheduled = new Date(state.nextLiveTime);
      return scheduled > now;
    }
  },

  actions: {
    async fetchStats() {
      try {
        const stats = await youtubeService.getChannelStats();
        if (stats) {
          this.subscriberCount = parseInt(stats.subscriberCount);
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
      // Initial fetch
      this.fetchStats();
      this.fetchLiveStatus();

      // Poll every 60 seconds
      setInterval(() => {
        this.fetchStats();
        this.fetchLiveStatus();
      }, 60000);
    }
  }
})
