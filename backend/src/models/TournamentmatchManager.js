const AbstractManager = require("./AbstractManager");

class TournamentmatchManager extends AbstractManager {
  constructor() {
    super({ table: "tournament_match" });
  }

  insert(tournament_match) {
    return this.database.query(
      `INSERT INTO ${this.table} (tournament_id, player1_id, player2_id, round, winner_id, score) VALUES (?, ?, ?, ?, ?, ?)`, 
      [
        tournament_match.tournament_id,
        tournament_match.player1_id,
        tournament_match.player2_id,
        tournament_match.round,
        tournament_match.winner_id,
        tournament_match.score
      ]
    );
  }

  update(tournament_match) {
    return this.database.query(
      `UPDATE ${this.table} SET score = ?, winner_id = ? WHERE id = ?`,
      [tournament_match.score, tournament_match.winner_id, tournament_match.id]
    );
  }
}


module.exports = TournamentmatchManager;