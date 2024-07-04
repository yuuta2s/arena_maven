// const AbstractManager = require("./AbstractManager");

// class GuildManager extends AbstractManager {
//   constructor() {
//     super({ table: "guild" });
//   }

//   insert(guild) {
//     return this.database.query(
//       `INSERT INTO ${this.table} (name, description, creator_id, members) VALUES (?, ?, ?, ?)`,
//       [guild.name, guild.description, guild.creator_id, JSON.stringify(guild.members)]
//     );
//   }

//   update(guild) {
//     return this.database.query(
//       `UPDATE ${this.table} SET name = ?, description = ?, members = ? WHERE id = ?`,
//       [guild.name, guild.description, JSON.stringify(guild.members), guild.id]
//     );
//   }

//   addUserToGuild(userId, guildId) {
//     return this.database.query(
//       `UPDATE ${this.table} SET members = JSON_ARRAY_APPEND(members, '$', CAST(? AS JSON)) WHERE id = ?`,
//       [userId, guildId]
//     );
//   }

//   removeUserFromGuild(userId, guildId) {
//     return this.database.query(
//       `UPDATE ${this.table} SET members = JSON_REMOVE(members, JSON_UNQUOTE(JSON_SEARCH(members, 'one', CAST(? AS JSON)))) WHERE id = ?`,
//       [userId, guildId]
//     );
//   }
// }

// module.exports = GuildManager;
// const AbstractManager = require("./AbstractManager");

// class GuildManager extends AbstractManager {
//   constructor() {
//     super({ table: "guild" });
//   }

//   insert(guild) {
//     const { name, description, creator_id, members, image } = guild;

//     return this.database.query(
//       `INSERT INTO ${this.table} (name, description, creator_id, members, image) VALUES (?, ?, ?, ?, ?)`,
//       [name, description, creator_id, JSON.stringify(members), image]
//     );
//   }

//   findById(id) {
//     return this.database.query(
//       `SELECT * FROM ${this.table} WHERE id = ?`,
//       [id]
//     );
//   }

//   update(guild) {
//     const { id, name, description, members, image } = guild;

//     return this.database.query(
//       `UPDATE ${this.table} SET name = ?, description = ?, members = ?, image = ? WHERE id = ?`,
//       [name, description, JSON.stringify(members), image, id]
//     );
//   }

//   async addUserToGuild(userId, guildId) {
//     // Récupérer la liste actuelle des membres
//     const [[guild]] = await this.database.query(
//       `SELECT members FROM ${this.table} WHERE id = ?`,
//       [guildId]
//     );

//     // Ajouter le nouvel utilisateur à la liste des membres
//     let members = guild.members ? JSON.parse(guild.members) : [];
//     if (!members.includes(userId)) {
//       members.push(userId);
//     }

//     // Mettre à jour la liste des membres
//     return this.database.query(
//       `UPDATE ${this.table} SET members = ? WHERE id = ?`,
//       [JSON.stringify(members), guildId]
//     );
//   }

//   async removeUserFromGuild(userId, guildId) {
//     // Récupérer la liste actuelle des membres
//     const [[guild]] = await this.database.query(
//       `SELECT members FROM ${this.table} WHERE id = ?`,
//       [guildId]
//     );

//     // Supprimer l'utilisateur de la liste des membres
//     let members = guild.members ? JSON.parse(guild.members) : [];
//     members = members.filter(memberId => memberId !== userId);

//     // Mettre à jour la liste des membres
//     return this.database.query(
//       `UPDATE ${this.table} SET members = ? WHERE id = ?`,
//       [JSON.stringify(members), guildId]
//     );
//   }
// }

// module.exports = GuildManager;
// const AbstractManager = require("./AbstractManager");

// class GuildManager extends AbstractManager {
//   constructor() {
//     super({ table: "guild" });
//   }

//   insert(guild) {
//     const { name, description, creator_id, members, image } = guild;

//     return this.database.query(
//       `INSERT INTO ${this.table} (name, description, creator_id, members, image) VALUES (?, ?, ?, ?, ?)`,
//       [name, description, creator_id, JSON.stringify(members), image]
//     );
//   }

//   update(guild) {
//     const { id, name, description, members, image } = guild;

//     return this.database.query(
//       `UPDATE ${this.table} SET name = ?, description = ?, members = ?, image = ? WHERE id = ?`,
//       [name, description, JSON.stringify(members), image, id]
//     );
//   }

//   findById(id) {
//     return this.database.queryOne(
//       `SELECT * FROM ${this.table} WHERE id = ?`,
//       [id]
//     );
//   }
// }

// module.exports = GuildManager;

// const AbstractManager = require("./AbstractManager");

// class GuildManager extends AbstractManager {
//   constructor() {
//     super({ table: "guild" });
//   }

 
 

  
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

    let members = guild.members ? JSON.parse(guild.members) : [];
    if (!members.includes(userId)) {
      members.push(userId);
    }

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