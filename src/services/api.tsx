// Values that should be on .env file
const API_BASE_URL = 'http://localhost:3000';
const API_VERSION = 'v1';

export const API = {
  calendar: {
    getCalendar: async (userId: number, year: string, month: string) => {
      const url = `${API_BASE_URL}/api/${API_VERSION}/users/${userId}/calendar?year=${year}&month=${month}`;
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching calendar data:', error);
        throw error;
      }
    }
  }
};
