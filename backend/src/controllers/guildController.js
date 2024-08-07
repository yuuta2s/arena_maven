const models = require("../models");

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Dossier de destination pour les fichiers uploadés
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });

const browse = async (req, res) => {
  try {
    const guilds = await models.guild.findAll();
    res.json(guilds);
  } catch (err) {
    console.error("Error retrieving guilds:", err);
    res.status(500).send("Error retrieving guilds from database");
  }
};

const read = async (req, res) => {
  const guildId = req.params.id;

  try {
    const guild = await models.guild.findById(guildId);
    if (guild) {
      res.json(guild);
    } else {
      res.status(404).send("Guild not found");
    }
  } catch (err) {
    console.error(`Error retrieving guild with id ${guildId}:`, err);
    res.status(500).send("Error retrieving guild from database");
  }
};

const add = async (req, res) => {
  const { name, description, creator_id, members } = req.body;

  if (!name || !description || !creator_id) {
    return res.status(400).send("Missing required fields");
  }

  const newGuild = {
    name,
    description,
    creator_id,
    members: members || [],
    image: req.file ? req.file.path : null, // Récupère le chemin de l'image uploadée
  };

  try {
    // Vérifiez si l'utilisateur existe
    const user = await models.user.find(creator_id);
    if (!user) {
      return res.status(400).json({ message: "Creator does not exist" });
    }

    // Créer la guilde avec l'image
    const result = await models.guild.insert(newGuild);
    res.status(201).json({ id: result.insertId, ...newGuild });
  } catch (err) {
    console.error("Error creating guild:", err);
    res.status(500).send("Error creating the guild");
  }
};

const edit = async (req, res) => {
  const guildId = req.params.id;
  const { name, description, members } = req.body;

  if (!name || !description) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const guild = await models.guild.findById(guildId);
    if (!guild) {
      return res.status(404).send("Guild not found");
    }

    const updatedGuild = {
      ...guild,
      name,
      description,
      members: members || guild.members,
      image: req.file ? req.file.path : guild.image, // Utilise la nouvelle image ou conserve l'ancienne
    };

    await models.guild.update(updatedGuild);
    res.json(updatedGuild);
  } catch (err) {
    console.error(`Error updating guild with id ${guildId}:`, err);
    res.status(500).send("Error updating the guild");
  }
};

const destroy = async (req, res) => {
  const guildId = req.params.id;

  try {
    const result = await models.guild.delete(guildId);
    if (result.affectedRows === 1) {
      res.sendStatus(204);
    } else {
      res.status(404).send("Guild not found");
    }
  } catch (err) {
    console.error(`Error deleting guild with id ${guildId}:`, err);
    res.status(500).send("Error deleting the guild");
  }
};

const join = async (req, res) => {
  const userId = req.body.userId;
  const guildId = req.params.id;

  if (!userId || !guildId) {
    return res.status(400).send("Missing required fields");
  }

  try {
    // Vérifiez si la guilde existe
    const guild = await models.guild.findById(guildId);
    if (!guild) {
      return res.status(404).send("Guild not found");
    }

    // Ajoutez l'utilisateur à la guilde
    await models.guild.addUserToGuild(userId, guildId);
    res.sendStatus(204);
  } catch (err) {
    console.error(`Error adding user ${userId} to guild ${guildId}:`, err);
    res.status(500).send("Error joining the guild");
  }
};

const leave = async (req, res) => {
  const userId = req.body.userId;
  const guildId = req.params.id;

  if (!userId || !guildId) {
    return res.status(400).send("Missing required fields");
  }

  try {
    // Vérifiez si la guilde existe
    const guild = await models.guild.findById(guildId);
    if (!guild) {
      return res.status(404).send("Guild not found");
    }

    // Supprimez l'utilisateur de la guilde
    await models.guild.removeUserFromGuild(userId, guildId);
    res.sendStatus(204);
  } catch (err) {
    console.error(`Error removing user ${userId} from guild ${guildId}:`, err);
    res.status(500).send("Error leaving the guild");
  }
};

module.exports = {
  browse,
  read,
  add,
  edit,
  destroy,
  join,
  leave,
};