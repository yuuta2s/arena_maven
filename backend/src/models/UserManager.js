const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `INSERT INTO ${this.table} (username,email, password, profil_picture) VALUES (?, ?, ?, ?)`,
      [
        user.username,
        user.email,
        user.password,
        user.profil_picture,
        user.role
      ]
    );
  }

  update(user) {
    return this.database.query(
      `UPDATE ${this.table} SET username = ?, email = ?, password = ?, profil_picture = ?, role = ? WHERE id = ?`,
      [
        user.username,
        user.email,
        user.password,
        user.profil_picture,
        user.role,
        user.id,
      ]
    );
  }

  findUserByEmail(email) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE email = ?`, [
      email,
    ]);
  }
}

module.exports = UserManager;

