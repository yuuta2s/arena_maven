const AbstractManager = require("./AbstractManager");

class TournamentManager extends AbstractManager {
  constructor() {
    super({ table: "tournament"});
  }

  insert(tournament) {
    return this.database.query(`insert into ${this.table} (name, date, tournament_img, organizer_id) values (?, ?, ?, ?)`, 
    [
      tournament.name,
      tournament.date,
      tournament.tournament_img,
      tournament.organizer_id
    ]);
  }

  update(tournament) {
    return this.database.query(
      `update ${this.table} set name = ?, date = ?, tournament_img = ?, oranizer_id = ? where id = ?`,
      [
        tournament.name,
        tournament.date,
        tournament.tournament_img,
        tournament.organizer_id,
        tournament.id
      ]
    );
  }

  getParticipantByTournamentId(id){
     return this.database.query(`SELECT u.username FROM tournament t INNER JOIN tournamentParticipation tp ON t.id = tp.tournament_id INNER JOIN user u ON u.id = tp.user_id WHERE t.id = ?
     `,[id]);}
}

module.exports = TournamentManager;