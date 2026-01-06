const BASE_URL = 'https://freefire-api-six.vercel.app';

export const freeFireService = {
  /**
   * Get player profile information including level, rank, and likes
   * @param {string} uid - Player UID
   * @param {string} region - Player Region (ind, br, us, sg, etc.)
   */
  async getPlayerProfile(uid, region) {
    try {
      const response = await fetch(`${BASE_URL}/get_player_personal_show?server=${region}&uid=${uid}`);
      if (!response.ok) {
        throw new Error('Failed to fetch player profile');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching player profile:', error);
      throw error;
    }
  },

  /**
   * Get player BR stats for K/D calculation
   * @param {string} uid - Player UID
   * @param {string} region - Player Region
   */
  async getBRStats(uid, region) {
    try {
      const response = await fetch(`${BASE_URL}/get_player_stats?server=${region}&uid=${uid}&matchmode=RANKED&gamemode=br`);
      if (!response.ok) {
        throw new Error('Failed to fetch BR stats');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching BR stats:', error);
      throw error;
    }
  },

  /**
   * Get player CS stats for K/D calculation
   * @param {string} uid - Player UID
   * @param {string} region - Player Region
   */
  async getCSStats(uid, region) {
    try {
      const response = await fetch(`${BASE_URL}/get_player_stats?server=${region}&uid=${uid}&matchmode=RANKED&gamemode=cs`);
      if (!response.ok) {
        throw new Error('Failed to fetch CS stats');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching CS stats:', error);
      throw error;
    }
  }
};


