const AbstractManager = require("./AbstractManager");

class GuildManager extends AbstractManager {
  constructor() {
    super({ table: "guild" });
  }

  insert(guild) {
    return this.database.query(
      `INSERT INTO ${this.table} (name, description, creator_id, members) VALUES (?, ?, ?, ?)`,
      [guild.name, guild.description, guild.creator_id, JSON.stringify(guild.members)]
    );
  }

  update(guild) {
    return this.database.query(
      `UPDATE ${this.table} SET name = ?, description = ?, members = ? WHERE id = ?`,
      [guild.name, guild.description, JSON.stringify(guild.members), guild.id]
    );
  }

  addUserToGuild(userId, guildId) {
    return this.database.query(
      `UPDATE ${this.table} SET members = JSON_ARRAY_APPEND(members, '$', CAST(? AS JSON)) WHERE id = ?`,
      [userId, guildId]
    );
  }

  removeUserFromGuild(userId, guildId) {
    return this.database.query(
      `UPDATE ${this.table} SET members = JSON_REMOVE(members, JSON_UNQUOTE(JSON_SEARCH(members, 'one', CAST(? AS JSON)))) WHERE id = ?`,
      [userId, guildId]
    );
  }
}

module.exports = GuildManager;