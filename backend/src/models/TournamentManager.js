const AbstractManager = require("./AbstractManager");

class TournamentManager extends AbstractManager {
  constructor() {
    super({ table: "tournament"});
  }

  insert(tournament) {
    return this.database.query(
      `INSERT INTO ${this.table} (name, date, tournament_img, organizer_id, total_players, short_description) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        tournament.name,
        tournament.date,
        tournament.tournament_img,
        tournament.organizer_id,
        tournament.total_players,
        tournament.short_description
      ]
    );
  }  

  update(tournament) {
    return this.database.query(
      `UPDATE ${this.table} SET name = ?, short_description = ? WHERE id = ?`,
      [
        tournament.name,
        tournament.short_description,
        tournament.id
      ]
    );
  }

  delete(id) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }

  getParticipantByTournamentId(id){
    return this.database.query(
      `SELECT u.username, u.id FROM tournament t INNER JOIN tournamentParticipation tp ON t.id = tp.tournament_id INNER JOIN user u ON u.id = tp.user_id WHERE t.id = ?`,[
        id
      ]);
  }

  findTournamentByUserID(id) {
    return this.database.query(
      `SELECT t.id, t.name, t.tournament_img, t.date, t.total_players FROM tournament t INNER JOIN tournamentParticipation tp ON t.id = tp.tournament_id INNER JOIN user u ON u.id = tp.user_id WHERE u.id = ?`, [
      id,
    ]);
  }

  findTournamentByOrganizer(id) {
    return this.database.query(
      `SELECT * FROM tournament WHERE organizer_id = ?`, [
      id,
    ]);
  }
  
}

module.exports = TournamentManager;
