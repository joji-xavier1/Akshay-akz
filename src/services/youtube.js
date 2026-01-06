
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || '';
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || 'UCsP7bX-wF5_0wF5_0wF5_0w'; // Fallback to example ID

// Cache to prevent hitting quota limits
const CACHE_DURATION = 60 * 1000; // 1 minute
let lastFetch = 0;
let cachedData = null;

export const youtubeService = {
  async getChannelStats() {
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
      console.warn('YouTube API Key is missing. Using mock data.');
      return mockStats();
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
      );
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        return {
          subscriberCount: data.items[0].statistics.subscriberCount,
          viewCount: data.items[0].statistics.viewCount,
          videoCount: data.items[0].statistics.videoCount
        };
      }
      return mockStats();
    } catch (error) {
      console.error('Error fetching channel stats:', error);
      return mockStats();
    }
  },

  async getLiveStatus() {
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
      return mockLiveStatus();
    }

    try {
      // Search for active live streams
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const video = data.items[0];
        return {
          isLive: true,
          videoId: video.id.videoId,
          title: video.snippet.title,
          thumbnail: video.snippet.thumbnails.high.url
        };
      }

      // If not live, check for upcoming scheduled streams
      const upcomingResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=upcoming&type=video&key=${API_KEY}`
      );
      const upcomingData = await upcomingResponse.json();

      if (upcomingData.items && upcomingData.items.length > 0) {
        const video = upcomingData.items[0];
        // Note: 'search' endpoint doesn't give exact scheduledStartTime in snippet sometimes, 
        // but let's assume valid data or we might need a second call to 'videos' endpoint.
        // For robustness, let's call 'videos' endpoint for details if we have a videoId.
        return await this.getVideoDetails(video.id.videoId);
      }

      return { isLive: false, nextLive: null };
    } catch (error) {
      console.error('Error fetching live status:', error);
      return mockLiveStatus();
    }
  },

  async getVideoDetails(videoId) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,snippet&id=${videoId}&key=${API_KEY}`
      );
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        const video = data.items[0];
        const scheduledTime = video.liveStreamingDetails?.scheduledStartTime;
        
        return {
          isLive: false,
          nextLive: scheduledTime, // ISO 8601 string
          videoId: video.id,
          title: video.snippet.title,
          thumbnail: video.snippet.thumbnails.high.url
        };
      }
      return { isLive: false, nextLive: null };
    } catch (e) {
      return { isLive: false, nextLive: null };
    }
  }
};

function mockStats() {
  return {
    subscriberCount: '2000000', // 2M
    viewCount: '500000000',
    videoCount: '150'
  };
}

function mockLiveStatus() {
  // Simulate a scheduled live for demo purposes if no API key
  // Returns a date 1 hour from now
  const nextLive = new Date();
  nextLive.setHours(nextLive.getHours() + 1);

  return {
    isLive: false,
    nextLive: nextLive.toISOString(),
    title: 'Team Lava Scrims - FINALS',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070'
  };
}
