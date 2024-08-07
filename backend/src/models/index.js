require("dotenv").config();
// const models = require('./models'); 
const mysql = require("mysql2/promise");
const GuildManager = require("./GuildManager");
const UserManager = require("./UserManager");
// create a connection pool to the database

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// try a connection

pool.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});

// declare and fill models: that's where you should register your own managers

const models = {};

const ItemManager = require("./ItemManager");
const userManager = require("./UserManager");
const TournamentManager = require("./TournamentManager");
const TournamentParticipationManager = require("./TournamentParticipationManager");
const Tournament_matchManager = require("./TournamentmatchManager");
const MatchResultsManager = require("./matchResultsManager");

// const GuildManager = require("./GuildManager");

models.guild = new GuildManager();
models.guild.setDatabase(pool);
const CommentManager = require("./CommentManager");


models.item = new ItemManager();
models.item.setDatabase(pool);



models.user = new userManager();
models.user.setDatabase(pool);

models.tournamentParticipation = new TournamentParticipationManager();
models.tournamentParticipation.setDatabase(pool);


models.matchResults = new MatchResultsManager();
models.matchResults.setDatabase(pool);

models.users = new userManager();
models.users.setDatabase(pool);


models.tournament = new TournamentManager();
models.tournament.setDatabase(pool);


models.comment = new CommentManager();
models.comment.setDatabase(pool);
// bonus: use a proxy to personalize error message,
// when asking for a non existing model

// Importation et configuration du gestionnaire de modèle Tournament_matchManager

models.tournament_match = new Tournament_matchManager();
models.tournament_match.setDatabase(pool);


const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};

module.exports = new Proxy(models, handler);