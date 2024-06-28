
const express = require('express');
const router = express.Router();
const { hashPassword, verifyPassword, verifyToken } = require('./auth');

const userController = require("./controllers/userController");
const matchResultsController = require('./controllers/matchResultsController');
const tournament_matchController = require("./controllers/tournament_matchController");
const tournamentParticipationController = require("./controllers/tournamentParticipationController");
const tournamentControllers = require("./controllers/tournamentControllers");

// Middleware de gestion des fichiers téléchargés avec multer
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Dossier de destination pour les fichiers uploadés
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Nom du fichier
  }
});
const upload = multer({ storage: storage });

// Route pour l'inscription des utilisateurs
router.post('/user/register', hashPassword, userController.add);

// Route pour la connexion des utilisateurs
router.post('/user/login', userController.getUserByEmail, verifyPassword);

// Routes pour les tournois
router.get("/tournament", tournamentControllers.browse);
router.get("/tournament/:id", tournamentControllers.read);
router.put("/tournament/:id", tournamentControllers.edit);
router.post('/tournament', upload.single('timage'), tournamentControllers.add);
router.delete("/tournament/:id", tournamentControllers.destroy);

// Vérification du token
// router.use(verifyToken);

// Routes pour les résultats de match
router.get("/matchResults", matchResultsController.browse);
router.get("/matchResults/:id", matchResultsController.read);
router.put("/matchResults/:id", matchResultsController.edit);
router.post("/matchResults", matchResultsController.add);
router.delete("/matchResults/:id", matchResultsController.destroy);

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


// Route pour obtenir la participation par ID de tournoi
router.get("/participation/tournament/:id", tournamentControllers.getPbyTid);

module.exports = router;