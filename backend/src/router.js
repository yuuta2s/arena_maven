const express = require("express");
const {body} = require('express-validator');
const router = express.Router();
const {
    hashPassword,
    verifyPassword,
    verifyToken,
  } = require("./auth");

const matchResultsController = require('./controllers/matchResultsController');

// Routes pour les items


router.get("/matchResults", matchResultsController.browse);
router.get("/matchResults/:id", matchResultsController.read);
router.put("/matchResults/:id", matchResultsController.edit);
router.post("/matchResults", matchResultsController.add );
router.delete("/matchResults/:id", matchResultsController.destroy);

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);


const userController = require("./controllers/userController");

// -----REGISTER-------
router.post("/user/login", userController.getUserByEmail, verifyPassword);

// Vérification du token
// router.use(verifyToken);
    
router.get("/user", userController.browse);
router.get("/user/:id", userController.read);
router.put("/user/:id", userController.edit);
router.post("/user",hashPassword, body('email').trim().isEmail().withMessage('Email is not valid') ,userController.add);
router.delete("/user/:id", userController.destroy);

const Tournament_matchController = require("./controllers/tournament_matchController");
// Routes pour les matchs de tournoi
router.get("/tournament_matches", Tournament_matchController.browse);
router.get("/tournament_matches/:id", Tournament_matchController.read);
router.post("/tournament_matches", Tournament_matchController.add);
router.put("/tournament_matches/:id", Tournament_matchController.edit);
router.delete("/tournament_matches/:id", Tournament_matchController.destroy);


const  tournamentParticipationController = require("./controllers/tournamentParticipationController");

router.get("/tournament-participation",  tournamentParticipationController.browse);
router.get("/tournament-participation/:id", tournamentParticipationController.read);
router.put("/tournament-participation/:id", tournamentParticipationController.edit);
router.post("/tournament-participation", tournamentParticipationController.add);
router.delete("/tournament-participation/:id", tournamentParticipationController.destroy);

const tournamentControllers = require("./controllers/tournamentControllers");
// const { verify } = require("argon2");

router.get("/tournament", tournamentControllers.browse);
router.get("/tournament/:id", tournamentControllers.read);
router.put("/tournament/:id", tournamentControllers.edit);
router.post("/tournament", tournamentControllers.add);
router.delete("/tournament/:id", tournamentControllers.destroy);


module.exports = router;
