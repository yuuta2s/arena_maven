const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `INSERT INTO ${this.table} (username, email, password, profil_picture, role) VALUES (?, ?, ?, ?, ?)`,
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

  find(id) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
  }

  findAll() {
    return this.database.query(`SELECT * FROM ${this.table}`);
  }

  delete(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }

  findUserByEmail(email) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE email = ?`, [
      email,
    ]);
  }

  findIfUserSub(tournament_id, user_id) {
    return this.database.query(`SELECT * FROM tournamentParticipation WHERE tournament_id = ? AND user_id = ?`, [
      tournament_id,
      user_id,
    ])
  }
}

module.exports = UserManager;
