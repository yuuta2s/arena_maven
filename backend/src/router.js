const express = require("express");
const router = express.Router();


const matchResultsController = require('./controllers/matchResultsController');

// Routes pour les items


router.get("/matchResults", matchResultsController.browse);
router.get("/matchResults/:id", matchResultsController.read);
router.put("/matchResults/:id", matchResultsController.edit);
router.post("/matchResults", matchResultsController.add);
router.delete("/matchResults/:id", matchResultsController.destroy);

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);


const userController = require("./controllers/userController");

router.get("/user", userController.browse);
router.get("/user/:id", userController.read);
router.put("/user/:id", userController.edit);
router.post("/user", userController.add);
router.delete("/user/:id", userController.destroy);

const Tournament_matchController = require("./controllers/tournament_matchController");
// Routes pour les matchs de tournoi
router.get("/tournament_matches", Tournament_matchController.browse);
router.get("/tournament_matches/:id", Tournament_matchController.read);
router.post("/tournament_matches", Tournament_matchController.add);
router.put("/tournament_matches/:id", Tournament_matchController.edit);
router.delete("/tournament_matches/:id", Tournament_matchController.destroy);

module.exports = router;