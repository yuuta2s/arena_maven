import formatDate from "frontend/src/services/formatDate";

describe('formatDate', () => {
    it('should format date in "fr-FR" locale with "yyyy-mm-dd" format', () => {
      const date = '2024-07-04T12:00:00Z'; // Example date string
      const formattedDate = formatDate(date);
      expect(formattedDate).toBe('04/07/2024');
    });
  
    it('should handle invalid date strings gracefully', () => {
      const invalidDate = 'invalid-date';
      const formattedDate = formatDate(invalidDate);
      expect(formattedDate).toBe('Invalid Date');
    });
  });