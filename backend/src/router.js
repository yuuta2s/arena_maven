const express = require("express");
const router = express.Router();

// Importation des contrôleurs
const itemControllers = require("./controllers/itemControllers");
const userController = require("./controllers/userController");
const Tournament_matchController = require("./controllers/tournament_matchController");

// Routes pour les items
router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// Routes pour les utilisateurs
router.get("/users", userController.browse);
router.get("/users/:id", userController.read);
router.put("/users/:id", userController.edit);
router.post("/users", userController.add);
router.delete("/users/:id", userController.destroy);

// Routes pour les matchs de tournoi
router.get("/tournament_matches", Tournament_matchController.browse);
router.get("/tournament_matches/:id", Tournament_matchController.read);
router.post("/tournament_matches", Tournament_matchController.add);
router.put("/tournament_matches/:id", Tournament_matchController.edit);
router.delete("/tournament_matches/:id", Tournament_matchController.destroy);

module.exports = router;