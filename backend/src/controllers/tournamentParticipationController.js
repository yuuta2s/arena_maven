// Importation du module "models" qui contient les gestionnaires de la base de données
const models = require("../models");

// Fonction pour parcourir toutes les participations au tournoi
const browse = (req, res) => {
  models.tournamentParticipation
    .findAll() // Appelle la méthode findAll pour récupérer toutes les participations
    .then(([rows]) => {
      res.send(rows); // Envoie les résultats comme réponse
    })
    .catch((err) => {
      console.error(err); // Affiche l'erreur dans la console
      res.sendStatus(500); // Envoie un statut 500 (Internal Server Error) si une erreur se produit
    });
};

// Fonction pour lire une participation spécifique au tournoi par ID
const read = (req, res) => {
  models.tournamentParticipation
    .find(req.params.id) // Appelle la méthode find pour récupérer une participation par ID
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404); // Envoie un statut 404 (Not Found) si la participation n'existe pas
      } else {
        res.send(rows[0]); // Envoie la participation comme réponse
      }
    })
    .catch((err) => {
      console.error(err); // Affiche l'erreur dans la console
      res.sendStatus(500); // Envoie un statut 500 (Internal Server Error) si une erreur se produit
    });
};

// Fonction pour modifier une participation au tournoi existante
const edit = (req, res) => {
  const tournamentParticipation = req.body;

  // TODO validations (length, format...)
  // Validations pour vérifier la longueur, le format, etc. des données

  tournamentParticipation.id = parseInt(req.params.id, 10); // Associe l'ID de la participation à partir des paramètres de la requête

  models.tournamentParticipation
    .update(tournamentParticipation) // Appelle la méthode update pour modifier la participation
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404); // Envoie un statut 404 (Not Found) si aucune ligne n'a été affectée
      } else {
        res.sendStatus(204); // Envoie un statut 204 (No Content) si la mise à jour a réussi
      }
    })
    .catch((err) => {
      console.error(err); // Affiche l'erreur dans la console
      res.sendStatus(500); // Envoie un statut 500 (Internal Server Error) si une erreur se produit
    });
};

// Fonction pour ajouter une nouvelle participation au tournoi
const add = (req, res) => {
  const tournamentParticipation = req.body;

  // TODO validations (length, format...)
  // Validations pour vérifier la longueur, le format, etc. des données

  models.tournamentParticipation
    .insert(tournamentParticipation) // Appelle la méthode insert pour ajouter une nouvelle participation
    .then(([result]) => {
      res.location(`/tournamentParticipations/${result.insertId}`).sendStatus(201); // Envoie un statut 201 (Created) avec la localisation de la nouvelle ressource
    })
    .catch((err) => {
      console.error(err); // Affiche l'erreur dans la console
      res.sendStatus(500); // Envoie un statut 500 (Internal Server Error) si une erreur se produit
    });
};

// Fonction pour supprimer une participation au tournoi
const destroy = (req, res) => {
  models.tournamentParticipation
    .delete(req.params.id) // Appelle la méthode delete pour supprimer la participation par ID
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404); // Envoie un statut 404 (Not Found) si aucune ligne n'a été affectée
      } else {
        res.sendStatus(204); // Envoie un statut 204 (No Content) si la suppression a réussi
      }
    })
    .catch((err) => {
      console.error(err); // Affiche l'erreur dans la console
      res.sendStatus(500); // Envoie un statut 500 (Internal Server Error) si une erreur se produit
    });
};

// Exportation des fonctions pour les utiliser dans d'autres modules
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
