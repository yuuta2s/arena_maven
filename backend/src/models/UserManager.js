const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(`insert into ${this.table} (username) values (?)`, [
      user.username,
    ]);
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set username = ? where id = ?`,
      [user.username, user.id]
    );
  }
}

module.exports = UserManager;
