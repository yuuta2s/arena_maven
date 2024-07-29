import { filterInscriptionsFermées } from '../src/services/FilterInscriptionFermée';


describe('filterInscriptionsFermées', () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    

    it('should return all tournaments if no participants data is provided', () => {
        const tournaments = [
            { id: 1, total_players: 10, date: formattedDate },
            { id: 2, total_players: 5, date: '2023-12-31' }
        ];
        const participantsData = {};

        const result = filterInscriptionsFermées(tournaments, participantsData);
        expect(result).toEqual(tournaments);
    });
    it('should handle tournaments with no participants', () => {
        const tournaments = [
            { id: 1, total_players: 10, date: '2023-12-31' },
            { id: 2, total_players: 5, date: '2023-12-31' }
        ];
        const participantsData = {
            1: [],
            2: []
        };

        const result = filterInscriptionsFermées(tournaments, participantsData);
        expect(result).toEqual(tournaments);
    });

    it('should handle an empty tournaments array', () => {
        const tournaments = [];
        const participantsData = {};

        const result = filterInscriptionsFermées(tournaments, participantsData);
        expect(result).toEqual([]);
    });

    it('should handle a tournament with a date in the past', () => {
        const tournaments = [
            { id: 1, total_players: 10, date: '2020-01-01' }
        ];
        const participantsData = {
            1: [1, 2, 3, 4, 5]
        };

        const result = filterInscriptionsFermées(tournaments, participantsData);
        expect(result).toEqual(tournaments);
    });
});