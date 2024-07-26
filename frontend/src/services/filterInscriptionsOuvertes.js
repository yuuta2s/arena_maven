// utils/filterInscriptionsOuvertes.js
export const filterInscriptionsOuvertes = (tournaments, participantsData) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return tournaments.filter(tournament => {
        const participants = participantsData[tournament.id] || [];
        return (tournament.total_players > participants.length && tournament.date > formattedDate);
    });
};
