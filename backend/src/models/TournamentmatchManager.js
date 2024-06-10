const AbstractManager = require("./AbstractManager");

class TournamentmatchManager extends AbstractManager {
  constructor() {
    super({ table: "tournament_match" });
  }

  insert(tournament_match) {
    return this.database.query(`INSERT INTO ${this.table} (id) VALUES (?)`, [
      tournament_match.id
    ]);
  }

  update(tournament_match) {
    return this.database.query(
      `UPDATE ${this.table} SET tournament_id = ? WHERE id = ?`,
      [tournament_match.tournament_id, tournament_match.id]
    );
  }
}

module.exports = TournamentmatchManager;