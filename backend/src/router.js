const express = require('express');
const router = express.Router();
const { hashPassword, verifyPassword, verifyToken } = require('./auth'); // Import des fonctions d'authentification

const userController = require("./controllers/userController");
const matchResultsController = require('./controllers/matchResultsController');
const tournament_matchController = require("./controllers/tournament_matchController");
const tournamentParticipationController = require("./controllers/tournamentParticipationController");
const tournamentControllers = require("./controllers/tournamentControllers");
const guildController = require("./controllers/guildController");

// Middleware de gestion des fichiers téléchargés avec multer
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

// Middleware pour vérifier le token JWT avant d'accéder à la route contact
router.post("/contact", verifyToken, (req, res) => {
  console.log("Accessing protected route: /contact");
  res.send("Route contact accessible uniquement avec un token valide.");
});

// Routes pour les résultats de match
router.get("/matchResults", matchResultsController.browse);
router.get("/matchResults/:id", matchResultsController.read);
router.put("/matchResults/:id", matchResultsController.edit);
router.post("/matchResults", matchResultsController.add);
router.delete("/matchResults/:id", matchResultsController.destroy);

// Route pour l'inscription des utilisateurs
router.post('/user/register', hashPassword, userController.add);

// Route pour la connexion des utilisateurs
router.post("/user/login", userController.getUserByEmail, verifyPassword);


// Routes pour la gestion des utilisateurs
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

// Routes pour les tournois - Non protégée
// router.get("/tournament", verifyToken, tournamentControllers.browse);
router.get("/tournament", tournamentControllers.browse); //
 // Cette route est pas protégée par verifyToken
router.get("/tournament/:id", tournamentControllers.read);
router.put("/tournament/:id", tournamentControllers.edit);
router.post('/tournament', upload.single('timage'), tournamentControllers.add);
router.delete("/tournament/:id", tournamentControllers.destroy);

// Route pour obtenir la participation par ID de tournoi
router.get("/participation/tournament/:id", tournamentControllers.getPbyTid);

// Routes pour les guildes
// router.get("/user/guild/:id", guildController.getUserGuildById); // fait cracher le serveur ?


router.get("/guild", guildController.browse);
router.get("/guild/:id", guildController.read);
router.post("/guild", upload.single('image'), guildController.add); // Route pour ajouter une guilde avec image
router.put("/guild/:id", guildController.edit); // Route pour modifier une guilde
router.delete("/guild/:id", guildController.destroy); // Route pour supprimer une guilde
router.post("/guild/:id/join", guildController.join); // Route pour rejoindre une guilde
router.post("/guild/:id/leave", guildController.leave);

module.exports = router;