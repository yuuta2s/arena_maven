const AbstractManager = require("./AbstractManager");

class TournamentManager extends AbstractManager {
  constructor() {
    super({ table: "tournament"});
  }

  insert(tournament) {
    return this.database.query(`insert into ${this.table} (name) values (?)`, [
      tournament.name,
    ]);
  }

  update(tournament) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [tournament.username, tournament.id]
    );
  }

  getParticipantByTournamentId(id){
     return this.database.query(`SELECT u.id FROM tournament t INNER JOIN tournamentParticipation tp ON t.id = tp.tournament_id INNER JOIN user u ON u.id = tp.user_id WHERE t.id = ?
     `,[id]);}
}

module.exports = TournamentManager;