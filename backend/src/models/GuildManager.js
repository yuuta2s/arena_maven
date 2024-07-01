const AbstractManager = require("./AbstractManager");

class GuildManager extends AbstractManager {
  constructor() {
    super({ table: "guild" });
  }

  insert(guild) {
    return this.database.query(
      `INSERT INTO ${this.table} (name, description, creator_id) VALUES (?, ?, ?)`,
      [guild.name, guild.description, guild.creator_id]
    );
  }

  update(guild) {
    return this.database.query(
      `UPDATE ${this.table} SET name = ?, description = ? WHERE id = ?`,
      [guild.name, guild.description, guild.id]
    );
  }

  // findByCreatorId(creatorId) {
  //   return this.database.query(
  //     `SELECT * FROM ${this.table} WHERE creator_id = ?`,
  //     [creatorId]
  //   );
  // }
  addUserToGuild(userId, guildId) {
    return this.database.query(
      `INSERT INTO guild_user (guild_id, user_id) VALUES (?, ?)`,
      [guildId, userId]
    );
  }

  removeUserFromGuild(userId, guildId) {
    return this.database.query(
      `DELETE FROM guild_user WHERE guild_id = ? AND user_id = ?`,
      [guildId, userId]
    );
  }
}

module.exports = GuildManager;