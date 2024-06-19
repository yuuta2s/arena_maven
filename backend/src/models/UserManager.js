const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `INSERT INTO ${this.table} (username, major, date_creation, email, password, profil_picture) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user.username,
        user.major,
        user.date_creation,
        user.email,
        user.password,
        user.profil_picture
      ]
    );
  }

  update(user) {
    return this.database.query(
      `UPDATE ${this.table} SET username = ?, major = ?, date_creation = ?, email = ?, password = ?, profil_picture = ?, role = ?? WHERE id = ?`,
      [
        user.username,
        user.major,
        user.date_creation,
        user.email,
        user.password,
        user.profil_picture,
        user.role,
        user.id
      ]
    );
  }

  findUserByEmail(email) {
    return this.database.query(`select * from  ${this.table} where email = ?`, [
      email,
    ]);
  }
}

module.exports = UserManager;
