const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "comment" });
  }

  insert(comment) {
    const { content, user_id, tournament_id } = comment;
    const created_at = new Date();
    const updated_at = new Date();

    return this.database.query(
      `INSERT INTO ${this.table} (content, created_at, updated_at, user_id, tournament_id) VALUES (?, ?, ?, ?, ?)`,
      [content, created_at, updated_at, user_id, tournament_id]
    );
  }

  update(comment) {
    return this.database.query(
      `UPDATE ${this.table} SET content = ?, updated_at = ? WHERE id = ?`,
      [comment.content, new Date(), comment.id]
    );
  }

  delete(id) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }

  // Permet de récupérer les commentaires d'un tournoi spécifique
  findByTournament(tournamentId) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE tournament_id = ?`,
      [tournamentId]
    );
  }
}

module.exports = CommentManager;
