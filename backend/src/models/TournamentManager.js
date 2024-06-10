const AbstractManager = require("./AbstractManager");

class TournamentManager extends AbstractManager {
  constructor() {
    super({ table: "tournament" });
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
}

module.exports = TournamentManager;