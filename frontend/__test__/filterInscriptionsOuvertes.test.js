// Profil.test.js
import { filterInscriptionsOuvertes } from '../src/services/filterInscriptionsOuvertes.js';

describe('filterInscriptionsOuvertes', () => {
    let tournaments;
    let participantsData;

    beforeEach(() => {
        
       
        
        tournaments = [
            { id: 1, total_players: 10, date: '2024-08-01' },
            { id: 2, total_players: 5, date: '2024-06-15' },
            { id: 3, total_players: 15, date: '2024-07-20' },
        ];

       
        participantsData = {
            1: [{ id: 1 }, { id: 2 }],
            2: [{ id: 3 }, { id: 4 }, { id: 5 }],
            3: [{ id: 6 }]
        };
    });

    afterEach(() => {
        jest.useRealTimers();
    });


    it('should not return tournaments with closed registrations', () => {
        const result = filterInscriptionsOuvertes(tournaments, participantsData);

        expect(result).not.toContainEqual({ id: 2, total_players: 5, date: '2024-06-15' });
    });

    it('should not return tournaments with the maximum number of participants', () => {
        const mockTournaments = [
          { id: 1, total_players: 10, date: '2024-07-20' },
          { id: 2, total_players: 10, date: '2024-07-21' }
        ];
        const mockParticipantsData = {
          1: new Array(10).fill({}), // 10 participants
          2: new Array(5).fill({})   // 5 participants
        };
    
        const result = filterInscriptionsOuvertes(mockTournaments, mockParticipantsData);
    
        expect(result).toEqual([{ id: 2, total_players: 10, date: '2024-07-21' }]);
      });
});
