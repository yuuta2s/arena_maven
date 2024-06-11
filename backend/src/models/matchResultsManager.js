const AbstractManager = require("./AbstractManager");

class matchResultsManager extends AbstractManager {
  constructor() {
    super({ table: "matchResults" });
  }

  insert(matchResults) {
    return this.database.query(`insert into ${this.table} (id) values (?)`, [
      matchResults.id,
    ]);
  }

  update(matchResults) {
    return this.database.query(
      `update ${this.table} set match = ? where id = ?`,
      [matchResults.match_id, matchResults.id]
    );
  }
}

module.exports = matchResultsManager;
