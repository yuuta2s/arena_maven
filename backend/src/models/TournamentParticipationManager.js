// Importation du module AbstractManager
const AbstractManager = require("./AbstractManager");

// Déclaration de la classe TournamentParticipationManager qui hérite d'AbstractManager
class TournamentParticipationManager extends AbstractManager {
  constructor() {
    // Appel du constructeur de la classe parente avec le nom de la table
    super({ table: "tournamentParticipation" });
  }

  // Méthode pour insérer une nouvelle participation au tournoi
  insert(tournamentParticipation) {
    // Exécution de la requête SQL pour insérer un enregistrement dans la table
    return this.database.query(`insert into ${this.table} (username) values (?)`, [
      // Utilisation du paramètre participation_id de l'objet tournamentParticipation
      tournamentParticipation.participation_id,
    ]);
  }

  // Méthode pour mettre à jour une participation au tournoi existante
  update(tournamentParticipation) {
    // Exécution de la requête SQL pour mettre à jour un enregistrement dans la table
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [
        // Utilisation des paramètres participation_id et tournament_id de l'objet tournamentParticipation
        tournamentParticipation.participation_id, 
        tournamentParticipation.tournament_id
      ]
    );
  }
}

// Exportation de la classe TournamentParticipationManager pour l'utiliser dans d'autres modules
module.exports = TournamentParticipationManager;
