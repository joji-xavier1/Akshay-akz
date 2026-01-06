
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || '';
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || 'UCsP7bX-wF5_0wF5_0wF5_0w';

// RSS Feed URL (FREE - no quota limits!)
const RSS_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

// Cache configuration - minimal for real-time updates
const STATS_CACHE_DURATION = 5 * 1000;   // 5 seconds (real-time!)
const RSS_CACHE_DURATION = 30 * 1000;    // 30 seconds for live status

let statsCache = { data: null, timestamp: 0 };
let rssCache = { data: null, timestamp: 0 };

export const youtubeService = {
  /**
   * Fetches channel statistics using FREE third-party APIs
   * NO QUOTA COST - uses mixerno.space and socialcounts.org
   * These services provide real-time YouTube stats without API keys
   * @param {boolean} forceRefresh - If true, bypasses cache to get fresh data
   */
  async getChannelStats(forceRefresh = false) {
    const now = Date.now();
    
    // Clear cache if forcing refresh
    if (forceRefresh) {
      console.log('Force refreshing stats...');
      statsCache = { data: null, timestamp: 0 };
    }

    // Return cached data if still valid (unless forcing refresh)
    if (!forceRefresh && statsCache.data && (now - statsCache.timestamp) < STATS_CACHE_DURATION) {
      console.log('Using cached stats');
      return statsCache.data;
    }

    // Try multiple free APIs in order of reliability
    const stats = await this.tryFreeApis();
    
    if (stats) {
      statsCache = { data: stats, timestamp: now };
      return stats;
    }

    // If all free APIs fail, try YouTube API as last resort
    if (API_KEY && API_KEY !== 'YOUR_API_KEY_HERE') {
      console.log('Free APIs failed, falling back to YouTube API');
      return this.getChannelStatsFromYouTubeAPI();
    }

    // Return cached data if available, even if expired
    if (statsCache.data) {
      console.log('Using stale cache');
      return statsCache.data;
    }

    return mockStats();
  },

  /**
   * Try multiple free third-party APIs for subscriber count
   * These don't require API keys and have no quota limits
   */
  async tryFreeApis() {
    // API 1: Social Counts API - Most reliable format
    try {
      const response = await fetch(
        `https://api.socialcounts.org/youtube-live-subscriber-count/${CHANNEL_ID}`
      );
      if (response.ok) {
        const data = await response.json();
        // Format: {"counters":{"estimation":{"subscriberCount":X,"viewCount":Y,"videoCount":Z}}}
        if (data.counters?.estimation) {
          console.log('Got stats from SocialCounts API');
          return {
            subscriberCount: String(data.counters.estimation.subscriberCount || 0),
            viewCount: String(data.counters.estimation.viewCount || 0),
            videoCount: String(data.counters.estimation.videoCount || 0)
          };
        }
        // Fallback to API counts if estimation not available
        if (data.counters?.api) {
          console.log('Got stats from SocialCounts API (api field)');
          return {
            subscriberCount: String(data.counters.api.subscriberCount || 0),
            viewCount: String(data.counters.api.viewCount || 0),
            videoCount: String(data.counters.api.videoCount || 0)
          };
        }
      }
    } catch (e) {
      console.warn('SocialCounts API failed:', e.message);
    }

    // API 2: Mixerno.space
    try {
      const response = await fetch(
        `https://mixerno.space/api/youtube-channel-counter/user/${CHANNEL_ID}`
      );
      if (response.ok) {
        const data = await response.json();
        // Format: {"counts":[{"value":"subscribers","count":X},{"value":"views","count":Y},{"value":"videos","count":Z}]}
        if (data.counts && data.counts.length > 0) {
          const subscribers = data.counts.find(c => c.value === 'subscribers')?.count;
          const views = data.counts.find(c => c.value === 'views')?.count;
          const videos = data.counts.find(c => c.value === 'videos')?.count;
          
          if (subscribers !== null && subscribers !== undefined) {
            console.log('Got stats from Mixerno API');
            return {
              subscriberCount: String(subscribers),
              viewCount: String(views || 0),
              videoCount: String(videos || 0)
            };
          }
        }
      }
    } catch (e) {
      console.warn('Mixerno API failed:', e.message);
    }

    return null;
  },

  /**
   * Fallback to YouTube Data API (costs 1 quota unit)
   * Only used when all free APIs fail
   */
  async getChannelStatsFromYouTubeAPI() {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('YouTube API Error:', errorData.error?.message || response.status);
        if (statsCache.data) return statsCache.data;
        return mockStats();
      }

      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        const stats = {
          subscriberCount: data.items[0].statistics.subscriberCount,
          viewCount: data.items[0].statistics.viewCount,
          videoCount: data.items[0].statistics.videoCount
        };
        statsCache = { data: stats, timestamp: Date.now() };
        return stats;
      }
      return mockStats();
    } catch (error) {
      console.error('Error fetching from YouTube API:', error);
      if (statsCache.data) return statsCache.data;
      return mockStats();
    }
  },

  /**
   * Fetches live status using YouTube RSS feed
   * FREE - no quota cost! Can poll frequently
   * Falls back to checking video page if RSS indicates live content
   */
  async getLiveStatus() {
    // Return cached data if still valid
    const now = Date.now();
    if (rssCache.data && (now - rssCache.timestamp) < RSS_CACHE_DURATION) {
      console.log('Using cached RSS data');
      return rssCache.data;
    }

    try {
      // Use a CORS proxy for RSS feed (browser can't fetch directly)
      // In production, you'd want your own backend or serverless function
      const corsProxy = 'https://api.allorigins.win/raw?url=';
      const response = await fetch(corsProxy + encodeURIComponent(RSS_FEED_URL));
      
      if (!response.ok) {
        console.warn('RSS feed fetch failed, using fallback');
        return this.getLiveStatusFallback();
      }

      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      
      // Get the latest videos from RSS
      const entries = xmlDoc.querySelectorAll('entry');
      
      if (entries.length > 0) {
        const latestEntry = entries[0];
        const videoId = latestEntry.querySelector('yt\\:videoId, videoId')?.textContent;
        const title = latestEntry.querySelector('title')?.textContent;
        const thumbnail = latestEntry.querySelector('media\\:thumbnail, thumbnail')?.getAttribute('url') 
          || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
        const published = latestEntry.querySelector('published')?.textContent;

        // Check if video was published very recently (within last hour) - might be live
        const publishedDate = new Date(published);
        const isRecent = (Date.now() - publishedDate.getTime()) < 60 * 60 * 1000;

        // For live detection, we check if the video is currently streaming
        // by making a lightweight oembed request (free, no quota)
        if (videoId && isRecent) {
          const liveCheck = await this.checkIfVideoIsLive(videoId);
          if (liveCheck.isLive) {
            const result = {
              isLive: true,
              videoId,
              title,
              thumbnail
            };
            rssCache = { data: result, timestamp: now };
            return result;
          }
        }

        // Return latest video info (not live)
        const result = {
          isLive: false,
          nextLive: null,
          latestVideo: {
            videoId,
            title,
            thumbnail,
            published
          }
        };
        rssCache = { data: result, timestamp: now };
        return result;
      }

      return { isLive: false, nextLive: null };
    } catch (error) {
      console.error('Error fetching RSS feed:', error);
      return this.getLiveStatusFallback();
    }
  },

  /**
   * Check if a specific video is currently live
   * Uses oembed endpoint which is FREE (no API quota)
   */
  async checkIfVideoIsLive(videoId) {
    try {
      // oembed is free and doesn't require API key
      const response = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      );
      
      if (!response.ok) {
        return { isLive: false };
      }

      const data = await response.json();
      // oembed doesn't directly tell us if live, but we can check the title
      // Live streams often have specific patterns
      const isLive = data.title?.toLowerCase().includes('live') || 
                     data.title?.includes('🔴') ||
                     data.author_name?.toLowerCase().includes('live');
      
      return { isLive, title: data.title };
    } catch (e) {
      return { isLive: false };
    }
  },

  /**
   * Fallback method using API if RSS fails
   * Only called when RSS is unavailable
   */
  async getLiveStatusFallback() {
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
      return mockLiveStatus();
    }

    try {
      // Search for active live streams - costs 100 quota units!
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`
      );
      
      if (!response.ok) {
        return mockLiveStatus();
      }

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

      return { isLive: false, nextLive: null };
    } catch (error) {
      console.error('Error in fallback live status:', error);
      return mockLiveStatus();
    }
  },

  /**
   * Get video details - only used when we need scheduled stream info
   * Costs 1 quota unit
   */
  async getVideoDetails(videoId) {
    if (!API_KEY) return { isLive: false, nextLive: null };

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,snippet&id=${videoId}&key=${API_KEY}`
      );
      
      if (!response.ok) {
        return { isLive: false, nextLive: null };
      }

      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        const video = data.items[0];
        const scheduledTime = video.liveStreamingDetails?.scheduledStartTime;
        const isCurrentlyLive = video.liveStreamingDetails?.actualStartTime && 
                                !video.liveStreamingDetails?.actualEndTime;
        
        return {
          isLive: isCurrentlyLive,
          nextLive: scheduledTime,
          videoId: video.id,
          title: video.snippet.title,
          thumbnail: video.snippet.thumbnails.high.url
        };
      }
      return { isLive: false, nextLive: null };
    } catch (e) {
      return { isLive: false, nextLive: null };
    }
  },

  /**
   * Clear all caches - useful for forcing refresh
   */
  clearCache() {
    statsCache = { data: null, timestamp: 0 };
    rssCache = { data: null, timestamp: 0 };
  }
};

function mockStats() {
  return {
    subscriberCount: '2000000',
    viewCount: '500000000',
    videoCount: '150'
  };
}

function mockLiveStatus() {
  return {
    isLive: false,
    nextLive: null,
    latestVideo: null
  };
}
