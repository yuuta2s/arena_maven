
const express = require("express");
const { body } = require('express-validator');
const multer = require('multer');
const router = express.Router();
const {
    hashPassword,
    verifyPassword,
    verifyToken,
} = require("./auth");

const matchResultsController = require('./controllers/matchResultsController');
// const itemControllers = require("./controllers/itemControllers");
const userController = require("./controllers/userController");
const tournament_matchController = require("./controllers/tournament_matchController");
const tournamentParticipationController = require("./controllers/tournamentParticipationController");
const tournamentControllers = require("./controllers/tournamentControllers");

// Configuration de multer pour le stockage des fichiers téléchargés
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Dossier de destination pour les fichiers uploadés
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Nom du fichier
  }
});


const upload = multer({ storage: storage });

// Routes pour les résultats de match
router.get("/matchResults", matchResultsController.browse);
router.get("/matchResults/:id", matchResultsController.read);
router.put("/matchResults/:id", matchResultsController.edit);
router.post("/matchResults", matchResultsController.add);
router.delete("/matchResults/:id", matchResultsController.destroy);

// // Routes pour les items
// router.get("/items", itemControllers.browse);
// router.get("/items/:id", itemControllers.read);
// router.put("/items/:id", itemControllers.edit);
// router.post("/items", itemControllers.add);
// router.delete("/items/:id", itemControllers.destroy);

// Route pour l'inscription des utilisateurs

// Handle registration request
router.post('/user/register', hashPassword, userController.add);

// Routes pour les utilisateurs
router.post("/user/login", userController.getUserByEmail, verifyPassword);
router.get("/user", userController.browse);
router.get("/user/:id", userController.read);
router.put("/user/:id", userController.edit);
router.delete("/user/:id", userController.destroy);

// Routes pour les matchs de tournoi
router.get("/tournament_matches", tournament_matchController.browse);
router.get("/tournament_matches/:id", tournament_matchController.read);
router.post("/tournament_matches", tournament_matchController.add);
router.put("/tournament_matches/:id", tournament_matchController.edit);
router.delete("/tournament_matches/:id", tournament_matchController.destroy);

// Routes pour la participation aux tournois
router.get("/tournament-participation", tournamentParticipationController.browse);
router.get("/tournament-participation/:id", tournamentParticipationController.read);
router.put("/tournament-participation/:id", tournamentParticipationController.edit);
router.post("/tournament-participation", tournamentParticipationController.add);
router.delete("/tournament-participation/:id", tournamentParticipationController.destroy);

// Routes pour les tournois
router.get("/tournament", tournamentControllers.browse);
router.get("/tournament/:id", tournamentControllers.read);
router.put("/tournament/:id", tournamentControllers.edit);
router.post('/tournament', upload.single('timage'), tournamentControllers.add);
router.delete("/tournament/:id", tournamentControllers.destroy);

// Route pour obtenir la participation par ID de tournoi
router.get("/participation/tournament/:id", tournamentControllers.getPbyTid);

module.exports = router;



