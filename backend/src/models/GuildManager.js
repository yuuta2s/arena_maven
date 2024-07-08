
  const AbstractManager = require("./AbstractManager");

class GuildManager extends AbstractManager {
  constructor(database) {
    super({ table: "guild" });
    this.database = database; // Assurez-vous que database est correctement configuré
  }

  async insert(guild) {
    const { name, description, creator_id, members, image } = guild;

    const result = await this.database.query(
      `INSERT INTO ${this.table} (name, description, creator_id, members, image) VALUES (?, ?, ?, ?, ?)`,
      [name, description, creator_id, JSON.stringify(members), image]
    );
    return result;
  }

  async findById(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async update(guild) {
    const { id, name, description, members, image } = guild;

    const result = await this.database.query(
      `UPDATE ${this.table} SET name = ?, description = ?, members = ?, image = ? WHERE id = ?`,
      [name, description, JSON.stringify(members), image, id]
    );
    return result;
  }

  async addUserToGuild(userId, guildId) {
    const guild = await this.findById(guildId);
    if (!guild) {
      throw new Error(`Guild with id ${guildId} not found`);
    }
  
    // Assurez-vous que guild.members est un tableau
    let members = guild.members ? JSON.parse(guild.members) : [];
    if (!Array.isArray(members)) {
      members = []; // Initialiser comme un tableau vide si ce n'est pas déjà un tableau
    }
  
    // Ajoutez l'utilisateur à la guilde si nécessaire
    if (!members.includes(userId)) {
      members.push(userId);
    }
  
    // Mettre à jour la base de données avec les membres mis à jour
    const updateResult = await this.database.query(
      `UPDATE ${this.table} SET members = ? WHERE id = ?`,
      [JSON.stringify(members), guildId]
    );
    return updateResult;
  }
  async removeUserFromGuild(userId, guildId) {
    const guild = await this.findById(guildId);
    if (!guild) {
      throw new Error(`Guild with id ${guildId} not found`);
    }

    let members = guild.members ? JSON.parse(guild.members) : [];
    members = members.filter(memberId => memberId !== userId);

    const updateResult = await this.database.query(
      `UPDATE ${this.table} SET members = ? WHERE id = ?`,
      [JSON.stringify(members), guildId]
    );
    return updateResult;
  }
}

module.exports = GuildManager;